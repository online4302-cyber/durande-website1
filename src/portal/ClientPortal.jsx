import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  FolderOpen,
  FileCode2,
  FileText,
  FileJson,
  Image as ImageIcon,
  ChevronRight,
  LogOut,
  Rocket,
  Lock,
  Loader2,
  Check,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { getSession, logout } from "./auth";
import useFonts from "./useFonts";

const SERIF = '"Instrument Serif", Georgia, "Times New Roman", serif';
const SANS = '"Geist", ui-sans-serif, system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, "SFMono-Regular", monospace';

const IMG_EXT = ["png", "jpg", "jpeg", "gif", "webp", "svg", "ico"];

/* Build a nested tree from GitHub's flat recursive tree list. */
function buildTree(items) {
  const root = { name: "", path: "", type: "tree", children: {} };
  for (const it of items) {
    if (it.type !== "blob" && it.type !== "tree") continue;
    const parts = it.path.split("/");
    let node = root;
    parts.forEach((part, i) => {
      const isLast = i === parts.length - 1;
      if (!node.children[part]) {
        node.children[part] = {
          name: part,
          path: parts.slice(0, i + 1).join("/"),
          type: isLast ? it.type : "tree",
          size: isLast ? it.size : undefined,
          children: {},
        };
      }
      node = node.children[part];
    });
  }
  return root;
}

/* Folders first, then files, alphabetical. */
function sortedChildren(node) {
  return Object.values(node.children).sort((a, b) => {
    if (a.type !== b.type) return a.type === "tree" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function ext(path) {
  const m = path.split(".").pop();
  return m ? m.toLowerCase() : "";
}

function FileIcon({ path }) {
  const e = ext(path);
  const cls = "h-4 w-4 shrink-0";
  if (IMG_EXT.includes(e)) return <ImageIcon className={`${cls} text-[#9A7BD0]`} />;
  if (e === "json") return <FileJson className={`${cls} text-[#C08A2E]`} />;
  if (["js", "jsx", "ts", "tsx", "css", "html"].includes(e))
    return <FileCode2 className={`${cls} text-[#2547E0]`} />;
  return <FileText className={`${cls} text-[#6C6C74]`} />;
}

function TreeNode({ node, depth, selectedPath, onSelect, defaultOpen }) {
  const [open, setOpen] = useState(depth < 1 || defaultOpen);
  const pad = { paddingLeft: `${depth * 14 + 10}px` };

  if (node.type === "tree") {
    const kids = sortedChildren(node);
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left text-[13px] text-[#16161A] transition-colors hover:bg-[#F1F0EC]"
          style={pad}
        >
          <ChevronRight
            className={`h-3.5 w-3.5 shrink-0 text-[#6C6C74] transition-transform ${
              open ? "rotate-90" : ""
            }`}
          />
          {open ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-[#2547E0]" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-[#6C6C74]" />
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {open &&
          kids.map((k) => (
            <TreeNode
              key={k.path}
              node={k}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
            />
          ))}
      </div>
    );
  }

  const active = selectedPath === node.path;
  return (
    <button
      onClick={() => onSelect(node)}
      className={`flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left text-[13px] transition-colors ${
        active
          ? "bg-[#EDF0FE] text-[#2547E0]"
          : "text-[#16161A] hover:bg-[#F1F0EC]"
      }`}
      style={{ paddingLeft: `${depth * 14 + 30}px` }}
    >
      <FileIcon path={node.path} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

export default function ClientPortal() {
  useFonts();
  const navigate = useNavigate();
  const session = getSession();

  const [tree, setTree] = useState(null);
  const [treeError, setTreeError] = useState("");
  const [loadingTree, setLoadingTree] = useState(true);

  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileError, setFileError] = useState("");

  // For snapshot sources: path -> file content, loaded once with the tree.
  const [snapshotMap, setSnapshotMap] = useState(null);

  const [publishState, setPublishState] = useState("idle"); // idle|confirm|publishing|done|error
  const [publishMsg, setPublishMsg] = useState("");

  useEffect(() => {
    if (!session) navigate("/portal/login", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTree = useCallback(() => {
    if (!session) return;
    setLoadingTree(true);
    setTreeError("");

    // Snapshot source: read a bundled JSON of the whole codebase.
    if (session.source === "snapshot") {
      fetch(`/portal/${session.snapshot}`)
        .then((r) => {
          if (!r.ok) throw new Error(`Could not load project files (${r.status}).`);
          return r.json();
        })
        .then((data) => {
          const items = (data.files || []).map((f) => ({
            path: f.path,
            type: "blob",
          }));
          setTree(buildTree(items));
          const map = {};
          for (const f of data.files || []) map[f.path] = f.content;
          setSnapshotMap(map);
          setLoadingTree(false);
        })
        .catch((e) => {
          setTreeError(e.message || "Failed to load files.");
          setLoadingTree(false);
        });
      return;
    }

    // GitHub source: read the repo tree live via the API.
    fetch(
      `https://api.github.com/repos/${session.repo}/git/trees/${session.branch}?recursive=1`
    )
      .then(async (r) => {
        if (!r.ok) {
          throw new Error(
            r.status === 403
              ? "GitHub rate limit reached. Please try again shortly."
              : `Could not load project files (${r.status}).`
          );
        }
        return r.json();
      })
      .then((data) => {
        setTree(buildTree(data.tree || []));
        setLoadingTree(false);
      })
      .catch((e) => {
        setTreeError(e.message || "Failed to load files.");
        setLoadingTree(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadTree();
  }, [loadTree]);

  const selectFile = (node) => {
    setSelected(node);
    setFileError("");

    // Snapshot source: content is already in memory.
    if (session.source === "snapshot") {
      const c = snapshotMap ? snapshotMap[node.path] : undefined;
      if (c === undefined) {
        setContent("");
        setFileError("This file isn't included in the snapshot.");
      } else {
        setContent(c);
      }
      setLoadingFile(false);
      return;
    }

    if (IMG_EXT.includes(ext(node.path)) && ext(node.path) !== "svg") {
      setContent("");
      return; // image handled in render
    }
    setLoadingFile(true);
    fetch(
      `https://raw.githubusercontent.com/${session.repo}/${session.branch}/${node.path}`
    )
      .then((r) => {
        if (!r.ok) throw new Error(`Could not open file (${r.status}).`);
        return r.text();
      })
      .then((t) => {
        setContent(t);
        setLoadingFile(false);
      })
      .catch((e) => {
        setFileError(e.message || "Failed to open file.");
        setLoadingFile(false);
      });
  };

  const doLogout = () => {
    logout();
    navigate("/portal/login", { replace: true });
  };

  const doPublish = () => {
    if (!session.deployHook) {
      setPublishState("error");
      setPublishMsg(
        "Publishing isn't configured yet. Ask Durande to add a deploy hook."
      );
      return;
    }
    setPublishState("publishing");
    setPublishMsg("");
    fetch(session.deployHook, { method: "POST" })
      .then((r) => {
        if (!r.ok && r.type !== "opaque")
          throw new Error(`Publish failed (${r.status}).`);
        setPublishState("done");
        setPublishMsg("Publish triggered. Your site is rebuilding.");
      })
      .catch(() => {
        // Deploy hooks may respond without CORS headers; the request still fires.
        setPublishState("done");
        setPublishMsg("Publish request sent. Your site should rebuild shortly.");
      });
  };

  const lineCount = useMemo(
    () => (content ? content.split("\n").length : 0),
    [content]
  );

  if (!session) return null;

  const isImage =
    selected &&
    session.source !== "snapshot" &&
    IMG_EXT.includes(ext(selected.path)) &&
    ext(selected.path) !== "svg";

  return (
    <div
      className="flex h-screen flex-col bg-[#FBFBF9] text-[#16161A] antialiased"
      style={{ fontFamily: SANS }}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#E7E5DF] bg-[#FBFBF9] px-5 py-3">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-baseline gap-0.5">
            <span className="text-[17px] font-semibold tracking-tight text-[#16161A]">
              Durande
            </span>
            <span className="text-[17px] font-semibold tracking-tight text-[#2547E0]">
              .com
            </span>
          </a>
          <span className="hidden h-4 w-px bg-[#E7E5DF] sm:block" />
          <span className="hidden text-[13px] text-[#6C6C74] sm:block">
            {session.name}
          </span>
          <span
            className="hidden items-center gap-1 rounded-full bg-[#F1F0EC] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#6C6C74] sm:inline-flex"
            style={{ fontFamily: MONO }}
          >
            <Lock className="h-3 w-3" /> Read-only
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={doPublish}
            disabled={publishState === "publishing"}
            className="group inline-flex items-center gap-2 rounded-full bg-[#16161A] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#2547E0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {publishState === "publishing" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : publishState === "done" ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Rocket className="h-3.5 w-3.5" />
            )}
            {publishState === "publishing"
              ? "Publishing…"
              : publishState === "done"
              ? "Published"
              : "Publish"}
          </button>
          <button
            onClick={doLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E7E5DF] px-3.5 py-2 text-[13px] font-medium text-[#16161A] transition-colors hover:border-[#16161A]"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </header>

      {/* Publish banner */}
      {publishMsg && (
        <div
          className={`flex items-center gap-2 px-5 py-2 text-[13px] ${
            publishState === "error"
              ? "bg-[#FCEBEB] text-[#B03535]"
              : "bg-[#ECF7EF] text-[#2E7D46]"
          }`}
        >
          {publishState === "error" ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {publishMsg}
        </div>
      )}

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* File tree */}
        <aside className="flex w-72 shrink-0 flex-col border-r border-[#E7E5DF] bg-white">
          <div className="flex items-center justify-between border-b border-[#E7E5DF] px-4 py-2.5">
            <span
              className="text-[11px] uppercase tracking-[0.16em] text-[#6C6C74]"
              style={{ fontFamily: MONO }}
            >
              Project files
            </span>
            <button
              onClick={loadTree}
              className="text-[#6C6C74] transition-colors hover:text-[#16161A]"
              title="Refresh"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {loadingTree && (
              <div className="flex items-center gap-2 px-2 py-3 text-[13px] text-[#6C6C74]">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading files…
              </div>
            )}
            {treeError && (
              <div className="px-2 py-3 text-[13px] text-[#B03535]">
                {treeError}
              </div>
            )}
            {tree &&
              sortedChildren(tree).map((k) => (
                <TreeNode
                  key={k.path}
                  node={k}
                  depth={0}
                  selectedPath={selected?.path}
                  onSelect={selectFile}
                />
              ))}
          </div>
        </aside>

        {/* Viewer */}
        <main className="flex min-h-0 flex-1 flex-col bg-[#FBFBF9]">
          {selected ? (
            <>
              <div className="flex items-center justify-between border-b border-[#E7E5DF] px-5 py-2.5">
                <span
                  className="truncate text-[13px] text-[#16161A]"
                  style={{ fontFamily: MONO }}
                >
                  {selected.path}
                </span>
                {!isImage && lineCount > 0 && (
                  <span
                    className="ml-4 shrink-0 text-[11px] text-[#6C6C74]"
                    style={{ fontFamily: MONO }}
                  >
                    {lineCount} lines
                  </span>
                )}
              </div>
              <div className="min-h-0 flex-1 overflow-auto">
                {loadingFile && (
                  <div className="flex items-center gap-2 p-5 text-[13px] text-[#6C6C74]">
                    <Loader2 className="h-4 w-4 animate-spin" /> Opening…
                  </div>
                )}
                {fileError && (
                  <div className="p-5 text-[13px] text-[#B03535]">{fileError}</div>
                )}
                {!loadingFile && !fileError && isImage && (
                  <div className="flex items-center justify-center p-8">
                    <img
                      src={`https://raw.githubusercontent.com/${session.repo}/${session.branch}/${selected.path}`}
                      alt={selected.name}
                      className="max-h-full max-w-full rounded-lg border border-[#E7E5DF] bg-white"
                    />
                  </div>
                )}
                {!loadingFile && !fileError && !isImage && (
                  <pre
                    className="flex text-[12.5px] leading-[1.6]"
                    style={{ fontFamily: MONO }}
                  >
                    <code className="select-none border-r border-[#E7E5DF] px-3 py-4 text-right text-[#B8B6AE]">
                      {Array.from({ length: lineCount }, (_, i) => i + 1).join(
                        "\n"
                      )}
                    </code>
                    <code className="overflow-x-auto whitespace-pre px-4 py-4 text-[#16161A]">
                      {content}
                    </code>
                  </pre>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF0FE]">
                <FileCode2 className="h-5 w-5 text-[#2547E0]" />
              </span>
              <h2
                className="text-[28px] leading-tight text-[#16161A]"
                style={{ fontFamily: SERIF }}
              >
                Your codebase
              </h2>
              <p className="mt-2 max-w-sm text-[14px] text-[#6C6C74]">
                Select a file from the tree to review it. Everything here is
                read-only — use Publish when you're ready to push approved
                changes live.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

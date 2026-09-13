/* -------------------------------------------------------------------------- */
/*  Client portal configuration                                               */
/* -------------------------------------------------------------------------- */
/*
   Each client gets a login and sees ONLY their own codebase, read-only.
   To add a client, append an entry to CLIENTS below.

   SOURCE — where the portal reads the code from:
   - source: "snapshot"  → reads a bundled JSON snapshot in /public/portal/.
                            Set `snapshot` to the file name. Self-contained,
                            no GitHub needed. Regenerate the JSON to update it.
   - source: "github"    → reads a repo live via the GitHub API.
                            Set `repo` ("owner/name") and `branch`.
   If `source` is omitted it defaults to "github".

   PUBLISH:
   Create a Deploy Hook in Vercel (Project → Settings → Git → Deploy Hooks),
   then paste the URL into a client's `deployHook`. Empty disables the button.

   NOTE ON SECURITY:
   This is a client-side gate. Credentials live in the shipped JS, so treat it
   as access convenience, not hard security. For real auth, move CLIENTS and the
   publish call behind a serverless function / backend later.
*/

export const CLIENTS = [
  {
    username: "ASAonline",
    password: "Liverpool@1",
    name: "ASA Estates — Property Management App",
    source: "snapshot",
    snapshot: "estateapp.json", // served from /public/portal/estateapp.json
    deployHook: "",
  },
  {
    username: "online4302",
    password: "Liverpool@1",
    name: "Durande Website",
    source: "github",
    repo: "online4302-cyber/durande-website1",
    branch: "main",
    deployHook: "", // e.g. "https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyy"
  },
];

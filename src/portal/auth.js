import { CLIENTS } from "./config";

const KEY = "durande_portal_session";

export function login(username, password) {
  const c = CLIENTS.find(
    (x) => x.username === username.trim() && x.password === password
  );
  if (!c) return null;
  const session = {
    username: c.username,
    name: c.name,
    repo: c.repo,
    branch: c.branch,
    deployHook: c.deployHook || "",
    ts: Date.now(),
  };
  sessionStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function logout() {
  sessionStorage.removeItem(KEY);
}

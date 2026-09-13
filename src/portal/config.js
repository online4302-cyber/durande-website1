/* -------------------------------------------------------------------------- */
/*  Client portal configuration                                               */
/* -------------------------------------------------------------------------- */
/*
   Each client gets a login and sees ONLY their own repository, read-only.
   To add a client, append an entry to CLIENTS below.

   PUBLISH:
   Create a Deploy Hook in Vercel (Project → Settings → Git → Deploy Hooks),
   then paste the URL into a client's `deployHook` field. Leaving it empty
   disables the Publish button for that client with an on-screen note.

   NOTE ON SECURITY:
   This is a client-side gate. Credentials live in the shipped JS, so treat it
   as access convenience, not hard security. For real auth, move CLIENTS and the
   publish call behind a serverless function / backend later.
*/

export const CLIENTS = [
  {
    username: "client",
    password: "durande2025",
    name: "Durande Demo",
    repo: "online4302-cyber/durande-website1",
    branch: "main",
    deployHook: "", // e.g. "https://api.vercel.com/v1/integrations/deploy/prj_xxx/yyy"
  },
];

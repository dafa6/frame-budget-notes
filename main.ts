// Static file server for Deno Deploy.
//
// The site is plain HTML with no build step, so this only has to map a request
// path to a file and set a content type. Directory URLs resolve to index.html
// so that /about/ works without a trailing-file redirect.

const ROOT = new URL("./static/", import.meta.url);

const TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  css: "text/css; charset=utf-8",
  svg: "image/svg+xml",
};

function contentType(path: string): string {
  return TYPES[path.split(".").pop() ?? ""] ?? "application/octet-stream";
}

Deno.serve(async (req: Request) => {
  const { pathname } = new URL(req.url);

  // Reject traversal before it reaches the filesystem.
  if (pathname.includes("..")) return new Response("Not found", { status: 404 });

  let rel = pathname.replace(/^\/+/, "");
  if (rel === "" || rel.endsWith("/")) rel += "index.html";

  try {
    const file = await Deno.readFile(new URL(rel, ROOT));
    return new Response(file, {
      headers: {
        "content-type": contentType(rel),
        "cache-control": "public, max-age=600",
      },
    });
  } catch {
    // A bare path with no extension is a directory URL missing its slash.
    if (!rel.includes(".")) {
      try {
        const file = await Deno.readFile(new URL(rel + "/index.html", ROOT));
        return new Response(file, {
          headers: {
            "content-type": TYPES.html,
            "cache-control": "public, max-age=600",
          },
        });
      } catch { /* fall through to 404 */ }
    }
    return new Response("Not found", {
      status: 404,
      headers: { "content-type": TYPES.txt },
    });
  }
});

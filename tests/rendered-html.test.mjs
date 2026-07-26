import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished WCCHUN portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>WCCHUN — Artist &amp; Creative Technologist<\/title>/i);
  assert.match(html, /Memory becomes/);
  assert.match(html, /Complete visual archive/);
  assert.match(html, /29<!-- --> works retained/);
  assert.match(html, /Scanned Memories/);
  assert.match(html, /Digital Echoes/);
  assert.match(html, /MemoryGrid/);
  assert.match(html, /WordView/);
  assert.match(html, /TechCore/);
  assert.match(html, /The Blue Countdown/);
  assert.match(html, /EcoSyntax/);
  assert.match(html, /Aware/);
  assert.match(html, /MindPixel/);
  assert.match(html, /Dictionary of Colour/);
  assert.match(html, /Protect Hongkonger/);
  assert.match(html, /Exhibitions/);
  assert.match(html, /Skip to selected work/);
  assert.match(html, /aria-haspopup="dialog"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Artist and Creative Technologist/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /site\.webmanifest/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton|react-loading-skeleton/i);
});

test("includes accessible navigation and real contact destinations", async () => {
  const html = await (await render()).text();
  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /href="#work"/);
  assert.match(html, /href="#practice"/);
  assert.match(html, /href="#exhibitions"/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /instagram\.com\/wongchunsunny/);
  assert.match(html, /behance\.net\/wongchun/);
  assert.match(html, /youtube\.com\/channel\/UCK2wPLfi_gLUpipjDqq3pnw/);
  assert.match(html, /linkedin\.com\/in\/wcchun/);
  assert.doesNotMatch(html, /wcchun\.notion\.site/);
  assert.doesNotMatch(html, /www\.wcchun\.com\/(?:work|ArtSense|Light-Trace)/);
});

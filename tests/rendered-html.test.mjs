import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.match(html, /A focused entry point/);
  assert.match(html, /08<!-- --> works <!-- -->selected/);
  assert.match(html, /View complete archive/);
  assert.match(html, /Scanned Memories/);
  assert.match(html, /Digital Echoes/);
  assert.match(html, /MemoryGrid/);
  assert.match(html, /WordView/);
  assert.match(html, /TechCore/);
  assert.match(html, /The Blue Countdown/);
  assert.match(html, /Aware/);
  assert.match(html, /ArtSense/);
  assert.match(html, /Exhibitions/);
  assert.match(html, /Technology &amp; Education/);
  assert.match(html, /ReadyLoop/);
  assert.match(html, /Open the complete ReadyLoop case study/);
  assert.match(html, /Open the complete DT Fabrication Dashboard case study/);
  assert.match(html, /View process, evidence and interface/);
  assert.match(html, /1,500\+/);
  assert.match(html, /About \/ Wong Chun \(Sunny\)/);
  assert.match(html, /Skip to selected work/);
  assert.match(html, /aria-haspopup="dialog"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Artist and Creative Technologist/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /https:\/\/wcchun\.com/);
  assert.match(html, /site\.webmanifest/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton|react-loading-skeleton/i);
});

test("includes accessible navigation and real contact destinations", async () => {
  const html = await (await render()).text();
  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /href="#work"/);
  assert.match(html, /href="#practice"/);
  assert.match(html, /href="#technology"/);
  assert.match(html, /href="#exhibitions"/);
  assert.match(html, /href="#about"/);
  assert.match(html, /href="#contact"/);
  assert.match(html, /instagram\.com\/wongchunsunny/);
  assert.match(html, /behance\.net\/wongchun/);
  assert.match(html, /youtube\.com\/channel\/UCK2wPLfi_gLUpipjDqq3pnw/);
  assert.match(html, /linkedin\.com\/in\/wcchun/);
  assert.match(html, /mailto:wcchun1234@gmail\.com/);
  assert.match(html, /Wong-Chun-Sunny-CV\.pdf/);
  assert.match(html, /technology\/readyloop\/15\.webp/);
  assert.match(html, /technology\/dashboard\/admin\.webp/);
  assert.doesNotMatch(html, /wcchun\.notion\.site/);
  assert.doesNotMatch(html, /www\.wcchun\.com\/(?:work|ArtSense|Light-Trace)/);
});

test("attributes operational evidence to the dashboard rather than ReadyLoop", async () => {
  const source = await readFile(new URL("../app/portfolio.tsx", import.meta.url), "utf8");
  const readyLoopEvidence = source.match(/aria-label="ReadyLoop evidence and recognition">([\s\S]*?)<\/div>/)?.[1] ?? "";
  const dashboardEvidence = source.match(/aria-label="DT Fabrication Dashboard operational evidence">([\s\S]*?)<\/div>/)?.[1] ?? "";

  assert.doesNotMatch(readyLoopEvidence, /1,500|1,543/);
  assert.match(dashboardEvidence, /1,543/);
  assert.match(source, /VSA access required/);
  assert.match(source, /Outstanding Innovation &amp; Creativity Award/);
});

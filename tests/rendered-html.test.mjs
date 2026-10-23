import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the finished WCCHUN portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Wong Chun \(Sunny\) — Artist &amp; Creative Technologist \| WCCHUN<\/title>/i);
  assert.match(html, /Memory becomes/);
  assert.match(html, /<h1[^>]*class="hero-title"/);
  assert.match(html, /A focused entry point/);
  assert.match(html, /08<!-- --> works selected/);
  assert.match(html, /Explore all 29 works/);
  assert.match(html, /Scanned Memories/);
  assert.match(html, /Digital Echoes/);
  assert.match(html, /MemoryGrid/);
  assert.match(html, /WordView/);
  assert.match(html, /TechCore/);
  assert.match(html, /The Blue Countdown/);
  assert.match(html, /Aware/);
  assert.match(html, /ArtSense/);
  assert.match(html, /Exhibitions/);
  assert.match(html, /Technology &amp;<br\/>education/);
  assert.match(html, /ReadyLoop/);
  assert.match(html, /Open the permanent ReadyLoop case study/);
  assert.match(html, /Open the permanent DT Fabrication Dashboard case study/);
  assert.match(html, /Open the permanent Robotics &amp; Physical Computing case study/);
  assert.match(html, /View full project/);
  assert.match(html, /\/technology\/readyloop/);
  assert.match(html, /\/technology\/dt-fabrication-dashboard/);
  assert.match(html, /\/technology\/robotics/);
  assert.match(html, /Selected tools &amp;/);
  assert.match(html, /CutCase/);
  assert.match(html, /CardBoxGen/);
  assert.match(html, /D&amp;T QR Inventory System/);
  assert.match(html, /MOVE Motor Tracker/);
  assert.match(html, /PDFPeak/);
  assert.match(html, /Explore all public repositories on GitHub/);
  assert.match(html, /1,500\+/);
  assert.match(html, /About \/ Wong Chun \(Sunny\)/);
  assert.match(html, /Skip to selected work/);
  assert.match(html, /aria-haspopup="dialog"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Artist and Creative Technologist/);
  assert.match(html, /Scroll \/ 01—09/);
  assert.match(html, /id="recognition"/);
  assert.match(html, /Images × systems × learning/);
  assert.match(html, /Transforming memory, language and experience into visual form/);
  assert.match(html, /Designing useful and human-centred systems/);
  assert.match(html, /Helping learners understand, test and improve ideas/);
  assert.match(html, /Turning code and concepts into physical outcomes/);
  assert.match(html, /rel="canonical"/);
  assert.match(html, /https:\/\/wcchun\.com/);
  assert.match(html, /site\.webmanifest/);
  assert.match(html, /favicon\.ico/);
  assert.match(html, /favicon-32\.png/);
  assert.match(html, /apple-touch-icon\.png/);
  assert.match(html, /wc-monogram\.png/);
  assert.doesNotMatch(html, /codex-preview|loading skeleton|react-loading-skeleton/i);
});

test("publishes indexable permanent project pages and current professional timing", async () => {
  const source = await readFile(path.join(process.cwd(), "app", "project-pages.tsx"), "utf8");
  const portfolio = await readFile(path.join(process.cwd(), "app", "portfolio.tsx"), "utf8");
  const sitemap = await readFile(path.join(process.cwd(), "app", "sitemap.ts"), "utf8");

  for (const slug of [
    "scanned-memories",
    "digital-echoes",
    "memorygrid",
    "wordview",
    "readyloop",
    "dt-fabrication-dashboard",
    "robotics",
  ]) {
    assert.match(source, new RegExp(`slug: "${slug}"`));
  }
  assert.doesNotMatch(portfolio, /Incoming Secondary Robotics ASA Teams Coordinator|appointment effective from September 2026/);
  assert.match(sitemap, /projectPages/);
  assert.match(sitemap, /https:\/\/wcchun\.com\/work/);
  assert.match(source, /Role, tools and collaboration/);
  assert.match(source, /project\.role/);
  assert.match(source, /project\.tools/);
  assert.match(source, /project\.status/);
  assert.match(source, /project\.collaboration/);
  assert.match(source, /BreadcrumbList/);
  assert.match(source, /Previous project/);
  assert.match(source, /Next project/);
  assert.match(source, /Related projects/);
  assert.match(source, /ProjectGallery/);
  assert.match(source, /project-page-\$\{project\.section\}/);
  assert.match(sitemap, /2026-07-26/);
});

test("uses permanent pages as the primary artwork path and keeps motion restrained", async () => {
  const html = await (await render()).text();
  const source = await readFile(path.join(process.cwd(), "app", "portfolio.tsx"), "utf8");
  const motion = await readFile(path.join(process.cwd(), "app", "portfolio-motion.ts"), "utf8");
  const styles = await readFile(path.join(process.cwd(), "app", "globals.css"), "utf8");
  assert.match(html, /href="\/work\/scanned-memories"/);
  assert.match(html, /Explore selected art/);
  assert.match(html, /View technology systems/);
  assert.match(html, /Quick view/);
  assert.match(html, /featured-tool/);
  assert.match(html, /compact-tool/);
  assert.match(html, /chapter-indicator/);
  assert.match(html, /href="\/work"[^>]*>Explore all 29 works/);
  assert.match(motion, /dependencies: \[filterKey, showArchive\]/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /gsap\.matchMedia/);
  assert.match(source, /className="project-primary-action"/);
  assert.doesNotMatch(source, /permanentProjectUrls\[project\.title\] \?\? "#work"/);
  assert.match(styles, /\.chapter-indicator\s*\{[\s\S]*?pointer-events:\s*none/);
  assert.match(styles, /@media \(max-width: 1400px\)[\s\S]*?\.chapter-indicator\s*\{\s*display:\s*none/);
  assert.match(styles, /@media \(max-width: 760px\)[\s\S]*?\.project-page-hero h1\s*\{[\s\S]*?font-size:\s*clamp\(48px,\s*14vw,\s*66px\)/);
  assert.doesNotMatch(source, /handlePointerMove/);
});

test("offers all 29 works through the archive and a fuller permanent gallery", async () => {
  const archive = await render("/work");
  assert.equal(archive.status, 200);
  const archiveHtml = await archive.text();
  assert.match(archiveHtml, /Art archive — 29 works/);
  assert.match(archiveHtml, /Filter artworks by medium/);
  assert.equal((archiveHtml.match(/href="\/work\/[^\"]+" class="project-primary-action"/g) ?? []).length, 29);

  const project = await render("/work/scanned-memories");
  assert.equal(project.status, 200);
  const projectHtml = await project.text();
  assert.match(projectHtml, /Scanned Memories process/);
  assert.match(projectHtml, /Enlarge image 1 of 16/);
});

test("offers an accessible full-image viewer on permanent project pages", async () => {
  const gallery = await readFile(path.join(process.cwd(), "app", "project-gallery.tsx"), "utf8");
  const styles = await readFile(path.join(process.cwd(), "app", "globals.css"), "utf8");

  assert.match(gallery, /aria-label={`Enlarge image/);
  assert.match(gallery, /role="dialog"/);
  assert.match(gallery, /aria-modal="true"/);
  assert.match(gallery, /event\.key === "Escape"/);
  assert.match(gallery, /event\.key === "ArrowLeft"/);
  assert.match(gallery, /event\.key === "ArrowRight"/);
  assert.match(gallery, /event\.key === "Tab"/);
  assert.match(styles, /\.project-lightbox\s*\{/);
  assert.match(styles, /object-fit:\s*contain/);
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
  assert.match(html, /technology\/robotics\/learning-wall\.webp/);
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
  assert.match(source, /Outstanding Innovation and Creativity Award/);
});

test("includes the complete robotics learning case-study media", async () => {
  const source = await readFile(new URL("../app/portfolio.tsx", import.meta.url), "utf8");

  assert.match(source, /Teach students how to get unstuck/);
  assert.match(source, /robotics-get-unstuck-wall\.pdf/);
  assert.match(source, /esp32-led-demo\.mp4/);
  assert.match(source, /esp32-servo-demo\.mp4/);
  assert.match(source, /Poster systems · troubleshooting prompts · demonstrations/);
});

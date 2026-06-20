const areas = [
  { id: "prepare", name: "Prepare inputs", color: "#0f766e", summary: "Convert raw media, files, meetings, and current facts into clean artifacts other procedures can trust." },
  { id: "think", name: "Think clearly", color: "#3156a3", summary: "Extract signal, expose assumptions, and make review material easier to reason over." },
  { id: "create", name: "Create outputs", color: "#6941c6", summary: "Produce writing, images, frontend work, HTML reports, and video edits." },
  { id: "ship", name: "Publish and ship", color: "#b7791f", summary: "Move finished work into a real URL, merge, or stakeholder-facing update." },
  { id: "verify", name: "Verify quality", color: "#b42318", summary: "Turn done into evidence: browser checks, test notes, and repo-local QA memory." },
  { id: "operate", name: "Run agents", color: "#38761d", summary: "Package tasks, coordinate sessions, delegate visibly, and improve the skill system." }
];

const skills = [
  skill("image-generation-gateway", "Image Generation Gateway", "Image API wrapper", "create", "Generate or edit images through one saved API pattern instead of solving model, endpoint, size, and output-path details every time.", ["preferred image API or model router", "default model IDs and fallback models", "output directory and naming convention", "rules for safe image editing requests"], ["local skill folder with SKILL.md", "example generation commands", "saved defaults file", "sample output manifest"], ["run a small image generation smoke test", "confirm the image file exists in the chosen output directory", "record model, prompt, size, and cost or usage when available"], ["images", "API", "gateway"]),
  skill("current-information-search", "Current-Information Search", "Live research", "prepare", "Route time-sensitive research through live search and preserve source dates so stale model memory does not become published fact.", ["approved search tool or API", "rules for when live search is mandatory", "source ranking rules", "citation format"], ["current-info search skill", "source table template", "fact versus inference checklist", "recency gate"], ["search a recent product or pricing claim", "show dates for every source used", "separate confirmed facts from inference"], ["research", "current facts", "sources"]),
  skill("media-transcription", "Media Transcription", "Audio/video to transcript", "prepare", "Turn local audio or video into clean text, timestamps, chapters, and speaker-aware artifacts for later analysis or editing.", ["transcription API or local engine", "input media folder", "artifact naming convention", "speaker-label and timestamp preferences"], ["transcription skill", "clean transcript template", "chapter summary template", "word timestamp artifact when supported"], ["transcribe a short local media file", "confirm transcript and metadata files exist", "spot-check timestamps against the media"], ["transcript", "media", "timestamps"]),
  skill("heavy-file-ingestion", "Heavy File Ingestion", "File cleanup", "prepare", "Convert PDFs, decks, spreadsheets, CSVs, or long documents into lean Markdown, CSV, and index artifacts before analysis begins.", ["allowed file types", "conversion tools available in the environment", "output folder convention", "privacy boundaries for source documents"], ["ingestion skill", "artifact index", "per-file conversion recipe", "analysis handoff checklist"], ["convert one heavy file", "confirm extracted text or tables are readable", "verify analysis uses converted artifacts rather than raw heavy files"], ["PDF", "CSV", "conversion"]),
  skill("html-artifact-builder", "HTML Artifact Builder", "Make an HTML report", "create", "Turn dense plans, research, comparisons, diagrams, or summaries into a polished self-contained local HTML artifact.", ["visual style defaults", "asset policy", "required sections", "accessibility and responsive constraints"], ["HTML artifact skill", "starter template", "component rules", "verification checklist"], ["build a sample artifact", "open it in a browser", "check mobile width and console errors"], ["HTML", "artifact", "report"]),
  skill("brain-dump-processor", "Brain Dump Processor", "Idea extractor", "prepare", "Extract distinct ideas from messy notes or voice transcripts, separate them, and decide which ones deserve follow-up.", ["input note or transcript folder", "idea scoring criteria", "destination for saved ideas", "rules for preserving uncertainty"], ["brain-dump skill", "idea card template", "triage rubric", "follow-up queue format"], ["process a messy note", "confirm each idea is separated", "mark source-grounded claims versus interpretation"], ["ideas", "notes", "voice memo"]),
  skill("meeting-synthesis", "Meeting Synthesis", "Meeting notes", "prepare", "Convert meeting transcripts into decisions, action items, open questions, and durable context without inventing unstated agreement.", ["transcript source", "attendee and owner conventions", "action-item format", "destination for meeting notes"], ["meeting synthesis skill", "decision log template", "action item table", "open question list"], ["summarize a sample meeting", "verify owners and deadlines are only assigned when stated", "separate exact decisions from inferred next steps"], ["meetings", "decisions", "actions"]),
  skill("weekly-signal-diff", "Weekly Signal Diff", "Change detector", "think", "Compare a recurring input set against prior state and report only meaningful changes, new signals, dead threads, and shifted assumptions.", ["input folders or feeds", "state file location", "signal criteria", "cadence"], ["signal-diff skill", "state file schema", "weekly report template", "change classification rules"], ["run once to create state", "run again on changed inputs", "confirm stable items are not repeated as new signal"], ["diff", "weekly", "signals"]),
  skill("assumption-checker", "Assumption Checker", "Skeptical review", "think", "Audit plans, arguments, or strategy docs for unstated assumptions, missing evidence, contradictions, and load-bearing risks.", ["document to review", "risk scale", "evidence standard", "output severity labels"], ["assumption checker skill", "assumption table", "risk ranking rubric", "recommended next evidence list"], ["review a sample plan", "identify at least one load-bearing assumption", "distinguish missing evidence from disagreement"], ["red team", "risk", "evidence"]),
  skill("reading-pack-builder", "Reading Pack Builder", "Review packet", "think", "Turn a pile of local documents into a guided reading surface with order, summaries, index, and progress tracking.", ["document set", "reader goal", "ordering criteria", "local HTML or Markdown preference"], ["reading pack skill", "ordered source index", "reader-facing HTML pack", "progress metadata"], ["build a small pack", "confirm every source appears in the index", "open the pack and verify navigation"], ["review", "documents", "HTML"]),
  skill("personal-voice-skill", "Personal Voice Skill", "Write like me", "create", "Teach the agent to write from real samples across contexts instead of using a single vague tone preset.", ["approved writing samples", "register names", "phrases to avoid", "revision standards"], ["personal voice skill", "sample library index", "register selection rules", "self-check checklist"], ["rewrite a short draft", "compare against samples", "remove generic AI phrasing and unsupported claims"], ["voice", "writing", "style"]),
  skill("new-release-briefing", "New Release Briefing", "Release explainer", "create", "Turn gathered release facts into a publishable briefing with what changed, why it matters, and what readers should do next.", ["current research packet", "target audience", "publication voice", "image or thumbnail needs"], ["release briefing skill", "briefing outline", "title and subtitle patterns", "image prompt block"], ["brief a recent release", "cite source dates", "separate release facts from analysis"], ["release", "briefing", "analysis"]),
  skill("audience-calibrated-content-system", "Audience-Calibrated Content System", "Write for this audience", "create", "Draft content for a publication with a known audience level, recurring formats, banned jargon, and cadence.", ["audience knowledge floor and ceiling", "publication formats", "banned terms", "examples of successful pieces"], ["audience content skill", "format chooser", "jargon substitution list", "draft checklist"], ["draft one piece from a theme", "verify it stays inside the audience knowledge band", "check banned jargon"], ["audience", "content", "newsletter"]),
  skill("branded-image-prompting-guide", "Branded Image Prompting Guide", "Brand image prompts", "create", "Generate image prompts that preserve a visual brand across thumbnails, diagrams, photoreal scenes, and UI mockups.", ["brand colors and typography direction", "composition references", "allowed image styles", "model-specific prompt preferences"], ["brand image prompt skill", "prompt library", "style lock rules", "negative prompt guidance"], ["generate prompts for three formats", "confirm brand constraints appear in each prompt", "record which model each prompt targets"], ["images", "brand", "prompts"]),
  skill("frontend-taste-system", "Frontend Taste System", "Build better UI", "create", "Replace generic frontend defaults with stronger layout, typography, component discipline, and screenshot-driven visual QA.", ["target audience", "existing design system or absence of one", "responsive breakpoints", "visual verification tools"], ["frontend taste skill", "layout decision rules", "component checklist", "screenshot QA loop"], ["build or revise a small page", "capture desktop and mobile screenshots", "fix visible overlap or weak hierarchy before done"], ["frontend", "UI", "visual QA"]),
  skill("personal-site-publisher", "Personal Site Publisher", "Publish page", "ship", "Move a finished page to a real URL with slug, metadata, preview image, indexing choice, local verification, and deploy proof.", ["site repo or publishing target", "routing convention", "metadata rules", "deployment command and rollback boundary"], ["publisher skill", "publish checklist", "metadata template", "verification receipt format"], ["publish or dry-run a sample page", "verify local and deployed URL", "check title, description, and social preview metadata"], ["publish", "site", "metadata"]),
  skill("image-model-comparison-arena", "Image Model Comparison Arena", "Compare image models", "create", "Build comparison pages for image-generation models from shared prompts, model outputs, cost notes, and behavior notes.", ["model list", "prompt set", "output storage", "cost tracking method"], ["comparison arena skill", "model config format", "side-by-side viewer", "review-page template"], ["run one prompt across at least two models", "confirm outputs are labeled by model", "record cost and notable behavior"], ["models", "images", "comparison"]),
  skill("essay-illustration-gallery", "Essay Illustration Gallery", "Illustrate an essay", "create", "Select image-worthy moments across an essay and create a coherent illustration gallery instead of one isolated hero image.", ["finished essay", "preferred illustration style", "image count range", "gallery output target"], ["essay illustration skill", "moment selection table", "style lock prompt", "gallery page"], ["select moments across beginning, middle, and end", "generate or stub images consistently", "confirm every image has a reason caption"], ["essay", "illustration", "gallery"]),
  skill("radio-edit", "Radio Edit", "Transcript paper edit", "create", "Create a transcript-driven rough cut where the spoken narrative is fixed before visuals are touched.", ["timestamped transcript", "editorial priorities", "timeline format", "cut notation rules"], ["radio edit skill", "paper edit", "keep/cut rationale", "timeline export or edit list"], ["edit a short transcript", "mark false starts and repeated takes", "confirm the final narrative is coherent before visuals"], ["video", "edit", "transcript"]),
  skill("b-roll-pipeline", "B-Roll Pipeline", "Add motion graphics", "create", "Choose moments in a talking-head video that deserve graphics, then generate consistent motion assets without wallpapering the whole video.", ["finished transcript or paper edit", "graphic density rules", "visual style guide", "animation stack"], ["b-roll pipeline skill", "graphic moment list", "asset prompts or components", "placement plan"], ["select a small set of graphic moments", "confirm spacing rules are followed", "render or preview one graphic asset"], ["video", "graphics", "motion"]),
  skill("ai-editing-assistant", "AI Editing Assistant (NLE Integration)", "Edit inside the NLE", "create", "Connect the agent to video editing software so it can analyze, cut, and assemble inside the real project instead of producing disconnected files.", ["supported NLE and scripting API", "project file safety rules", "timeline naming convention", "undo or backup procedure"], ["NLE assistant skill", "safe scripting checklist", "timeline operation recipes", "review handoff"], ["open or inspect a test project safely", "perform a non-destructive operation", "confirm the project can be reviewed or reverted"], ["video", "NLE", "DaVinci"]),
  skill("testing-runbook-creator", "Testing Runbook Creator", "Save test knowledge", "verify", "Preserve testing discoveries in repo-local runbook entries so future agents do not relearn the same routes, selectors, or setup rules.", ["repo-local docs path", "test categories", "safe versus destructive action rules", "cleanup expectations"], ["testing runbook creator skill", "runbook entry template", "safe action checklist", "verification command log"], ["test a small workflow", "write a repo-local entry", "confirm another session could follow it"], ["testing", "runbook", "repo"]),
  skill("page-testing-memory", "Page Testing Memory", "Put test facts in the right place", "verify", "Keep generic QA method global while storing page-specific selectors, test accounts, and quirks in repo-local runbooks.", ["global QA process", "repo-local memory location", "selector and fixture rules", "privacy boundary for test accounts"], ["page testing memory skill", "knowledge-placement rules", "local fact template", "review checklist"], ["classify sample QA notes", "move page-specific facts local", "confirm no private details leak into global skill text"], ["testing", "memory", "selectors"]),
  skill("browser-automation-qa", "Browser Automation QA", "Browser proof", "verify", "Use browser automation to verify pages with screenshots, console checks, network checks, responsive views, accessibility checks, and metrics.", ["browser automation tool", "target routes", "viewport list", "evidence folder"], ["browser QA skill", "route checklist", "screenshot and console evidence", "issue report format"], ["open a local or live page", "capture desktop and mobile evidence", "report console errors and responsive overflow"], ["browser", "QA", "screenshots"]),
  skill("goal-prompt-generator", "Goal Prompt Generator", "Package a task", "operate", "Turn fuzzy work into a bounded autonomous objective with constraints, definition of done, stop conditions, and verification gates.", ["task context", "files or systems in scope", "out-of-scope boundaries", "required proof"], ["goal prompt generator skill", "objective template", "constraint checklist", "verification gate list"], ["convert a vague task into a goal prompt", "confirm scope and stop conditions are explicit", "verify the prompt forbids unsafe improvisation"], ["delegation", "goal", "prompt"]),
  skill("visible-delegation", "Visible Delegation", "Supervise another agent", "operate", "Run delegated agent work in a visible, interruptible session with a packaged goal prompt and explicit progress checks.", ["delegate command or tool", "shared terminal or session mechanism", "handoff format", "interruption rules"], ["visible delegation skill", "delegate launch checklist", "progress monitor routine", "handoff receipt"], ["launch a harmless delegate task", "observe progress visibly", "collect final receipt before accepting completion"], ["delegation", "parallel", "supervision"]),
  skill("session-operating-map", "Session Operating Map", "Track work lanes", "operate", "Maintain a project map of parallel agent sessions, ownership lanes, blockers, and archived outcomes.", ["project state file path", "lane naming convention", "blocker format", "archive rules"], ["session map skill", "operating map template", "lane status rules", "archive checklist"], ["create a map for two hypothetical lanes", "update one blocker", "archive a completed lane cleanly"], ["sessions", "coordination", "state"]),
  skill("self-authored-pr-merge", "Self-Authored PR Merge", "Merge your own PR safely", "ship", "Review and merge a PR you authored yourself by doing a real fresh-eyes pass instead of rubber-stamping it.", ["GitHub or git workflow", "CI status source", "review checklist", "merge permissions"], ["self-merge skill", "diff review checklist", "CI gate", "merge receipt"], ["inspect a sample diff", "verify CI or local tests", "produce a concise merge rationale"], ["PR", "merge", "review"]),
  skill("stakeholder-update-email", "Stakeholder Update Email", "Tell people it shipped", "ship", "Draft or send a concise update after stakeholder-visible work changes, using the recipient's vocabulary rather than implementation detail.", ["recipient context", "shipped behavior", "evidence URL or artifact", "send versus draft boundary"], ["stakeholder update skill", "email template", "truthfulness checklist", "delivery rule"], ["draft a sample update", "confirm it only claims shipped behavior", "include link or evidence when available"], ["email", "update", "stakeholder"]),
  skill("session-to-skill-extractor", "Session-to-Skill Extractor", "Capture reusable lessons", "operate", "Review completed sessions and preserve only recurring, non-obvious, codifiable procedures as new skill candidates.", ["session transcript or summary", "bar for skill-worthy lessons", "target skill folder", "review owner"], ["session-to-skill skill", "candidate evaluation rubric", "draft SKILL.md", "rejection note format"], ["review a session summary", "reject ordinary preferences", "draft one candidate only if it clears the bar"], ["skills", "learning", "improvement"]),
  skill("agentic-harness-designer", "Agentic Harness Designer", "Design the agent system", "operate", "Design agent-powered systems by specifying tools, permissions, memory, state, evaluations, visibility, and operator controls.", ["product or workflow goal", "available tools", "permission model", "evaluation standard"], ["harness design skill", "architecture review checklist", "risk and approval model", "operator visibility plan"], ["review a sample agent workflow", "identify missing permissions or observability", "produce a concrete implementation plan"], ["architecture", "agents", "permissions"])
];

const workflows = [
  workflow("voice-to-page", "Voice memo to published page", "Talk to Published", "A recorded idea becomes a verified published page.", ["Transcribe the media", "Extract distinct ideas", "Choose the publishable thread", "Draft in the author's voice", "Build an HTML or site page", "Publish to a real URL", "Verify URL and preview metadata"], ["Media Transcription", "Brain Dump Processor", "Personal Voice Skill", "HTML Artifact Builder", "Personal Site Publisher"]),
  workflow("release-day", "Fast release briefing", "Release Day", "A current event becomes an accurate, branded briefing the same day.", ["Search current sources", "Extract what changed", "Write the briefing", "Create branded image prompt", "Generate or select image", "Publish the page", "Send stakeholder update"], ["Current-Information Search", "New Release Briefing", "Branded Image Prompting Guide", "Image Generation Gateway", "Personal Site Publisher", "Stakeholder Update Email"]),
  workflow("video-line", "Talking-head video to finished edit", "The Video Production Line", "Raw talking-head footage becomes an edited package with narrative and graphics handled in order.", ["Transcribe the video", "Create the radio edit", "Choose graphic moments", "Build b-roll assets", "Operate in the NLE", "Send review update"], ["Media Transcription", "Radio Edit", "B-Roll Pipeline", "AI Editing Assistant (NLE Integration)", "Stakeholder Update Email"]),
  workflow("trusted-page", "Ship a web page with proof", "Ship a Page You Can Trust", "A page ships only after visual, browser, and reusable testing evidence exists.", ["Build with frontend taste rules", "Publish or stage the page", "Run browser QA", "Capture evidence", "Save testing knowledge"], ["Frontend Taste System", "Personal Site Publisher", "Browser Automation QA", "Testing Runbook Creator"]),
  workflow("research-engine", "Research with traceable claims", "The Research Engine", "Messy sources become a reviewed artifact where claims trace back to evidence.", ["Convert heavy files", "Search current gaps", "Check assumptions", "Synthesize meetings or notes", "Build the artifact", "Package sources for review"], ["Heavy File Ingestion", "Current-Information Search", "Assumption Checker", "Meeting Synthesis", "HTML Artifact Builder", "Reading Pack Builder"]),
  workflow("delegate-verify", "Delegate work without losing control", "Delegate and Verify", "Parallel agent work happens under visible supervision and measurable gates.", ["Map work lanes", "Package the goal", "Launch visible delegate", "Verify gates", "Review and merge if needed", "Update stakeholders"], ["Session Operating Map", "Goal Prompt Generator", "Visible Delegation", "Self-Authored PR Merge", "Stakeholder Update Email"]),
  workflow("improvement-loop", "Improve the system after each run", "The Flywheel", "Useful discoveries become better procedures instead of dying in chat.", ["Review the completed session", "Extract recurring patterns", "Save testing discoveries", "Separate global and local facts", "Update the operating map"], ["Session-to-Skill Extractor", "Testing Runbook Creator", "Page Testing Memory", "Session Operating Map"])
];

function skill(id, original, plain, area, use, requirements, outputs, verification, tags) {
  return { id, original, plain, area, use, requirements, outputs, verification, tags };
}

function workflow(id, name, original, outcome, steps, skills) {
  return { id, name, original, outcome, steps, skills };
}

function areaById(id) {
  return areas.find((area) => area.id === id);
}

function buildInstallPrompt(item) {
  const area = areaById(item.area);
  return `Create a local agent skill named "${item.original}". This should be a complete, reusable procedure in the "${area.name}" area of my Open Skills library. Use the plain-English name "${item.plain}" in the summary so future agents understand the job quickly.

Goal:
${item.use}

Install requirements:
${item.requirements.map((entry) => `- Collect or define: ${entry}.`).join("\n")}

Create these artifacts:
${item.outputs.map((entry) => `- ${entry}.`).join("\n")}

Skill behavior:
- Write a SKILL.md with clear trigger rules, non-trigger rules, required inputs, allowed tools, boundaries, output format, and verification steps.
- Keep this procedure narrow. It should do this job well instead of becoming a general assistant prompt.
- Separate personal defaults from project-local facts. Put project-specific paths, selectors, credentials, deployment commands, or seed data in repo-local configuration or notes, not in the global skill body.
- Do not store secrets in the skill. If an API key or login is needed, document the environment variable or connector requirement and stop if it is missing.
- Include at least one example invocation and one example final handoff.
- If scripts or templates would make the procedure safer, create them beside the skill and reference them from SKILL.md.

Verification before calling the install complete:
${item.verification.map((entry) => `- ${entry}.`).join("\n")}
- Re-open the generated SKILL.md and confirm it names the trigger, required inputs, output, and proof standard.
- Report the files created, the assumptions you made, and any capability that still needs user setup.`;
}

let activeArea = "all";
let selectedSkillId = skills[0].id;

const areaMap = document.querySelector("#areaMap");
const filterButtons = document.querySelector("#filterButtons");
const skillGrid = document.querySelector("#skillGrid");
const workflowList = document.querySelector("#workflowList");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const promptList = document.querySelector("#promptList");
const promptArea = document.querySelector("#promptArea");
const promptTitle = document.querySelector("#promptTitle");
const promptText = document.querySelector("#promptText");
const copyPrompt = document.querySelector("#copyPrompt");
const detailPanel = document.querySelector("#detailPanel");
const closeDetail = document.querySelector("#closeDetail");
const detailArea = document.querySelector("#detailArea");
const detailTitle = document.querySelector("#detailTitle");
const detailUse = document.querySelector("#detailUse");
const detailOutputs = document.querySelector("#detailOutputs");
const detailRequirements = document.querySelector("#detailRequirements");
const detailVerification = document.querySelector("#detailVerification");
const detailPromptLink = document.querySelector("#detailPromptLink");

function renderAreas() {
  areaMap.innerHTML = areas.map((area) => {
    const areaSkills = skills.filter((item) => item.area === area.id);
    return `<article class="area-card"><div><div class="area-stripe" style="background:${area.color}"></div><h3>${area.name}</h3><p>${area.summary}</p><div class="area-skill-list" aria-label="Skills in ${area.name}">${areaSkills.map((item) => `<button class="area-skill-link" type="button" data-jump-skill="${item.id}">${item.original}</button>`).join("")}</div></div><div class="area-meta"><span>${areaSkills.length} skills</span><span>Group</span></div></article>`;
  }).join("");

  areaMap.querySelectorAll("[data-jump-skill]").forEach((button) => {
    button.addEventListener("click", () => jumpToSkill(button.dataset.jumpSkill));
  });
}

function jumpToSkill(id) {
  activeArea = "all";
  searchInput.value = "";
  renderFilters();
  renderSkills();
  requestAnimationFrame(() => {
    const card = document.getElementById(`skill-${id}`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("is-targeted");
    setTimeout(() => card.classList.remove("is-targeted"), 1800);
  });
}

function renderFilters() {
  const buttons = [{ id: "all", name: "All" }, ...areas.map((area) => ({ id: area.id, name: area.name }))];
  filterButtons.innerHTML = buttons.map((button) => `<button class="filter-button ${button.id === activeArea ? "is-active" : ""}" data-area="${button.id}" type="button">${button.name}</button>`).join("");
  filterButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeArea = button.dataset.area;
      renderFilters();
      renderSkills();
    });
  });
}

function filteredSkills() {
  const query = searchInput.value.trim().toLowerCase();
  return skills.filter((item) => {
    const area = areaById(item.area);
    const haystack = [item.original, item.plain, item.use, item.tags.join(" "), item.requirements.join(" "), item.outputs.join(" "), area.name].join(" ").toLowerCase();
    return (activeArea === "all" || item.area === activeArea) && (!query || haystack.includes(query));
  });
}

function renderSkills() {
  const items = filteredSkills();
  resultCount.textContent = `${items.length} of ${skills.length} skills shown`;
  skillGrid.innerHTML = items.map((item) => {
    const area = areaById(item.area);
    return `<article class="skill-card" id="skill-${item.id}" tabindex="-1"><header><span class="plain-name" style="color:${area.color}">${item.plain}</span><span class="tag">${area.name}</span></header><h3>${item.original}</h3><p>${item.use}</p><footer>${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</footer><div class="card-actions"><button class="button secondary" type="button" data-detail="${item.id}">Details</button><a class="button primary" href="#install" data-prompt="${item.id}">Install prompt</a></div></article>`;
  }).join("");

  skillGrid.querySelectorAll("[data-detail]").forEach((button) => button.addEventListener("click", () => openDetail(button.dataset.detail)));
  skillGrid.querySelectorAll("[data-prompt]").forEach((link) => link.addEventListener("click", () => selectPrompt(link.dataset.prompt)));
}

function renderWorkflows() {
  workflowList.innerHTML = workflows.map((item) => `<article class="workflow-card"><div class="workflow-summary"><span class="plain-name">${item.original}</span><h3>${item.name}</h3><p>${item.outcome}</p></div><div class="workflow-body"><ol class="step-list">${item.steps.map((step) => `<li>${step}</li>`).join("")}</ol><div class="workflow-skills" aria-label="Skills used">${item.skills.map((name) => `<span class="tag">${name}</span>`).join("")}</div></div></article>`).join("");
}

function renderPromptList() {
  promptList.innerHTML = skills.map((item) => `<button class="prompt-list-item ${item.id === selectedSkillId ? "is-active" : ""}" type="button" data-select-prompt="${item.id}"><strong>${item.original}</strong><span>${item.plain}</span></button>`).join("");
  promptList.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => selectPrompt(button.dataset.selectPrompt)));
}

function selectPrompt(id) {
  selectedSkillId = id;
  const item = skills.find((skillItem) => skillItem.id === id);
  const area = areaById(item.area);
  promptArea.textContent = area.name;
  promptArea.style.color = area.color;
  promptTitle.textContent = item.original;
  promptText.textContent = buildInstallPrompt(item);
  renderPromptList();
}

function openDetail(id) {
  const item = skills.find((skillItem) => skillItem.id === id);
  const area = areaById(item.area);
  detailArea.textContent = area.name;
  detailArea.style.color = area.color;
  detailTitle.textContent = item.original;
  detailUse.textContent = item.use;
  detailOutputs.innerHTML = item.outputs.map((entry) => `<li>${entry}</li>`).join("");
  detailRequirements.innerHTML = item.requirements.map((entry) => `<li>${entry}</li>`).join("");
  detailVerification.innerHTML = item.verification.map((entry) => `<li>${entry}</li>`).join("");
  detailPromptLink.onclick = () => selectPrompt(id);
  detailPanel.setAttribute("aria-hidden", "false");
  closeDetail.focus();
}

function closeDetailPanel() {
  detailPanel.setAttribute("aria-hidden", "true");
}

copyPrompt.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promptText.textContent);
    copyPrompt.textContent = "Copied";
    setTimeout(() => { copyPrompt.textContent = "Copy prompt"; }, 1600);
  } catch (error) {
    copyPrompt.textContent = "Select text to copy";
    setTimeout(() => { copyPrompt.textContent = "Copy prompt"; }, 2000);
  }
});

searchInput.addEventListener("input", renderSkills);
document.querySelectorAll("[data-hero-skill]").forEach((button) => {
  button.addEventListener("click", () => jumpToSkill(button.dataset.heroSkill));
});
closeDetail.addEventListener("click", closeDetailPanel);
detailPanel.addEventListener("click", (event) => { if (event.target === detailPanel) closeDetailPanel(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDetailPanel(); });

renderAreas();
renderFilters();
renderSkills();
renderWorkflows();
renderPromptList();
selectPrompt(selectedSkillId);
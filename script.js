// Raghava Pramod — personal site
// Story data model: one Instagram post = one complete carousel.
// The home page (index.html) shows a lens-dial of 6 genres; clicking
// one opens shots.html?genre=<id>, which lists every story in that
// genre as a card: title/info | scrollable carousel | behind-the-shot
// write-up. Visiting shots.html with no genre shows everything,
// grouped by genre. This file is loaded by both pages — each render
// function no-ops if its container isn't on the current page.
//
// ─────────────────────────────────────────────────────────────
// HOW TO ADD A NEW POST
// ─────────────────────────────────────────────────────────────
// 1. Save the post's photos as images/<folder>/01.jpg, 02.jpg, ...
//    (sequential, zero-padded, matching the order they appear in
//    the Instagram carousel — every image in the post, not a subset).
// 2. Add one object to the STORIES array below, with a `genre` that
//    matches one of the GENRES ids below.
// 3. Add a `perspective` write-up — the longer, first-person
//    paragraph about technique/perspective, shown in the "Behind the
//    shot" column next to the carousel on shots.html.
// ─────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Story
 * @property {string} id
 * @property {string} genre           must match a GENRES id
 * @property {string} instagramUrl
 * @property {string} title
 * @property {string} category
 * @property {string} note            short line shown next to the carousel
 * @property {boolean} behindTheShot  legacy flag, currently unused (every story shows its perspective on shots.html)
 * @property {string} [perspective]   longer first-person write-up shown in the "Behind the shot" column
 * @property {string[]} [behindThumbs] curated clean thumbnail picks — not currently rendered, kept for future use
 * @property {string[]} images
 */

function frames(folder, count) {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `images/${folder}/${n}.jpg`;
  });
}

/** @type {{id: string, label: string, focal: number, desc: string}[]} */
const GENRES = [
  { id: "people", label: "People", focal: 85, desc: "Strangers framed by the city, and portraits from the archive." },
  { id: "streets", label: "Streets", focal: 35, desc: "Walking with no plan and shooting whatever colour stops me first." },
  { id: "facades", label: "Facades", focal: 24, desc: "A week of hunting for curves, and the symmetry of Bara Imambara." },
  { id: "light-objects", label: "Light & Objects", focal: 50, desc: "Long exposures and light painting in a dark room." },
  { id: "concepts", label: "Concepts", focal: 100, desc: "My life as Nolan movie posters, and photos split in two: sun and moon, two cities, two statues." },
  { id: "technique", label: "Technique", focal: 135, desc: "My composition cheat sheet, and subject anchoring explained." },
];

/** @type {Story[]} */
const STORIES = [
  {
    id: "nolan",
    genre: "concepts",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DbLhh34AQnA/",
    title: "What if Christopher Nolan directed my life?",
    category: "The one where I got carried away",
    note: "All shot on my phone. The Joker is someone I photographed in full makeup on Halloween.",
    behindTheShot: true,
    perspective: "This is the most fun I've had shooting anything. It started with a silly question: what if my life was a Nolan film? It turned into a full poster series, all shot on my phone. For the Dark Knight poster, I photographed someone in Joker makeup on Halloween and blurred the buildings behind them so your eye goes straight to the face. For Inception, I shot an office building straight up, then flipped and mirrored it until the sky looked like it was folding in on itself. Tenet is the one I'm proudest of. It's a double exposure of my friend, once upright and once upside down, to get that forward and backward feeling without any filters. Oppenheimer is a bottle of cold brew lit from below in a dark room. Sometimes 'the bomb' is just good backlighting and a steady hand. Dunkirk and Odyssey are travel photos that already had the mood. I didn't have to try for those.",
    images: frames("nolan", 9),
  },
  {
    id: "composition",
    genre: "technique",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DX9dPskgfzy/",
    title: "My cheat sheet for composition",
    category: "The one that's basically a tutorial",
    note: "Every composition rule I use, with a real photo for each one.",
    behindTheShot: true,
    perspective: "I made this one for myself as much as for anyone else. It's a list of the composition rules I use, each with a photo where I used it. The rule of thirds on a drink at a bar table. A door and a stool split down the middle for 'vertical half and half.' Then leading lines, frames within frames, and diagonals. None of it is complicated. Most of the time I just pause for two extra seconds and ask where the eye will land first.",
    images: frames("composition", 20),
  },
  {
    id: "framing",
    genre: "people",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DbFloqJAYiS/",
    title: "For the love of framing",
    category: "People, framed by the city",
    note: "Shot in black and white so the shapes stand out, not the colours.",
    behindTheShot: true,
    perspective: "I love a frame within a frame. Windows, doorways, the gap between two buildings, anything that lets me box a person into the shot without them noticing. In this set, the frame was already there before I showed up. I just had to spot it and wait for someone to walk into it. I shot it in black and white on purpose, because colour would pull attention away from the shapes.",
    behindThumbs: ["images/framing/03.jpg", "images/framing/06.jpg", "images/framing/05.jpg"],
    images: frames("framing", 7),
  },
  {
    id: "light",
    genre: "light-objects",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/Dbfo3-egagR/",
    title: "Let there be",
    category: "Playing with light in the dark",
    note: "No people in this one. Just what light does to a dark room.",
    behindTheShot: true,
    perspective: "This is my light painting and long exposure set. The fancy word for it is chiaroscuro, but really I just turned off the lights to see what one light source would do. The LED strip patterns, the ceiling light shot straight on, and the circular light trails are mostly long exposures. I moved a light through the frame while the shutter stayed open. It's slow and careful, very different from how I usually shoot on the street.",
    behindThumbs: ["images/light/08.jpg", "images/light/04.jpg", "images/light/06.jpg"],
    images: frames("light", 10),
  },
  {
    id: "curved",
    genre: "facades",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DYXJbnNAUg2/",
    title: "The world doesn't move in straight lines",
    category: "A week of hunting for curves",
    note: "I gave myself one rule for a week: no straight lines allowed in the frame.",
    behindTheShot: true,
    perspective: "I gave myself a small challenge: for a week, I could only shoot curves. No straight horizons and no straight edges if I could help it. I found a neon sign bent into an arc, a tunnel ceiling, and a yellow sculpture reaching up. If you shoot a lot of buildings like I do, try it. Straight lines get easy fast. Curves make you think about where you're standing.",
    behindThumbs: ["images/curved/13.jpg", "images/curved/06.jpg", "images/curved/12.jpg"],
    images: frames("curved", 16),
  },
  {
    id: "duality",
    genre: "concepts",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DYccQa4AdBd/",
    title: "Harmony found in the divide",
    category: "Two halves, one frame",
    note: "Photos split in two: the sun and moon, two cities, and two statues side by side.",
    behindTheShot: true,
    perspective: "In this set, I split each frame down the middle and put two opposite things on either side. The sun fades into the moon in the same sky. A Hyderabad sunrise sits next to a Goa evening. Two carved figures, one polished and one raw wood, are joined together. Two photos side by side can say something neither one says alone.",
    behindThumbs: ["images/duality/02.jpg", "images/duality/03.jpg"],
    images: frames("duality", 6),
  },
  {
    id: "streetcolors",
    genre: "streets",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DVn-7-ICOil/",
    title: "Where the colours were louder than the streets",
    category: "Just wandering with my phone out",
    note: "No plan for this walk. I just followed whatever colour caught my eye.",
    behindTheShot: true,
    perspective: "This set is me walking with no destination and my phone in my hand. It's my favourite way to shoot. No brief, no challenge. I just kept walking until a colour on a wall, a market stall, or a bridge made me stop. It's the least technical set here, and the closest to how I shoot when I'm just having fun.",
    behindThumbs: ["images/streetcolors/13.jpg", "images/streetcolors/09.jpg", "images/streetcolors/12.jpg"],
    images: frames("streetcolors", 14),
  },
  {
    id: "architecture",
    genre: "facades",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/Cj5iw9hBEyD/",
    title: "Structural views",
    category: "Bara Imambara, shot with nothing extra",
    note: "No filters, no extra gear. Just symmetry and patience at one of Lucknow's oldest buildings.",
    behindTheShot: true,
    perspective: "I shot this set at Bara Imambara in Lucknow with my own #withnothing rule: no lenses, no gimbal, no filters. Just my phone and enough patience to get the symmetry right. Old buildings like this give you the composition if you stand in the right spot and wait for the frame to clear. The building did the hard work centuries ago.",
    behindThumbs: ["images/architecture/04.jpg", "images/architecture/03.jpg", "images/architecture/06.jpg"],
    images: frames("architecture", 7),
  },
  {
    id: "technique",
    genre: "technique",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DZ7x7YUAT19/",
    title: "Remaining constant",
    category: "Subject anchoring, explained",
    note: "One point stays still while everything else in the frame moves or blurs.",
    behindTheShot: true,
    perspective: "This is subject anchoring. I pick one point in the frame that stays sharp and still, and let everything around it move or blur. I use it a lot when there's motion in a shot, because it gives the eye a place to land before it explores the rest. Simple idea, but it took me a while to get the timing right.",
    behindThumbs: ["images/technique/03.jpg", "images/technique/02.jpg", "images/technique/04.jpg"],
    images: frames("technique", 7),
  },
  {
    id: "portraits",
    genre: "people",
    instagramUrl: "https://www.instagram.com/raghavapramod/p/DUI6xTbAZIs/",
    title: "Clicked, archived and highlighted",
    category: "Portraits from the gallery",
    note: "Portraits I've taken over the years, pulled from the archive into one place.",
    behindTheShot: true,
    perspective: "This is a highlight reel, not a single shoot. I went through years of portraits of friends and strangers and picked the ones that still hold up. Some are planned and lit, like the one against the orange backdrop. Others catch someone laughing or thinking, in whatever light was around. In every one, the person looks like themselves, not like they're posing.",
    behindThumbs: ["images/portraits/06.jpg"],
    images: frames("portraits", 9),
  },
];

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------

function svgIcon(name) {
  const icons = {
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    instagram: '<svg class="ig-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>',
    github: '<svg class="ig-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="3" width="14" height="14" rx="2"></rect><path d="M3 7v12a2 2 0 0 0 2 2h12"></path></svg>',
    linkedin: '<svg class="ig-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
    spotify: '<svg class="ig-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M7 9.2c3.2-1 7-.7 9.6 1"></path><path d="M7.6 12.6c2.7-.8 5.9-.5 8.1 1"></path><path d="M8.3 15.8c2.1-.6 4.5-.4 6.2.9"></path></svg>',
  };
  return icons[name] || "";
}

// ---------------------------------------------------------------
// Render: lens dial (lives on shots.html). A photo of a real lens
// sits in the middle; a rotating scale ring around it carries a
// focal length per genre. Hovering a focal length branches its
// genre callout out on a leader line; moving away retracts it back
// into the ring. Clicking a focal length dials the ring to it.
// Clicking a callout jumps to that genre's shots.
// ---------------------------------------------------------------

const SVG_NS = "http://www.w3.org/2000/svg";

function normalizeRotationDelta(current, target) {
  let delta = (target - current) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

function renderLensDial() {
  const lens = document.getElementById("lens");
  const scale = document.getElementById("lens-scale");
  const genresEl = document.getElementById("lens-genres");
  const svg = document.getElementById("lens-lines");
  if (!lens || !scale || !genresEl || !svg) return;

  const R_MARK = 30;
  const R_LINE_START = 34;
  const R_ELBOW = 41;
  const R_LABEL = 43;
  const step = 360 / GENRES.length;
  let currentRotation = 0;
  let hideTimer = null;

  const marks = [];
  const callouts = [];
  const lines = [];
  const dots = [];

  GENRES.forEach((genre, i) => {
    const deg = -90 + step * i;
    const rad = (deg * Math.PI) / 180;
    const side = i < 3 ? "right" : "left";

    // focal length mark, sits on the rotating scale ring
    const markX = 50 + R_MARK * Math.cos(rad);
    const markY = 50 + R_MARK * Math.sin(rad);
    const mark = document.createElement("button");
    mark.type = "button";
    mark.className = "lens-mark";
    mark.style.left = `${markX}%`;
    mark.style.top = `${markY}%`;
    mark.setAttribute("aria-label", `${genre.label}, ${genre.focal}mm. Hover to preview, tap to dial it in.`);
    const cs = Math.cos(rad), sn = Math.sin(rad);
    const titlePos = Math.abs(cs) < 0.2 ? (sn < 0 ? "above" : "below") : (cs > 0 ? "right" : "left");
    mark.innerHTML = `<span class="lens-mark-inner">${genre.focal}<span class="lens-mark-title lens-mark-title--${titlePos}" aria-hidden="true">${genre.label}</span></span>`;
    scale.appendChild(mark);
    marks.push(mark);

    // leader line: anchor on the ring -> elbow along the same angle -> horizontal run to the callout
    const ax = 50 + R_LINE_START * Math.cos(rad);
    const ay = 50 + R_LINE_START * Math.sin(rad);
    const ex = 50 + R_ELBOW * Math.cos(rad);
    const ey = 50 + R_ELBOW * Math.sin(rad);
    const lx = side === "right" ? 50 + R_LABEL : 50 - R_LABEL;
    const ly = ey;

    // dotted leader line: a run of dots that light up one after another
    const dotsG = document.createElementNS(SVG_NS, "g");
    dotsG.setAttribute("class", "lens-dotline");
    const pts = [[ax, ay], [ex, ey], [lx, ly]];
    const GAP = 1.1;
    let n = 0;
    for (let q = 0; q < 2; q++) {
      const [x1, y1] = pts[q], [x2, y2] = pts[q + 1];
      const segLen = Math.hypot(x2 - x1, y2 - y1);
      for (let k = q === 0 ? 1 : 0; k * GAP <= segLen; k++) {
        const t = (k * GAP) / segLen;
        const c = document.createElementNS(SVG_NS, "circle");
        c.setAttribute("cx", String(x1 + (x2 - x1) * t));
        c.setAttribute("cy", String(y1 + (y2 - y1) * t));
        c.setAttribute("r", "0.22");
        c.style.transitionDelay = `${n++ * 14}ms`;
        dotsG.appendChild(c);
      }
    }
    svg.appendChild(dotsG);
    lines.push(dotsG);

    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("cx", String(ax));
    dot.setAttribute("cy", String(ay));
    dot.setAttribute("r", "0.8");
    dot.setAttribute("class", "lens-dot");
    svg.appendChild(dot);
    dots.push(dot);

    // the callout itself — hidden until its mark (or itself) is hovered/focused
    const link = document.createElement("a");
    link.className = `lens-genre lens-genre--${side}`;
    link.href = `#genre-${genre.id}`;
    link.style.left = `${lx}%`;
    link.style.top = `${ly}%`;
    link.innerHTML = `
      <span class="lens-genre-label">${genre.label}</span>
      <span class="lens-genre-desc">${genre.desc}</span>
    `;
    genresEl.appendChild(link);
    callouts.push(link);
  });

  function branchOut(index) {
    clearTimeout(hideTimer);
    marks.forEach((m, i) => m.classList.toggle("is-hover", i === index));
    callouts.forEach((c, i) => c.classList.toggle("is-open", i === index));
    lines.forEach((g, i) => g.classList.toggle("is-open", i === index));
    marks.forEach((m, i) => m.classList.toggle("is-open", i === index));
    dots[index].classList.add("is-open");
  }

  function scheduleMinimise() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      marks.forEach((m) => m.classList.remove("is-hover"));
      callouts.forEach((c) => c.classList.remove("is-open"));
      lines.forEach((g) => g.classList.remove("is-open"));
      marks.forEach((m) => m.classList.remove("is-open"));
      dots.forEach((d) => d.classList.remove("is-open"));
    }, 160);
  }

  let lastRotated = -1;

  function setActive(index) {
    marks.forEach((m, i) => m.classList.toggle("is-active", i === index));
    callouts.forEach((c, i) => c.classList.toggle("is-active", i === index));
    lastRotated = index;
  }

  function rotateTo(index) {
    setActive(index);
    branchOut(index);
  }

  function rotateToLegacy(index) {
    const target = -step * index;
    currentRotation += normalizeRotationDelta(currentRotation % 360, target);
    scale.style.transform = `rotate(${currentRotation}deg)`;
    marks.forEach((m) => {
      const inner = m.querySelector(".lens-mark-inner");
      inner.style.transform = `rotate(${-currentRotation}deg)`;
    });
    setActive(index);
    branchOut(index);
  }

  marks.forEach((mark, i) => {
    mark.addEventListener("mouseenter", () => branchOut(i));
    mark.addEventListener("focus", () => branchOut(i));
    mark.addEventListener("mouseleave", scheduleMinimise);
    mark.addEventListener("blur", scheduleMinimise);
    mark.addEventListener("click", () => {
      rotateTo(i);
      lens.classList.add("has-pick");
      openGenreSection(GENRES[i].id);
    });
  });
  callouts.forEach((callout, i) => {
    callout.addEventListener("mouseenter", () => branchOut(i));
    callout.addEventListener("focus", () => branchOut(i));
    callout.addEventListener("mouseleave", scheduleMinimise);
    callout.addEventListener("blur", scheduleMinimise);
    callout.addEventListener("click", (e) => {
      e.preventDefault();
      rotateTo(i);
      lens.classList.add("has-pick");
      openGenreSection(GENRES[i].id);
    });
  });

  // touch screens have no hover: a tap on the lens itself reveals the focal lengths
  lens.addEventListener("click", (e) => {
    if (!e.target.closest(".lens-mark, .lens-genre")) lens.classList.add("is-open");
  });

  lens.classList.add("is-live");
}

// ---------------------------------------------------------------
// Render: "My shots" carousel cards on shots.html — filtered to a
// genre (via ?genre=<id>), or grouped by genre when none is given.
// Each card: title/info | scrollable carousel | behind-the-shot copy.
// ---------------------------------------------------------------

// Also used for AI Pill projects, which pass a few extras: `links`
// instead of instagramUrl, a muted `status` line, per-image
// `captions`, `wide` (landscape screenshots), `itemNoun` and `behindLabel`.
function buildStoryCard(story) {
  const noun = story.itemNoun || "photograph";
  const card = document.createElement("article");
  card.className = `story reveal${story.wide ? " story--wide" : ""}`;
  card.id = `story-${story.id}`;
  card.setAttribute("aria-labelledby", `story-title-${story.id}`);

  const links = story.links || (story.instagramUrl ? [{ label: "See the original post", url: story.instagramUrl, icon: "instagram" }] : []);
  const linksHtml = links.map((l) => {
    const external = /^https?:/.test(l.url);
    return `<a class="ig-link" href="${l.url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${l.label} ${svgIcon(l.icon)}</a>`;
  }).join("");

  const info = document.createElement("div");
  info.className = "story-info";
  info.innerHTML = `
    <span class="eyebrow">${story.category}</span>
    <h3 class="story-title" id="story-title-${story.id}">${story.title}</h3>
    <p class="story-note">${story.note}</p>
    ${linksHtml}
    ${story.status ? `<p class="story-status">${story.status}</p>` : ""}
  `;

  const railWrap = document.createElement("div");
  railWrap.className = "rail-wrap";

  const rail = document.createElement("div");
  rail.className = "rail";
  rail.setAttribute("role", "region");
  rail.setAttribute("aria-label", `${noun === "photograph" ? "Photographs" : "Screenshots"} from "${story.title}"`);
  rail.tabIndex = 0;

  story.images.forEach((src, i) => {
    const btn = document.createElement("button");
    btn.className = "rail-card";
    btn.type = "button";
    btn.setAttribute("aria-label", `Open ${noun} from "${story.title}" at full size`);
    const img = document.createElement("img");
    img.src = src;
    img.alt = story.captions?.[i] ? `${story.title}: ${story.captions[i]}` : `Photo ${i + 1} of ${story.images.length} from ${story.title}`;
    img.loading = i < 2 ? "eager" : "lazy";
    img.decoding = "async";
    btn.appendChild(img);
    btn.addEventListener("click", () => openLightbox(story, i));
    rail.appendChild(btn);
  });

  const controls = document.createElement("div");
  controls.className = "rail-controls";
  const prevBtn = document.createElement("button");
  prevBtn.className = "rail-btn";
  prevBtn.type = "button";
  prevBtn.setAttribute("aria-label", `Scroll "${story.title}" backward`);
  prevBtn.innerHTML = svgIcon("chevronLeft");
  const nextBtn = document.createElement("button");
  nextBtn.className = "rail-btn";
  nextBtn.type = "button";
  nextBtn.setAttribute("aria-label", `Scroll "${story.title}" forward`);
  nextBtn.innerHTML = svgIcon("chevronRight");

  function step(dir) {
    const card2 = rail.querySelector(".rail-card");
    const cardWidth = card2 ? card2.getBoundingClientRect().width : 400;
    const gap = parseFloat(getComputedStyle(rail).gap) || 0;
    rail.scrollBy({ left: dir * (cardWidth + gap), behavior: "smooth" });
  }
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  function updateControls() {
    const max = rail.scrollWidth - rail.clientWidth - 2;
    prevBtn.disabled = rail.scrollLeft <= 2;
    nextBtn.disabled = rail.scrollLeft >= max;
  }
  rail.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateControls);
  }, { passive: true });

  rail.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });

  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);

  railWrap.appendChild(rail);
  railWrap.appendChild(controls);

  const behind = document.createElement("div");
  behind.className = "story-behind";
  behind.innerHTML = `
    <span class="eyebrow">${story.behindLabel || "Behind the shot"}</span>
    <p class="shot-perspective">${story.perspective || ""}</p>
  `;

  card.appendChild(info);
  card.appendChild(railWrap);
  card.appendChild(behind);

  requestAnimationFrame(updateControls);
  initRailActiveState(rail);

  return card;
}

function renderShotsPage() {
  const list = document.getElementById("shots-list");
  if (!list) return;
  const heading = document.getElementById("shots-heading");
  const intro = document.getElementById("shots-intro");
  if (heading) heading.textContent = "My shots";
  if (intro) {
    intro.textContent = "Every photo from my Instagram posts, grouped by the kind of shot.";
  }

  GENRES.forEach((genre) => {
    const matches = STORIES.filter((s) => s.genre === genre.id);
    if (!matches.length) return;
    const section = document.createElement("section");
    section.className = "genre-section";
    section.id = `genre-${genre.id}`;
    section.hidden = true;
    section.setAttribute("aria-labelledby", `genre-heading-${genre.id}`);
    section.innerHTML = `
      <div class="genre-head">
        <h3 class="shots-group-heading" id="genre-heading-${genre.id}">${genre.label}</h3>
        <span class="genre-focal">${genre.focal}mm</span>
        <p class="genre-desc">${genre.desc}</p>
      </div>
    `;
    matches.forEach((story) => section.appendChild(buildStoryCard(story)));
    list.appendChild(section);
  });

  // a link like shots.html?genre=people (or #genre-people) opens that section straight away
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("genre") || (window.location.hash.startsWith("#genre-") ? window.location.hash.slice(7) : null);
  if (fromUrl && GENRES.some((g) => g.id === fromUrl)) openGenreSection(fromUrl, { scroll: false });
}

// Only one genre section is open at a time. Opening one hides the rest,
// drops the chosen one down into place and scrolls it into view.
function openGenreSection(genreId, { scroll = true } = {}) {
  const list = document.getElementById("shots-list");
  if (!list) return;
  const empty = document.getElementById("shots-empty");
  if (empty) empty.hidden = true;
  list.querySelectorAll(".genre-section").forEach((section) => {
    const isTarget = section.id === `genre-${genreId}`;
    if (!isTarget) {
      section.hidden = true;
      section.classList.remove("is-dropping");
      return;
    }
    section.hidden = false;
    section.classList.remove("is-dropping");
    void section.offsetWidth; // restart the drop animation
    section.classList.add("is-dropping");
    section.querySelectorAll(".rail").forEach((rail) => rail.dispatchEvent(new Event("scroll")));
    section.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    if (scroll) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => section.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
    }
  });
  if (history.replaceState) history.replaceState(null, "", `#genre-${genreId}`);
}

// ---------------------------------------------------------------
// Carousel active-card transition: the card mostly in view gets
// full focus (scale/opacity); neighbours recede.
// ---------------------------------------------------------------

function initRailActiveState(rail) {
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-active", entry.intersectionRatio > 0.6);
    });
  }, { root: rail, threshold: [0, 0.3, 0.6, 0.9, 1] });
  Array.from(rail.children).forEach((card) => io.observe(card));
}

// ---------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------

let lightboxState = { story: null, index: 0 };
let lastFocusedEl = null;

function getLightboxEls() {
  return {
    root: document.getElementById("lightbox"),
    img: document.getElementById("lightbox-img"),
    caption: document.getElementById("lightbox-caption"),
    closeBtn: document.getElementById("lightbox-close"),
    prevBtn: document.getElementById("lightbox-prev"),
    nextBtn: document.getElementById("lightbox-next"),
  };
}

function openLightbox(story, index) {
  lastFocusedEl = document.activeElement;
  lightboxState = { story, index };
  renderLightboxFrame();
  const { root, closeBtn } = getLightboxEls();
  root.classList.add("is-open");
  root.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
  document.addEventListener("keydown", onLightboxKeydown);
}

function closeLightbox() {
  const { root } = getLightboxEls();
  root.classList.remove("is-open");
  root.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onLightboxKeydown);
  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

function renderLightboxFrame() {
  const { img, caption } = getLightboxEls();
  const { story, index } = lightboxState;
  if (!story) return;
  img.src = story.images[index];
  img.alt = `${story.title}, full size`;
  caption.textContent = `${story.title} · ${story.captions?.[index] || story.category}`;
}

function stepLightbox(dir) {
  const { story, index } = lightboxState;
  if (!story) return;
  const len = story.images.length;
  lightboxState.index = (index + dir + len) % len;
  renderLightboxFrame();
}

function onLightboxKeydown(e) {
  if (e.key === "Escape") { closeLightbox(); }
  if (e.key === "ArrowRight") { stepLightbox(1); }
  if (e.key === "ArrowLeft") { stepLightbox(-1); }
  if (e.key === "Tab") {
    // simple focus trap among lightbox controls
    const { closeBtn, prevBtn, nextBtn } = getLightboxEls();
    const focusables = [prevBtn, nextBtn, closeBtn].filter(Boolean);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
}

function initLightbox() {
  const { root, closeBtn, prevBtn, nextBtn } = getLightboxEls();
  if (!root || !closeBtn || !prevBtn || !nextBtn) return;
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => stepLightbox(-1));
  nextBtn.addEventListener("click", () => stepLightbox(1));
  root.addEventListener("click", (e) => {
    if (e.target === root) closeLightbox();
  });
}

// ---------------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------------

function initReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  items.forEach((el) => io.observe(el));
}

// The three-things section replays its sequential draw-in every
// time it's scrolled past, in either direction — not just once.
function initPracticeReplay() {
  const items = document.querySelectorAll(".practice");
  if (!items.length) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -60px 0px" });
  items.forEach((el) => io.observe(el));
}

// ---------------------------------------------------------------
// Articles — pieces I've written on LinkedIn, on work/HR.
// ─────────────────────────────────────────────────────────────
// HOW TO ADD ONE
// ─────────────────────────────────────────────────────────────
// Add one object to ARTICLES: { title, url, blurb, date }.
// `date` is a plain string like "Jan 2026" — shown as-is, newest first.
// ─────────────────────────────────────────────────────────────

/** @type {{title: string, url: string, blurb: string, date: string}[]} */
const ARTICLES = [
  {
    title: "The Intersection of Industrial Design and HR: Innovation Meets People Strategy",
    url: "https://www.linkedin.com/pulse/intersection-industrial-design-hr-innovation-meets-people-pramod-zr3pc/",
    blurb: "What happens when you treat HR like a design problem. I cover empathy mapping, testing policies before rollout, and what changed for companies that tried it.",
    date: "Apr 2025",
  },
  {
    title: "The Power of Organizational Culture: Good vs. Bad",
    url: "https://www.linkedin.com/posts/raghava-pramod-16317697_organizationalculture-employeeengagement-activity-7211588359993925633-s92X",
    blurb: "Good culture and bad culture, side by side, with the numbers. How much culture affects retention, revenue, and more.",
    date: "Jun 2024",
  },
  {
    title: "Foundations of Change: Why Infrastructure Is Directly Proportional to Cultural Transformation and Effectiveness",
    url: "https://www.linkedin.com/pulse/foundations-change-why-infrastructure-directly-cultural-pramod-og4bc/",
    blurb: "Culture change gets the attention, but it won't last without the right support behind it. I break down the spaces, processes, and communication that make it stick.",
    date: "Jan 2024",
  },
];

function buildArticleCard(article) {
  const card = document.createElement("a");
  card.className = "article-card";
  card.href = article.url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.innerHTML = `
    <span class="eyebrow">${article.date}</span>
    <h3 class="article-title">${article.title}</h3>
    <p class="article-blurb">${article.blurb}</p>
    <span class="ig-link article-link">Read on LinkedIn</span>
  `;
  return card;
}

function renderArticles() {
  const list = document.getElementById("articles-list");
  if (!list) return;
  if (!ARTICLES.length) {
    list.innerHTML = `<p class="empty-note">Nothing here yet. Check back soon.</p>`;
    return;
  }
  ARTICLES.forEach((article) => list.appendChild(buildArticleCard(article)));
}

// ---------------------------------------------------------------
// AI Pill — things I've built with AI, one card per GitHub project.
// Same card as My shots: info | screenshot carousel | behind the build.
// ─────────────────────────────────────────────────────────────
// HOW TO ADD A PROJECT
// ─────────────────────────────────────────────────────────────
// 1. Save screenshots as images/ai/<id>/01.jpg, 02.jpg, ...
// 2. Add one object to PROJECTS, with one caption per screenshot.
// 3. Once a repo is public, add { label: "See the code", url, icon: "github" }
//    to `links` and drop the "private for now" line from `status`.
// ─────────────────────────────────────────────────────────────

const PROJECT_DEFAULTS = { wide: true, itemNoun: "screenshot", behindLabel: "Behind the build" };

const PROJECTS = [
  {
    ...PROJECT_DEFAULTS,
    id: "shutter-quest",
    title: "Shutter Quest: Afterlight",
    category: "A game that teaches photography",
    note: "A 3D game you play in the browser. A ruined city, six dying elements, and one old camera that can bring them back with the right photo.",
    status: "The code is private on GitHub for now.",
    perspective: "It's Meridian, twelve years after the Withering. Light, water, air, green, life and the stars are all dying, and your grandmother's old camera, Iris, is the only thing that still remembers them. Each of the six districts teaches one real camera skill: composition and exposure on a railway above the ash in Ashfield, shutter speed in a flooded metro street, aperture and ISO in a night market lit by lanterns, close focus in a cracked glass dome, telephoto and stealth with the animals of the Feral Quarter, and long exposure on a blackout rooftop under the Spire. Iris walks you through each lesson, then a boss tests it. There's a field guide with steps for all 24 shots, and every knowledge card ends with a challenge to try with a real camera or phone.",
    captions: ["Title screen", "Ashfield: bring back the light", "The Sunken Line: bring back the water", "The Mask Market through the viewfinder", "The Withered Dome: bring back the green", "The Feral Quarter: bring back life", "The city of Meridian", "Three difficulty levels", "Main menu", "The field guide"],
    images: frames("ai/shutter-quest", 10),
  },
  {
    ...PROJECT_DEFAULTS,
    id: "hr-dashboard",
    title: "HR Operations Dashboard",
    category: "People operations in one view",
    note: "Load one Excel workbook and get eleven views of hiring, exits, background checks, onboarding and HR actions, plus a brief for leadership.",
    status: "Every screenshot uses made up sample data. The code is private on GitHub for now.",
    perspective: "This one is close to my day job. HR data usually lives in a pile of spreadsheets, so the dashboard reads one Excel workbook for one team or company and turns it into eleven views: headcount and attrition, exits, background checks, 30, 60 and 90 day connects, onboarding, probation, the helpdesk and weekly HR actions. The Executive tab picks out what needs fixing first, like checks past their deadline or probation decisions that are overdue. The Leadership Brief turns it all into slides you can download as PowerPoint or PDF, with no employee names in them. It runs in the browser, so an uploaded workbook stays on your computer.",
    captions: ["Executive: what needs fixing first", "Workforce: headcount and attrition", "Exits and retention", "Background checks for each employee", "Helpdesk cases and deadlines", "Weekly HR actions by stage", "Leadership Brief, ready as PowerPoint or PDF", "Source Intelligence: where every number comes from"],
    images: frames("ai/hr-dashboard", 8),
  },
  {
    ...PROJECT_DEFAULTS,
    id: "portfolio",
    title: "raghavapramod.com",
    category: "The site you're on",
    note: "My photos, articles and music in one place. Plain HTML, CSS and JavaScript, with no framework.",
    links: [{ label: "See the code", url: "https://github.com/raghavapramodr-aipilled/portfolio", icon: "github" }],
    status: "You're looking at it.",
    perspective: "It's built to put the photos first. My shots starts with a photo of a real lens, with a focal length for each kind of shot I take: 85 for people, 35 for streets, 24 for facades. Pick one and those photos drop in, each set with a note on how I shot it. Music has my Spotify playlists and a song I pick each week, and Articles collects what I've written on LinkedIn. Publishing takes one double click on my Mac. It saves the changes, backs them up to GitHub and puts the site live.",
    captions: ["Home", "My shots: pick a focal length", "A photo series with the story behind it", "The full size photo viewer", "AI Pill, this page", "Music", "Articles", "Say hi", "On a phone"],
    images: frames("ai/portfolio", 9),
  },
];

function renderProjects() {
  const list = document.getElementById("projects-list");
  if (!list) return;
  PROJECTS.forEach((project) => list.appendChild(buildStoryCard(project)));
}

// ---------------------------------------------------------------
// Music — Spotify playlists, plus a running weekly log of one song
// and why it's in rotation.
// ─────────────────────────────────────────────────────────────
// HOW TO ADD A WEEKLY PICK
// ─────────────────────────────────────────────────────────────
// Add one object to SONGS: { date, song, artist, note, url }.
// `url` should be a public Spotify or YouTube link to the track.
// Optional: `from` (film/album, shown next to the date), `art`
// (album cover URL, shown on the left), `facts` ([label, value]
// pairs shown as a small grid; add `true` as a third item to make
// a fact span two columns) and `trivia` (one "Did you know?" line).
// Newest entries first.
// ─────────────────────────────────────────────────────────────

/** @type {{name: string, url: string}[]} */
const PLAYLISTS = [
  { name: "Hills and Chills", url: "https://open.spotify.com/playlist/0L36vOrg5AyNCHgdsV0imm" },
  { name: "Vibe - South", url: "https://open.spotify.com/playlist/7llWfDzONAYnjp4BOgoO4e" },
  { name: "Vibe - North", url: "https://open.spotify.com/playlist/4xZKtnVscKzmW46VZAjXRs" },
  { name: "City of the Sun: Complete Collection", url: "https://open.spotify.com/playlist/2aotntEEmu4JaZjBxoBrHF" },
];

/** @type {{date: string, song: string, artist: string, note: string, url: string, from?: string, art?: string, facts?: Array<[string, string, boolean?]>, trivia?: string}[]} */
const SONGS = [
  {
    date: "Week of Sep 21, 2026",
    from: "From the film DC",
    song: "Namaste",
    artist: "Anirudh Ravichander",
    url: "https://open.spotify.com/track/5WY5v1piCQgZmOFIDjVvL5",
    art: "https://i.scdn.co/image/ab67616d0000b273b90520d9172e8beeaeb6449b",
    note: "Namaste puts a Sanskrit chant to Shiva right next to heavy percussion and lines that belong in an action film, and it works far better than it should. Anirudh keeps it at 89 BPM, so nothing feels rushed and every drum hit has room to land. As someone who plays the tabla, I love how much of this song is carried by rhythm alone. It's only two and a half minutes long, which is exactly why it's been on repeat all week.",
    facts: [
      ["Tempo", "89 BPM"],
      ["Length", "2:30"],
      ["Released", "Jul 24, 2026"],
      ["Music & vocals", "Anirudh Ravichander"],
      ["Lyrics", "Anirudh, Heisenberg, Vedan, Ashwin Krishna", true],
    ],
    trivia: "DC is Lokesh Kanagaraj's first film as the lead actor. Anirudh also scored Vikram and Leo, the films Lokesh directed.",
  },
  {
    date: "Week of Sep 14, 2026",
    from: "From A Rush of Blood to the Head",
    song: "Clocks",
    artist: "Coldplay",
    url: "https://open.spotify.com/track/0BCPKOYdS2jbQ8iyB56Zns",
    art: "https://i.scdn.co/image/ab67616d0000b273de09e02aa7febf30b7c02d82",
    note: "That piano riff is one of the most recognisable openings of the 2000s, and it still hasn't worn out for me. It cycles through the same three chords while the drums push underneath at 131 BPM, so the song always feels like it's running somewhere. Chris Martin stays calm on top of all that motion, which is exactly the contrast the song is about. More than twenty years on, it still sounds like the start of something.",
    facts: [
      ["Tempo", "131 BPM"],
      ["Key", "E flat Mixolydian"],
      ["Length", "5:07"],
      ["Released", "Aug 2002"],
      ["Written by", "Berryman, Buckland, Champion, Martin", true],
    ],
    trivia: "Chris Martin came up with the riff late one night in Liverpool, and the band nearly saved it for their next album. It won the Grammy for Record of the Year in 2004.",
  },
  {
    date: "Week of Sep 7, 2026",
    from: "From Brightest Lights",
    song: "Sunday Song",
    artist: "Lane 8",
    url: "https://open.spotify.com/track/7iKmj1a0DMZExoafuQ1Lmc",
    art: "https://i.scdn.co/image/ab67616d0000b2738e62ab7239cd10dfc2404d2f",
    note: "This is the song I put on when the week is finally done. It takes its time, building slowly out of warm synths and spliced vocals into something wide open. At 124 BPM it's technically dance music, but it feels more like a long exhale. Nothing in it is in a hurry, and that's the whole point.",
    facts: [
      ["Tempo", "124 BPM"],
      ["Key", "C minor"],
      ["Length", "4:29"],
      ["Released", "Oct 2019"],
      ["Label", "This Never Happened", true],
    ],
    trivia: "Lane 8 is Daniel Goldstein. He's said this track got a poor reaction the first time he played it out, but he kept it exactly the way he heard it.",
  },
];

function playlistEmbedUrl(url) {
  const id = url.split("/playlist/")[1]?.split("?")[0];
  return `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`;
}

function buildPlaylistCard(playlist) {
  const card = document.createElement("div");
  card.className = "playlist-card";
  card.innerHTML = `
    <h3 class="playlist-title">${playlist.name}</h3>
    <iframe
      title="${playlist.name} on Spotify"
      src="${playlistEmbedUrl(playlist.url)}"
      width="100%" height="352" frameborder="0" loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  `;
  return card;
}

function renderPlaylists() {
  const list = document.getElementById("playlists-list");
  if (!list) return;
  PLAYLISTS.forEach((playlist) => list.appendChild(buildPlaylistCard(playlist)));
}

// Album art on the left; the text column stretches to the same height.
// On narrower screens the art shrinks to sit beside the heading only.
function buildSongEntry(entry) {
  const row = document.createElement("article");
  row.className = `song-entry reveal${entry.art ? " has-art" : ""}`;
  const facts = (entry.facts || [])
    .map(([label, value, wide]) => `<div${wide ? ' class="is-wide"' : ""}><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");
  const onSpotify = entry.url.includes("spotify.com");
  row.innerHTML = `
    ${entry.art ? `
    <a class="song-art" href="${entry.url}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
      <img src="${entry.art}" alt="" width="640" height="640" loading="lazy">
    </a>` : ""}
    <div class="song-head">
      <span class="eyebrow">${entry.date}${entry.from ? ` · ${entry.from}` : ""}</span>
      <h3 class="song-title">${entry.song} <span class="song-artist">by ${entry.artist}</span></h3>
    </div>
    <div class="song-body">
      <p class="song-note">${entry.note}</p>
      ${facts ? `<dl class="song-facts">${facts}</dl>` : ""}
      ${entry.trivia ? `<p class="song-trivia"><strong>Did you know?</strong> ${entry.trivia}</p>` : ""}
      <a class="ig-link song-link" href="${entry.url}" target="_blank" rel="noopener noreferrer">
        ${onSpotify ? `Listen on Spotify ${svgIcon("spotify")}` : "Listen"}
      </a>
    </div>
  `;
  return row;
}

function renderSongLog() {
  const list = document.getElementById("song-log-list");
  if (!list) return;
  if (!SONGS.length) {
    list.innerHTML = `<p class="empty-note">No picks yet. The first one is coming soon.</p>`;
    return;
  }
  SONGS.forEach((entry) => list.appendChild(buildSongEntry(entry)));
}

// ---------------------------------------------------------------
// Loader — typewriter phrase, then reveal
// ---------------------------------------------------------------

// Each page sets its own phrase via data-phrase on the loader element.
const LOADER_PHRASE_FALLBACK = "Getting the light right.";

function initLoader() {
  const loader = document.getElementById("loader");
  const typeEl = document.getElementById("loader-type");
  if (!loader || !typeEl) return;

  const LOADER_PHRASE = loader.dataset.phrase || LOADER_PHRASE_FALLBACK;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finish() {
    loader.classList.add("is-done");
    document.body.classList.remove("loading-lock");
    setTimeout(() => loader.remove(), prefersReduced ? 0 : 700);
  }

  if (prefersReduced) {
    typeEl.textContent = LOADER_PHRASE;
    finish();
    return;
  }

  const charDelay = 42;
  const holdAfterType = 400;
  let i = 0;

  function typeNext() {
    if (i <= LOADER_PHRASE.length) {
      typeEl.textContent = LOADER_PHRASE.slice(0, i);
      i++;
      setTimeout(typeNext, charDelay);
      return;
    }
    if (document.readyState === "complete") {
      setTimeout(finish, holdAfterType);
    } else {
      window.addEventListener("load", () => setTimeout(finish, holdAfterType), { once: true });
      setTimeout(finish, 4000); // safety net: never block the site for long
    }
  }

  typeNext();
}

// ---------------------------------------------------------------
// Boot
// ---------------------------------------------------------------

initLoader();

document.addEventListener("DOMContentLoaded", () => {
  renderLensDial();
  renderShotsPage();
  renderArticles();
  renderProjects();
  renderPlaylists();
  renderSongLog();
  initLightbox();
  initReveal();
  initPracticeReplay();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * SSLG Treasurer — Financial Transparency Portal
 * script.js  |  All interactivity, data, animations, and dynamic rendering
 */

/* ══════════════════════════════════════════════════════════════════
   1. SAMPLE DATA  (swap with fetch() calls when backend is ready)
   ══════════════════════════════════════════════════════════════════ */

const DATA = {

  activities: [
    { icon: "flag",       title: "Brigada Eskwela 2025",      desc: "School beautification and cleaning drive funded by SSLG",          date: "May 5, 2025",  status: "completed" },
    { icon: "music",      title: "Cultural Night Celebration", desc: "Annual cultural showcase; ticket sales exceeded target",           date: "Apr 28, 2025", status: "completed" },
    { icon: "book-open",  title: "Book Drive & Library Upgrade", desc: "Donation + budget allocation for new reading materials",         date: "Jun 1, 2025",  status: "ongoing"   },
    { icon: "trophy",     title: "Inter-School Sports Meet",   desc: "Varsity team support and tournament registration fees",            date: "Jun 15, 2025", status: "upcoming"  },
    { icon: "heart",      title: "Outreach & Community Service", desc: "Feeding program and school supply donations to partner barangay", date: "Jun 20, 2025", status: "upcoming"  }
  ],

  calendarEvents: [
    { day: 5,  month: "MAY", type: "school",   title: "Brigada Eskwela",   desc: "School-wide cleaning and beautification." },
    { day: 12, month: "MAY", type: "report",   title: "Q2 Report Due",     desc: "Treasurer submits second-quarter financial report." },
    { day: 18, month: "MAY", type: "sslg",     title: "SSLG Assembly",     desc: "Officers meet to discuss budget realignment." },
    { day: 28, month: "MAY", type: "school",   title: "Cultural Night",    desc: "Annual school cultural showcase." },
    { day: 3,  month: "JUN", type: "deadline", title: "Liquidation Due",   desc: "Deadline for project liquidation reports." },
    { day: 15, month: "JUN", type: "sslg",     title: "Sports Meet",       desc: "Inter-school sports tournament begins." },
    { day: 20, month: "JUN", type: "school",   title: "Community Service", desc: "Outreach program at partner barangay." },
    { day: 30, month: "JUN", type: "report",   title: "Mid-Year Report",   desc: "Mid-year consolidated financial report submission." }
  ],

  /* Event dots for the current calendar month (May 2025) */
  eventDots: {
    5:  ["has-event"],
    12: ["has-event", "event-report"],
    18: ["has-event", "event-sslg"],
    28: ["has-event"],
  },

  projects: [
    {
      title: "Brigada Eskwela 2025",
      category: "School Maintenance",
      icon: "paintbrush",
      desc: "Annual school cleanup, repainting of hallways, and repair of classroom furniture to improve the learning environment.",
      allocated: 45000,
      spent: 41200,
      status: "completed"
    },
    {
      title: "Cultural Night Celebration",
      category: "Events",
      icon: "music",
      desc: "Grand cultural showcase featuring student performances, art exhibits, and cultural heritage displays. Fully self-funded through ticket sales.",
      allocated: 80000,
      spent: 76500,
      status: "completed"
    },
    {
      title: "Book Drive & Library Upgrade",
      category: "Academic",
      icon: "book-open",
      desc: "Purchasing new reference books, fiction titles, and upgrading digital learning resources for the school library.",
      allocated: 55000,
      spent: 28000,
      status: "ongoing"
    },
    {
      title: "Inter-School Sports Meet",
      category: "Sports",
      icon: "trophy",
      desc: "Funding varsity uniforms, equipment, registration fees, and logistics for the annual inter-school athletics competition.",
      allocated: 70000,
      spent: 12000,
      status: "upcoming"
    },
    {
      title: "Community Outreach Program",
      category: "Service",
      icon: "heart",
      desc: "Feeding program, school supply donations, and medical missions conducted at a partner barangay in collaboration with student organizations.",
      allocated: 40000,
      spent: 0,
      status: "upcoming"
    },
    {
      title: "Science & Technology Fair",
      category: "Academic",
      icon: "flask-conical",
      desc: "Organization of the annual science fair with prizes, equipment rental, and venue setup for student innovation projects.",
      allocated: 30000,
      spent: 30000,
      status: "completed"
    }
  ],

  receipts: [
    { title: "Paintbrush & Supplies",       date: "May 3, 2025",  amount: 8500,  category: "supplies",  id: "OR-2025-001" },
    { title: "Venue Rental — Cultural Hall", date: "Apr 25, 2025", amount: 22000, category: "venue",     id: "OR-2025-002" },
    { title: "Catering — Cultural Night",   date: "Apr 26, 2025", amount: 18500, category: "food",      id: "OR-2025-003" },
    { title: "Library Books — Batch 1",     date: "May 10, 2025", amount: 15000, category: "supplies",  id: "OR-2025-004" },
    { title: "Sound System Rental",         date: "Apr 27, 2025", amount: 9500,  category: "services",  id: "OR-2025-005" },
    { title: "Sports Uniforms (Varsity)",   date: "May 8, 2025",  amount: 12000, category: "supplies",  id: "OR-2025-006" },
    { title: "Printing — Banners & Tarpaulin", date: "May 4, 2025", amount: 4200, category: "services", id: "OR-2025-007" },
    { title: "Snacks — Assembly Meeting",   date: "Apr 15, 2025", amount: 2800,  category: "food",      id: "OR-2025-008" }
  ]
};

/* ══════════════════════════════════════════════════════════════════
   2. INIT — run everything on DOMContentLoaded
   ══════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initTheme();
  initNavbar();
  initScrollAnimations();
  renderActivities();
  initCalendar();
  renderProjects("all");
  renderReceipts("all", "");
  initModal();
  initBackToTop();
  initFilterTabs();
  initReceiptControls();
  initHeroStats();
  lucide.createIcons(); // render all lucide icons
});

/* ══════════════════════════════════════════════════════════════════
   3. LOADER
   ══════════════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById("loader");
  // Simulate a brief loading period then hide
  setTimeout(() => {
    loader.classList.add("hidden");
    // After hide, trigger hero animations
    document.querySelectorAll(".hero .fade-up").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 150);
    });
    // Animate hero bar fill
    const barFill = document.querySelector(".hcard-bar-fill");
    if (barFill) barFill.style.width = "36%";
  }, 1100);
}

/* ══════════════════════════════════════════════════════════════════
   4. NAVBAR — scroll shadow, hamburger, smooth scroll, active links
   ══════════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  /* Scroll shadow */
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  /* Hamburger toggle */
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  /* Smooth scroll for all nav links (desktop + mobile) */
  document.querySelectorAll(".nav-link, .mob-link").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 70; // navbar height
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
        // Close mobile menu
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });
  });

  /* Active link highlighting on scroll */
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-60px 0px -50% 0px" });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════════════════════════════
   5. DARK MODE TOGGLE
   ══════════════════════════════════════════════════════════════════ */
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  // Restore saved preference
  const saved = localStorage.getItem("sslg-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sslg-theme", next);
  });
}

/* ══════════════════════════════════════════════════════════════════
   6. SCROLL ANIMATIONS (IntersectionObserver)
   ══════════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Trigger animated counters when their section comes into view
        triggerCountersIn(entry.target);
        // Trigger progress bars
        triggerProgressBarsIn(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════════
   7. ANIMATED COUNTERS
   ══════════════════════════════════════════════════════════════════ */
function animateCounter(el, target, prefix = "", suffix = "", duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

function triggerCountersIn(container) {
  // Peso counters (finance table)
  container.querySelectorAll("[data-count-peso]").forEach(el => {
    if (!el.dataset.counted) {
      el.dataset.counted = "1";
      const val = parseInt(el.dataset.countPeso);
      animateCounter(el, val, "₱", "");
    }
  });
  // Plain number counters (hero stats)
  container.querySelectorAll("[data-count]").forEach(el => {
    if (!el.dataset.counted) {
      el.dataset.counted = "1";
      const val = parseInt(el.dataset.count);
      animateCounter(el, val, "", val === 100 ? "%" : "+");
    }
  });
}

/* ══════════════════════════════════════════════════════════════════
   8. PROGRESS BARS
   ══════════════════════════════════════════════════════════════════ */
function triggerProgressBarsIn(container) {
  container.querySelectorAll("[data-width]").forEach(el => {
    if (!el.dataset.animated) {
      el.dataset.animated = "1";
      setTimeout(() => { el.style.width = el.dataset.width + "%"; }, 200);
    }
  });
  // Also the spend progress bar
  container.querySelectorAll(".sp-fill").forEach(el => {
    if (!el.dataset.animated) {
      el.dataset.animated = "1";
      setTimeout(() => { el.style.width = "64%"; }, 300);
    }
  });
}

/* ══════════════════════════════════════════════════════════════════
   9. HERO STATS — trigger counters once loader disappears
   ══════════════════════════════════════════════════════════════════ */
function initHeroStats() {
  setTimeout(() => {
    document.querySelectorAll(".hstat-val[data-count]").forEach(el => {
      const val = parseInt(el.dataset.count);
      animateCounter(el, val, "", val === 100 ? "%" : "+");
    });
  }, 1400);
}

/* ══════════════════════════════════════════════════════════════════
   9. RENDER ACTIVITIES
   ══════════════════════════════════════════════════════════════════ */
function renderActivities() {
  const list = document.getElementById("activityList");
  if (!list) return;

  list.innerHTML = DATA.activities.map(act => `
    <div class="activity-item">
      <div class="act-icon"><i data-lucide="${act.icon}"></i></div>
      <div class="act-body">
        <div class="act-title">${act.title}</div>
        <div class="act-desc">${act.desc}</div>
        <div class="act-meta">
          <span class="act-date">${act.date}</span>
          <span class="status-badge status-${act.status}">${capitalize(act.status)}</span>
        </div>
      </div>
    </div>
  `).join("");

  lucide.createIcons();
}

/* ══════════════════════════════════════════════════════════════════
   10. CALENDAR WIDGET
   ══════════════════════════════════════════════════════════════════ */
let calState = { year: 2025, month: 4 }; // 0-indexed; 4 = May

function initCalendar() {
  renderCalendar();
  renderEventCards();

  document.getElementById("prevMonth").addEventListener("click", () => {
    calState.month--;
    if (calState.month < 0) { calState.month = 11; calState.year--; }
    renderCalendar();
  });
  document.getElementById("nextMonth").addEventListener("click", () => {
    calState.month++;
    if (calState.month > 11) { calState.month = 0; calState.year++; }
    renderCalendar();
  });
}

function renderCalendar() {
  const { year, month } = calState;
  const label = document.getElementById("calMonthLabel");
  const daysEl = document.getElementById("calDays");

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  label.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  let html = "";
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += `<div class="cal-day empty"></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && d === today.getDate();
    const dotClasses = (DATA.eventDots[d] || []).join(" ");
    const tooltip = getEventTooltip(d, month);
    html += `<div class="cal-day ${isToday ? "today" : ""} ${dotClasses}"
                  data-day="${d}" data-tooltip="${tooltip}">${d}</div>`;
  }
  daysEl.innerHTML = html;

  // Tooltip on hover
  daysEl.querySelectorAll(".cal-day[data-tooltip]").forEach(day => {
    day.addEventListener("mouseenter", showCalTooltip);
    day.addEventListener("mouseleave", hideCalTooltip);
    day.addEventListener("mousemove", moveCalTooltip);
  });
}

function getEventTooltip(day, month) {
  const monthNum = month + 1;
  const match = DATA.calendarEvents.find(e => e.day === day && getMonthNum(e.month) === monthNum);
  return match ? `${match.title}: ${match.desc}` : "";
}

function getMonthNum(abbr) {
  return { JAN:1,FEB:2,MAR:3,APR:4,MAY:5,JUN:6,JUL:7,AUG:8,SEP:9,OCT:10,NOV:11,DEC:12 }[abbr] || 0;
}

const tooltip = document.getElementById("calTooltip");

function showCalTooltip(e) {
  const text = e.currentTarget.dataset.tooltip;
  if (!text) return;
  tooltip.textContent = text;
  tooltip.classList.add("show");
}
function hideCalTooltip() { tooltip.classList.remove("show"); }
function moveCalTooltip(e) {
  tooltip.style.left = (e.clientX + 14) + "px";
  tooltip.style.top  = (e.clientY - 10) + "px";
}

function renderEventCards() {
  const container = document.getElementById("eventCards");
  if (!container) return;

  const typeMap = { school: "", sslg: "type-sslg", report: "type-report", deadline: "type-deadline" };

  // Fix 4: only show first 4 upcoming events
  const visibleEvents = DATA.calendarEvents.slice(0, 4);
  container.innerHTML = visibleEvents.map(ev => `
    <div class="event-card ${typeMap[ev.type] || ""}">
      <div class="ec-date-badge">
        <span class="ec-day">${ev.day}</span>
        <span class="ec-mon">${ev.month}</span>
      </div>
      <div class="ec-body">
        <div class="ec-title">${ev.title}</div>
        <div class="ec-desc">${ev.desc}</div>
      </div>
    </div>
  `).join("");
}

/* ══════════════════════════════════════════════════════════════════
   11. PROJECTS
   ══════════════════════════════════════════════════════════════════ */
function renderProjects(filter) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const filtered = filter === "all" ? DATA.projects : DATA.projects.filter(p => p.status === filter);

  grid.innerHTML = filtered.map(proj => {
    const pct = Math.round((proj.spent / proj.allocated) * 100);
    const isOver = pct > 100;
    return `
    <div class="project-card fade-up">
      <div class="project-img">
        <div class="project-img-overlay"></div>
        <div class="project-img-icon"><i data-lucide="${proj.icon}"></i></div>
        <div class="proj-status-badge">
          <span class="status-badge status-${proj.status}">${capitalize(proj.status)}</span>
        </div>
      </div>
      <div class="project-body">
        <div style="margin-bottom:5px">
          <span class="badge badge-blue">${proj.category}</span>
        </div>
        <h3 class="proj-title">${proj.title}</h3>
        <p class="proj-desc">${proj.desc}</p>
        <div class="proj-budget">
          <div class="pb-item">
            <div class="pb-label">Allocated</div>
            <div class="pb-val allocated">₱${proj.allocated.toLocaleString()}</div>
          </div>
          <div class="pb-item">
            <div class="pb-label">Spent</div>
            <div class="pb-val spent">₱${proj.spent.toLocaleString()}</div>
          </div>
        </div>
        <div class="proj-progress-label">
          <span>Budget Used</span>
          <span>${Math.min(pct, 100)}%</span>
        </div>
        <div class="proj-progress-bar">
          <div class="proj-progress-fill ${isOver ? "over" : ""}" data-width="${Math.min(pct, 100)}"></div>
        </div>
      </div>
    </div>
  `}).join("");

  lucide.createIcons();

  // Observe new cards for scroll animations
  document.querySelectorAll(".project-card.fade-up:not(.visible)").forEach(el => {
    fadeInImmediately(el);
  });
}

function initFilterTabs() {
  // Fix 5: buttons are now inside row-wrapper divs on mobile; selector still works fine
  document.querySelectorAll(".ftab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ftab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderProjects(tab.dataset.filter);
    });
  });
}

/* ══════════════════════════════════════════════════════════════════
   12. RECEIPTS
   ══════════════════════════════════════════════════════════════════ */
function renderReceipts(category, query) {
  const grid = document.getElementById("receiptsGrid");
  if (!grid) return;

  let filtered = DATA.receipts;
  if (category !== "all") filtered = filtered.filter(r => r.category === category);
  if (query) filtered = filtered.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="color:rgba(255,255,255,0.4); text-align:center; padding:48px; font-size:0.9rem; grid-column:1/-1;">
      No receipts found. Try a different search or filter.
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map((r, i) => `
    <div class="receipt-card fade-up" data-receipt-id="${i}" style="transition-delay:${i * 0.06}s">
      <div class="receipt-preview">
        <div class="receipt-preview-icon"><i data-lucide="receipt"></i></div>
        <span class="receipt-cat-badge">${r.category}</span>
      </div>
      <div class="receipt-info">
        <div class="receipt-title">${r.title}</div>
        <div class="receipt-date">${r.date} · ${r.id}</div>
        <div class="receipt-footer">
          <span class="receipt-amount">₱${r.amount.toLocaleString()}</span>
          <button class="receipt-view-btn" onclick="openModal(${i})">
            <i data-lucide="eye"></i> View
          </button>
        </div>
      </div>
    </div>
  `).join("");

  lucide.createIcons();
  document.querySelectorAll(".receipt-card.fade-up").forEach(el => fadeInImmediately(el));
}

function initReceiptControls() {
  const searchInput  = document.getElementById("receiptSearch");
  const filterSelect = document.getElementById("receiptFilter");

  function update() {
    renderReceipts(filterSelect.value, searchInput.value.trim());
  }

  searchInput.addEventListener("input", debounce(update, 300));
  filterSelect.addEventListener("change", update);
}

/* ══════════════════════════════════════════════════════════════════
   13. RECEIPT MODAL
   ══════════════════════════════════════════════════════════════════ */
function initModal() {
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeModal();
  });
  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

window.openModal = function(index) {
  const r = DATA.receipts[index];
  if (!r) return;

  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");

  content.innerHTML = `
    <div class="modal-receipt-preview">
      <i data-lucide="file-text"></i>
    </div>
    <h2 class="modal-receipt-title">${r.title}</h2>
    <div class="modal-receipt-meta">
      <span class="modal-meta-item"><i data-lucide="hash"></i>${r.id}</span>
      <span class="modal-meta-item"><i data-lucide="calendar"></i>${r.date}</span>
      <span class="modal-meta-item"><i data-lucide="tag"></i>${capitalize(r.category)}</span>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:20px;">
      <span style="font-size:0.85rem;color:var(--text-muted)">Amount</span>
      <span style="font-family:var(--font-mono);font-size:1.4rem;font-weight:700;color:var(--gold)">₱${r.amount.toLocaleString()}</span>
    </div>
    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px;line-height:1.7;">
      This is an official receipt filed by the SSLG Treasurer's Office. The document has been reviewed and validated by the SSG Adviser. Physical copies are available at the Student Council Office.
    </p>
    <button class="modal-download-btn">
      <i data-lucide="download"></i>
      Download Receipt
    </button>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
};

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ══════════════════════════════════════════════════════════════════
   14. BACK TO TOP
   ══════════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ══════════════════════════════════════════════════════════════════
   UTILITIES
   ══════════════════════════════════════════════════════════════════ */

/** Capitalize first letter */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Debounce helper */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Immediately make a fade-up element visible.
 * Used for dynamically-rendered items that are already in view.
 */
function fadeInImmediately(el) {
  requestAnimationFrame(() => {
    el.classList.add("visible");
    triggerProgressBarsIn(el);
  });
}

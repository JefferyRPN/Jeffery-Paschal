/**
 * app.js — reads PORTFOLIO_DATA (data.js) and renders the page.
 * No content lives here. To change what's on the site, edit data.js.
 */
(function () {
  "use strict";

  const ROLE_ORDER = ["frontend", "social", "qa"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const root = document.documentElement;
  const el = (tag, opts = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(opts).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("aria-") || k.startsWith("data-") || k === "role" || k === "tabindex") {
        node.setAttribute(k, v);
      } else node[k] = v;
    });
    children.filter(Boolean).forEach((c) => node.appendChild(c));
    return node;
  };
  const text = (tag, className, str) => el(tag, { class: className, textContent: str });

  /* ------------------------------------------------------------------ *
   * Video URL helpers
   * ------------------------------------------------------------------ */
  function parseYouTubeId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.hostname.includes("youtube.com")) {
        if (u.pathname.startsWith("/embed/")) return u.pathname.split("/embed/")[1];
        if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1];
        return u.searchParams.get("v");
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function classifyVideo(url) {
    if (!url) return { type: "empty" };
    const ytId = parseYouTubeId(url);
    if (ytId) return { type: "youtube", id: ytId };
    return { type: "external", url };
  }

  /* ------------------------------------------------------------------ *
   * Small building blocks
   * ------------------------------------------------------------------ */
  function socialIcon(platform) {
    const icons = { facebook: "f", instagram: "IG", tiktok: "TT" };
    return icons[platform] || "🔗";
  }

  const FOOTER_SOCIAL_ICONS = {
    facebook:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34v7.03C18.34 21.24 22 17.08 22 12.06Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
  };

  function footerSocialIcon(platform) {
    return FOOTER_SOCIAL_ICONS[(platform || "").toLowerCase()] || null;
  }

  function brandSocialLink(platform, url) {
    const disabled = !url;
    const a = el("a", {
      class: "brand-social-link" + (disabled ? " is-disabled" : ""),
      href: disabled ? "#" : url,
      target: disabled ? null : "_blank",
      rel: disabled ? null : "noopener noreferrer",
      "aria-label": platform + (disabled ? " (not linked yet)" : ""),
      "aria-disabled": disabled ? "true" : "false",
      textContent: socialIcon(platform)
    });
    if (disabled) a.addEventListener("click", (e) => e.preventDefault());
    return a;
  }

  /* ------------------------------------------------------------------ *
   * Block renderers
   * ------------------------------------------------------------------ */
  function renderOverviewBlock(role) {
    const block = el("section", { class: "block" }, [
      text("h2", "block-title", "Overview"),
      text("p", "overview-text", role.overview)
    ]);
    if (role.technicalContext) {
      block.appendChild(text("p", "technical-context", role.technicalContext));
    }
    if (role.skills && role.skills.length) {
      const list = el("ul", { class: "skill-tags" },
        role.skills.map((s) => el("li", { class: "skill-tag", textContent: s }))
      );
      block.appendChild(list);
    }
    return block;
  }

  function renderExperienceBlock(role) {
    const items = role.experience.map((job) => {
      const card = el("div", {
        class: "experience-card" + (job.placeholder ? " is-placeholder" : "")
      }, [
        text("h3", "experience-title", job.title),
        job.org ? text("p", "experience-org", job.org) : null,
        job.dateRange ? text("p", "experience-date", job.dateRange) : null
      ]);
      if (job.bullets && job.bullets.length) {
        const bulletList = el("ul", { class: "experience-bullets" },
          job.bullets.map((b) => el("li", { textContent: b }))
        );
        card.appendChild(bulletList);
      }
      if (job.link) {
        card.appendChild(el("a", {
          class: "experience-link",
          href: job.link,
          target: "_blank",
          rel: "noopener noreferrer",
          textContent: "View →"
        }));
      }
      return el("li", { class: "experience-item" }, [card]);
    });

    return el("section", { class: "block" }, [
      text("h2", "block-title", "Experience"),
      el("ul", { class: "experience-list" }, items)
    ]);
  }

  function renderAchievementsBlock(role) {
    const cards = role.achievements.map((a) =>
      el("div", { class: "stat-card" + (a.placeholder ? " is-placeholder" : "") }, [
        text("p", "stat-value", a.stat),
        text("p", "stat-label", a.label)
      ])
    );
    return el("section", { class: "block" }, [
      text("h2", "block-title", "Achievements"),
      el("div", { class: "achievements-grid" }, cards)
    ]);
  }

  function renderSamplesBlock(role) {
    const cards = role.samples.map((s) => {
      const card = el("div", { class: "sample-card" + (s.placeholder ? " is-placeholder" : "") }, [
        text("p", "sample-title", s.title)
      ]);
      if (s.link) {
        card.appendChild(el("a", {
          class: "sample-link",
          href: s.link,
          target: "_blank",
          rel: "noopener noreferrer",
          textContent: "Visit sample →"
        }));
      } else if (s.unavailable) {
        card.appendChild(text("span", "sample-link is-disabled", "Not available right now"));
      } else {
        card.appendChild(text("span", "sample-link is-disabled", "[Add public link if available]"));
      }
      return card;
    });
    return el("section", { class: "block" }, [
      text("h2", "block-title", "Samples"),
      el("div", { class: "samples-grid" }, cards)
    ]);
  }

  function renderVideoBox(video) {
    const info = classifyVideo(video.url);

    if (info.type === "empty") {
      return el("div", { class: "video-box is-empty" }, [
        text("span", "plus", "+"),
        text("span", "", "Paste a video link in data.js")
      ]);
    }

    if (info.type === "youtube") {
      const wrap = el("div", { class: "video-embed-wrap" }, [
        el("iframe", {
          src: `https://www.youtube.com/embed/${info.id}`,
          title: video.caption || "Video showcase item",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullscreen: true,
          loading: "lazy"
        })
      ]);
      const box = el("div", { class: "video-box" }, [wrap]);
      if (video.caption) box.appendChild(text("p", "video-caption", video.caption));
      return box;
    }

    // External (TikTok / Instagram / other) — clickable card, no embed SDK.
    const card = el("div", { class: "video-link-card" }, [
      text("div", "video-link-icon", "▶"),
      el("a", {
        class: "watch-btn",
        href: info.url,
        target: "_blank",
        rel: "noopener noreferrer",
        textContent: "Watch"
      })
    ]);
    const box = el("div", { class: "video-box" }, [card]);
    if (video.caption) box.appendChild(text("p", "video-caption", video.caption));
    return box;
  }

  function renderVideoShowcaseBlock(role) {
    const boxes = role.videos.map(renderVideoBox);
    return el("section", { class: "block" }, [
      text("h2", "block-title", "Video Showcase"),
      el("div", { class: "video-grid" }, boxes)
    ]);
  }

  function renderBrandCard(brand) {
    if (brand.placeholder) {
      return el("div", { class: "brand-card is-placeholder" }, [
        text("div", "brand-logo", brand.initials || "+"),
        text("p", "brand-name", brand.name)
      ]);
    }
    const header = el("div", { class: "brand-header" }, [
      text("div", "brand-logo", brand.initials || "?"),
      el("div", {}, [
        text("p", "brand-name", brand.name),
        brand.location ? text("p", "brand-location", brand.location) : null
      ])
    ]);
    const socials = el("div", { class: "brand-socials" }, [
      brandSocialLink("facebook", brand.facebook),
      brandSocialLink("instagram", brand.instagram),
      brandSocialLink("tiktok", brand.tiktok)
    ]);
    return el("div", { class: "brand-card" }, [header, socials]);
  }

  function renderBrandsBlock(role) {
    const cards = role.brands.map(renderBrandCard);
    return el("section", { class: "block" }, [
      text("h2", "block-title", "Brands I've Managed"),
      el("div", { class: "brands-grid" }, cards)
    ]);
  }

  /* ------------------------------------------------------------------ *
   * Role panel
   * ------------------------------------------------------------------ */
  function renderRolePanel(role) {
    const panel = el("div", {
      class: "role-panel",
      role: "tabpanel",
      id: `panel-${role.key}`,
      "aria-labelledby": `tab-${role.key}`,
      tabindex: "0"
    });

    panel.appendChild(renderOverviewBlock(role));
    panel.appendChild(renderExperienceBlock(role));
    panel.appendChild(renderAchievementsBlock(role));
    panel.appendChild(renderSamplesBlock(role));

    if (role.key === "social") {
      panel.appendChild(renderVideoShowcaseBlock(role));
      panel.appendChild(renderBrandsBlock(role));
    }

    return panel;
  }

  /* ------------------------------------------------------------------ *
   * Footer
   * ------------------------------------------------------------------ */
  function renderFooter(footer) {
    const wrap = el("div", { class: "footer-inner" });

    wrap.appendChild(el("div", { class: "footer-block" }, [
      text("h3", "", "Education"),
      el("ul", {}, footer.education.map((e) =>
        el("li", { textContent: `${e.school} — ${e.detail}` })
      ))
    ]));

    wrap.appendChild(el("div", { class: "footer-block" }, [
      text("h3", "", "Award"),
      el("ul", {}, [el("li", { textContent: footer.award })])
    ]));

    wrap.appendChild(el("div", { class: "footer-block" }, [
      text("h3", "", "Tools"),
      el("ul", { class: "footer-tools" }, footer.tools.map((t) =>
        el("li", { textContent: t })
      ))
    ]));

    const contactBlock = el("div", { class: "footer-block footer-contact" }, [
      text("h3", "", "Contact"),
      el("ul", {}, [
        footer.contact.phone ? el("li", { textContent: footer.contact.phone }) : null,
        el("li", {}, [el("a", { href: `mailto:${footer.contact.email}`, textContent: footer.contact.email })]),
        el("li", {}, [el("a", { href: footer.contact.linkedin, target: "_blank", rel: "noopener noreferrer", textContent: "LinkedIn" })])
      ].filter(Boolean))
    ]);
    const slots = el("div", { class: "footer-social-slots" },
      footer.contact.socialSlots.map((slot, i) => {
        const disabled = !slot.url;
        const icon = footerSocialIcon(slot.platform);
        const opts = {
          class: "footer-social-slot",
          href: disabled ? "#" : slot.url,
          target: disabled ? null : "_blank",
          rel: disabled ? null : "noopener noreferrer",
          "aria-label": slot.platform
            ? slot.platform + (disabled ? " (link coming soon)" : "")
            : `Social link ${i + 1} (not set)`
        };
        if (icon) opts.html = icon;
        else opts.textContent = disabled ? "+" : "🔗";
        const a = el("a", opts);
        if (disabled) a.addEventListener("click", (e) => e.preventDefault());
        return a;
      })
    );
    contactBlock.appendChild(slots);
    wrap.appendChild(contactBlock);

    const bottom = el("div", { class: "site-footer-bottom" }, [
      el("p", { textContent: `© ${new Date().getFullYear()} Jeffery Orgu. Built with vanilla HTML, CSS & JS.` })
    ]);

    const footerEl = document.getElementById("site-footer");
    footerEl.appendChild(wrap);
    footerEl.appendChild(bottom);
  }

  /* ------------------------------------------------------------------ *
   * Role switcher (accessible tab pattern)
   * ------------------------------------------------------------------ */
  let activeIndex = 0;
  let panels = {};

  function setAccent(accentHex) {
    root.style.setProperty("--accent", accentHex);
    const soft = hexToSoftRgba(accentHex, 0.14);
    root.style.setProperty("--accent-soft", soft);
  }

  function hexToSoftRgba(hex, alpha) {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function setChannelMonitor(role) {
    const img = document.getElementById("channel-monitor-img");
    if (!img || !role.image) return;
    img.src = role.image;
    img.alt = "";
  }

  function activateRole(key, { focusTab = false } = {}) {
    const roleKeys = ROLE_ORDER;
    roleKeys.forEach((k) => {
      const tab = document.getElementById(`tab-${k}`);
      const panel = panels[k];
      const isActive = k === key;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      panel.hidden = !isActive;
    });
    activeIndex = roleKeys.indexOf(key);
    setAccent(PORTFOLIO_DATA.roles[key].accent);
    setChannelMonitor(PORTFOLIO_DATA.roles[key]);
    if (focusTab) document.getElementById(`tab-${key}`).focus();
  }

  function buildTabs() {
    const tablist = document.getElementById("role-tablist");
    ROLE_ORDER.forEach((key, i) => {
      const role = PORTFOLIO_DATA.roles[key];
      const tab = el("button", {
        type: "button",
        class: "role-tab",
        role: "tab",
        id: `tab-${key}`,
        "aria-selected": i === 0 ? "true" : "false",
        "aria-controls": `panel-${key}`,
        tabindex: i === 0 ? "0" : "-1",
        textContent: role.shortLabel
      });
      tab.addEventListener("click", () => activateRole(key));
      tab.addEventListener("keydown", (e) => onTabKeydown(e));
      tablist.appendChild(tab);
    });
  }

  function onTabKeydown(e) {
    const len = ROLE_ORDER.length;
    let newIndex = null;
    if (e.key === "ArrowRight") newIndex = (activeIndex + 1) % len;
    else if (e.key === "ArrowLeft") newIndex = (activeIndex - 1 + len) % len;
    else if (e.key === "Home") newIndex = 0;
    else if (e.key === "End") newIndex = len - 1;
    if (newIndex !== null) {
      e.preventDefault();
      activateRole(ROLE_ORDER[newIndex], { focusTab: true });
    }
  }

  /* ------------------------------------------------------------------ *
   * "Tuning in" boot animation
   * ------------------------------------------------------------------ */
  function runTuningAnimation(done) {
    const overlay = document.getElementById("tuning-overlay");
    const label = document.getElementById("tuning-label");
    const bar = overlay.querySelector(".tuning-bar-fill");

    if (prefersReducedMotion) {
      overlay.remove();
      done();
      return;
    }

    const cycle = ROLE_ORDER.map((k) => PORTFOLIO_DATA.roles[k]);
    let step = 0;
    const totalSteps = 7;
    const stepDuration = 130;

    root.style.setProperty("--accent", cycle[0].accent);

    const interval = setInterval(() => {
      const role = cycle[step % cycle.length];
      label.textContent = role.label;
      label.style.color = role.accent;
      bar.style.background = role.accent;
      bar.style.width = `${Math.min(100, ((step + 1) / totalSteps) * 100)}%`;
      setChannelMonitor(role);
      step += 1;
      if (step >= totalSteps) {
        clearInterval(interval);
        label.textContent = PORTFOLIO_DATA.roles.frontend.label;
        label.style.color = PORTFOLIO_DATA.roles.frontend.accent;
        setChannelMonitor(PORTFOLIO_DATA.roles.frontend);
        setTimeout(() => {
          overlay.classList.add("fade-out");
          setTimeout(() => {
            overlay.remove();
            done();
          }, 300);
        }, 220);
      }
    }, stepDuration);
  }

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */
  function render() {
    document.getElementById("tagline").textContent = PORTFOLIO_DATA.tagline;

    buildTabs();

    const main = document.getElementById("main-content");
    ROLE_ORDER.forEach((key, i) => {
      const role = PORTFOLIO_DATA.roles[key];
      const panel = renderRolePanel(role);
      panel.hidden = i !== 0;
      panels[key] = panel;
      main.appendChild(panel);
    });

    renderFooter(PORTFOLIO_DATA.footer);
    setAccent(PORTFOLIO_DATA.roles.frontend.accent);
    setChannelMonitor(PORTFOLIO_DATA.roles.frontend);
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    runTuningAnimation(() => {
      document.getElementById("app").hidden = false;
    });
  });
})();

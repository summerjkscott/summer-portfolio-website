const main = document.getElementById("main");
const navEl = document.querySelector(".nav");

const HOME_BEE_LOOP_PATH =
  "M 0 78 C 110 38, 225 112, 340 70 C 460 28, 580 28, 700 72 C 820 118, 910 80, 1000 66";

function buildSidebarNav() {
  navEl.innerHTML = categories
    .map((category) => {
      const panelId = `panel-${category.slug}`;
      const sorted = getSortedProjects(category);
      const links =
        sorted.length > 0
          ? sorted
              .map(
                (p) => `
        <li>
          <a
            class="nav__link"
            href="#/${category.slug}/${p.slug}"
            data-category="${category.slug}"
            data-slug="${p.slug}"
          >${p.title}</a>
        </li>`
              )
              .join("")
          : "";

      return `
      <div class="nav__group" data-category="${category.slug}">
        <div class="nav__group-header">
          <a
            class="nav__trigger"
            href="#/${category.slug}"
            data-category-link="${category.slug}"
          >${category.label}</a>
          <button
            type="button"
            class="nav__toggle"
            aria-expanded="false"
            aria-controls="${panelId}"
            aria-label="Toggle ${category.label} projects"
          ><span class="nav__toggle-icon">+</span></button>
        </div>
        <div class="nav__panel" id="${panelId}">
          <ul class="nav__list">${links}</ul>
        </div>
      </div>`;
    })
    .join("");

  bindNavEvents();
  bindHomeLink();
}

function bindHomeLink() {
  document.querySelectorAll("[data-home-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "";
    });
  });
}

function getNavGroups() {
  return document.querySelectorAll(".nav__group");
}

function expandNavGroup(group) {
  getNavGroups().forEach((g) => {
    const open = g === group;
    const toggle = g.querySelector(".nav__toggle");
    const icon = toggle?.querySelector(".nav__toggle-icon");
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    if (icon) icon.textContent = open ? "−" : "+";
    g.querySelector(".nav__panel").classList.toggle("is-open", open);
  });
}

function toggleNavGroup(group) {
  const toggle = group.querySelector(".nav__toggle");
  const icon = toggle.querySelector(".nav__toggle-icon");
  const panel = group.querySelector(".nav__panel");
  const willOpen = toggle.getAttribute("aria-expanded") !== "true";

  if (willOpen) {
    expandNavGroup(group);
    if (icon) icon.textContent = "−";
  } else {
    toggle.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    if (icon) icon.textContent = "+";
  }
}

function setActiveNav(categorySlug, projectSlug) {
  document.querySelectorAll(".nav__link").forEach((link) => {
    const isActive =
      link.dataset.category === categorySlug && link.dataset.slug === projectSlug;
    link.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll(".nav__trigger").forEach((trigger) => {
    const slug = trigger.dataset.categoryLink;
    const isCategoryView = slug === categorySlug && !projectSlug;
    trigger.classList.toggle("is-active", isCategoryView);
  });

  if (categorySlug) {
    const group = document.querySelector(`[data-category="${categorySlug}"]`);
    if (group) expandNavGroup(group);
  }
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash.split("/").filter(Boolean);
}

function renderGalleryPhotoCard(category, item, index, options = {}) {
  const pseudoProject = {
    title: `Photograph ${index + 1}`,
    slug: `gallery-${index}`,
    media: [item],
  };
  const carousel = renderCarouselMarkup(category.slug, pseudoProject, "home", {
    gallery: true,
    galleryIndex: index,
    linkToCategory: options.linkToCategory === true,
  });

  return `<article class="home-project home-project--photo">${carousel}</article>`;
}

function renderGalleryColumns(category) {
  const items = category.gallery || [];
  const columns = [[], [], []];
  items.forEach((item, i) => {
    columns[i % 3].push({ item, index: i });
  });

  return columns
    .map(
      (col) => `
      <div class="home__column">
        <div class="home__column-projects">
          ${col.map(({ item, index }) => renderGalleryPhotoCard(category, item, index)).join("")}
        </div>
      </div>`
    )
    .join("");
}

function renderHomeProjectCard(category, project) {
  const dateHtml = project.date
    ? `<p class="home-project__date body-text">${project.date}</p>`
    : "";
  const preview = getProjectPreviewMedia(project);
  const carousel = renderCarouselMarkup(
    category.slug,
    { ...project, media: preview.media },
    "home",
    { sectionSlug: preview.sectionSlug }
  );

  return `
    <article class="home-project" id="${project.slug}">
      <h3 class="home-project__title">
        <a href="#/${category.slug}/${project.slug}">${project.title}</a>
      </h3>
      ${dateHtml}
      ${carousel}
      <div class="home-project__text body-text">${formatDescription(project.description)}</div>
      ${renderProjectDownload(category, project)}
    </article>`;
}

function renderProjectColumns(category) {
  const projects = getSortedProjects(category);
  const columns = [[], [], []];
  projects.forEach((project, i) => {
    columns[i % 3].push(project);
  });

  return columns
    .map(
      (col) => `
      <div class="home__column">
        <div class="home__column-projects">
          ${col.map((p) => renderHomeProjectCard(category, p)).join("")}
        </div>
      </div>`
    )
    .join("");
}

function renderHome() {
  const columnsHtml = categories
    .map((category) => {
      const cardsHtml = category.gallery?.length
        ? category.gallery
            .map((item, index) =>
              renderGalleryPhotoCard(category, item, index, { linkToCategory: true })
            )
            .join("")
        : getSortedProjects(category)
            .map((p) => renderHomeProjectCard(category, p))
            .join("");

      return `
      <div class="home__column">
        <div class="home__column-projects">${cardsHtml}</div>
      </div>`;
    })
    .join("");

  main.innerHTML = `
    <section class="view home" aria-label="Portfolio home">
      <header class="home__intro" aria-label="Animated bee banner">
        <svg
          class="home__bee-trail"
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <path id="home-bee-path" d="${HOME_BEE_LOOP_PATH}" />
            <mask id="home-bee-trail-mask">
              <path
                class="home__bee-trail-mask"
                pathLength="100"
                d="${HOME_BEE_LOOP_PATH}"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="4.8s"
                  begin="0.18s"
                  from="100"
                  to="0"
                  fill="freeze"
                />
              </path>
            </mask>
          </defs>
          <use
            href="#home-bee-path"
            class="home__bee-trail-dashes"
            mask="url(#home-bee-trail-mask)"
          />
          <g class="home__bee-svg">
            <image
              href="assets/home-bee.png"
              x="-40"
              y="-60"
              width="80"
              height="120"
              transform="rotate(90)"
            />
            <animateMotion
              dur="4.8s"
              begin="0s"
              repeatCount="1"
              fill="freeze"
              rotate="auto"
            >
              <mpath href="#home-bee-path" />
            </animateMotion>
          </g>
        </svg>
      </header>
      <div class="home__columns">${columnsHtml}</div>
    </section>
  `;

  initCarousels(main);
  setActiveNav(null, null);
}

function renderCategoryPage(category) {
  const columnsHtml = category.gallery?.length
    ? renderGalleryColumns(category)
    : renderProjectColumns(category);

  main.innerHTML = `
    <section class="view category-page" aria-label="${category.label}">
      <header class="page-header">
        <button type="button" class="back-btn" data-back aria-label="Back to home">←</button>
        <h1 class="page-header__title">${category.label}</h1>
      </header>
      <div class="home__columns home__columns--full">${columnsHtml}</div>
    </section>
  `;

  main.querySelector("[data-back]").addEventListener("click", () => {
    window.location.hash = "";
  });

  initCarousels(main);
  setActiveNav(category.slug, null);
}

function renderProjectSection(category, project, section) {
  const carousel = renderCarouselMarkup(category.slug, project, "detail", {
    sectionSlug: section.slug,
    media: section.media,
    carouselTitle: section.title,
  });

  const autoplayAttr = section.autoplayOnVisible ? ' data-autoplay-on-visible' : "";

  return `
    <article class="project-section" id="${section.slug}"${autoplayAttr}>
      <div class="project-section__media">${carousel}</div>
      <div class="project-section__content">
        <h2 class="project-detail__title">${section.title}</h2>
        <div class="project-section__text body-text">${formatDescription(section.description)}</div>
      </div>
    </article>`;
}

function renderProject(category, project) {
  const dateHtml = project.date
    ? `<p class="project-meta body-text">${category.label} · ${project.date}</p>`
    : `<p class="project-meta body-text">${category.label}</p>`;

  if (project.sections?.length) {
    const sectionsHtml = project.sections
      .map((section) => renderProjectSection(category, project, section))
      .join("");

    main.innerHTML = `
      <section class="view project project--sections" aria-label="${project.title}">
        <header class="page-header page-header--project">
          <button type="button" class="back-btn" data-back aria-label="Back to ${category.label}">←</button>
        </header>
        <div class="project-detail project-detail--sections">
          <div class="project-intro">
            <div class="project-intro__main">
              ${dateHtml}
              <h1 class="project-detail__title">${project.title}</h1>
              <div class="project-detail__text body-text">${formatDescription(project.description)}</div>
              ${renderProjectProcessLink(project)}
              ${renderProjectDownload(category, project)}
            </div>
          </div>
          <div class="project-sections">${sectionsHtml}</div>
        </div>
      </section>
    `;
  } else {
    const carousel = renderCarouselMarkup(category.slug, project, "detail");

    main.innerHTML = `
      <section class="view project" aria-label="${project.title}">
        <header class="page-header page-header--project">
          <button type="button" class="back-btn" data-back aria-label="Back to ${category.label}">←</button>
        </header>
        <div class="project-detail">
          <div class="project-detail__media">
            ${carousel}
          </div>
          <aside class="project-detail__info">
            ${dateHtml}
            <h1 class="project-detail__title">${project.title}</h1>
            <div class="project-detail__text body-text">${formatDescription(project.description)}</div>
            ${renderProjectDownload(category, project)}
          </aside>
        </div>
      </section>
    `;
  }

  main.querySelector("[data-back]").addEventListener("click", () => {
    window.location.hash = `/${category.slug}`;
  });

  initCarousels(main);
  initScrollAutoplay(main);
  setActiveNav(category.slug, project.slug);
}

function route() {
  const parts = parseRoute();

  if (parts.length === 0) {
    renderHome();
    return;
  }

  const [categorySlug, projectSlug] = parts;

  const category = findCategory(categorySlug);

  if (projectSlug) {
    if (category?.gallery?.length) {
      renderCategoryPage(category);
      return;
    }
    const match = findProject(categorySlug, projectSlug);
    if (match) {
      renderProject(match.category, match.project);
      return;
    }
  }

  if (category) {
    renderCategoryPage(category);
    return;
  }

  renderHome();
}

function bindNavEvents() {
  getNavGroups().forEach((group) => {
    const toggleBtn = group.querySelector(".nav__toggle");
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleNavGroup(group);
    });
  });

  document.querySelectorAll(".nav__trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      const group = trigger.closest(".nav__group");
      const toggle = group.querySelector(".nav__toggle");
      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        e.preventDefault();
        toggleNavGroup(group);
      }
    });
  });

  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = `/${link.dataset.category}/${link.dataset.slug}`;
    });
  });
}

buildSidebarNav();
window.addEventListener("hashchange", route);
route();

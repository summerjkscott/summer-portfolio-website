const main = document.getElementById("main");
const navEl = document.querySelector(".nav");

function buildSidebarNav() {
  navEl.innerHTML = categories
    .map((category) => {
      const panelId = `panel-${category.slug}`;
      const links = category.projects
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
        .join("");

      return `
      <div class="nav__group" data-category="${category.slug}">
        <button
          type="button"
          class="nav__trigger"
          aria-expanded="false"
          aria-controls="${panelId}"
        >${category.label}</button>
        <div class="nav__panel" id="${panelId}">
          <ul class="nav__list">${links}</ul>
        </div>
      </div>`;
    })
    .join("");

  bindNavEvents();
}

function getNavGroups() {
  return document.querySelectorAll(".nav__group");
}

function expandNavGroup(group) {
  getNavGroups().forEach((g) => {
    const open = g === group;
    g.querySelector(".nav__trigger").setAttribute("aria-expanded", String(open));
    g.querySelector(".nav__panel").classList.toggle("is-open", open);
  });
}

function toggleNavGroup(group) {
  const trigger = group.querySelector(".nav__trigger");
  const panel = group.querySelector(".nav__panel");
  const willOpen = trigger.getAttribute("aria-expanded") !== "true";

  if (willOpen) {
    expandNavGroup(group);
    trigger.scrollIntoView({ block: "nearest", behavior: "smooth" });
  } else {
    trigger.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
  }
}

function setActiveNav(categorySlug, projectSlug) {
  document.querySelectorAll(".nav__link").forEach((link) => {
    const isActive = link.dataset.slug === projectSlug;
    link.classList.toggle("is-active", isActive);
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

function renderHomeProjectCard(category, project) {
  const dateHtml = project.date
    ? `<p class="home-project__date">${project.date}</p>`
    : "";
  const carousel = renderCarouselMarkup(category.slug, project, "home");

  return `
    <article class="home-project" id="${project.slug}">
      <h3 class="home-project__title">
        <a href="#/${category.slug}/${project.slug}">${project.title}</a>
      </h3>
      ${dateHtml}
      ${carousel}
      <div class="home-project__text">${formatDescription(project.description)}</div>
    </article>`;
}

function renderHome() {
  const columnsHtml = categories
    .map((category) => {
      const projectsHtml = category.projects
        .map((p) => renderHomeProjectCard(category, p))
        .join("");

      return `
      <div class="home__column">
        <div class="home__column-projects">${projectsHtml}</div>
      </div>`;
    })
    .join("");

  main.innerHTML = `
    <section class="view home" aria-label="Portfolio home">
      <header class="home__intro">
        <h1 class="home__title">Welcome to my portfolio.</h1>
        <p class="home__subtitle">
          Graphic design, drawings &amp; paintings, and photography by a fourth-year
          student at OCAD University.
        </p>
      </header>
      <div class="home__columns">${columnsHtml}</div>
    </section>
  `;

  initCarousels(main);
  setActiveNav(null, null);
}


function renderDetailGallery(categorySlug, project) {
  if (!project.media?.length) {
    return `<p class="project-description">No media uploaded yet.</p>`;
  }

  return project.media
    .map((item, index) => {
      const src = getMediaSrc(categorySlug, project.slug, item.file);
      const alt = `${project.title} — ${index + 1}`;
      const mediaHtml = renderMediaElement(item, src, alt, "project-gallery", {
        controls: item.type === "video",
      });
      return `
        <figure class="project-gallery__frame project-gallery__frame--clickable" data-lightbox-detail data-lightbox-index="${index}">
          ${mediaHtml}
        </figure>`;
    })
    .join("");
}

function renderProject(category, project) {
  const dateHtml = project.date
    ? `<p class="project-meta">${category.label} · ${project.date}</p>`
    : `<p class="project-meta">${category.label}</p>`;

  main.innerHTML = `
    <section class="view project" aria-label="${project.title}">
      <header class="project-header category-header">
        <button type="button" class="back-btn" data-back aria-label="Back to home">←</button>
        <div>
          ${dateHtml}
          <h1 class="project-title">${project.title}</h1>
        </div>
      </header>
      <div class="project-gallery project-gallery--detail">
        ${renderDetailGallery(category.slug, project)}
      </div>
      <div class="project-description">${formatDescription(project.description)}</div>
    </section>
  `;

  main.querySelector("[data-back]").addEventListener("click", () => {
    window.location.hash = "";
  });

  initDetailLightbox(category.slug, project);
  setActiveNav(category.slug, project.slug);
}

function route() {
  const parts = parseRoute();

  if (parts.length === 0) {
    renderHome();
    return;
  }

  const [categorySlug, projectSlug] = parts;

  if (projectSlug) {
    const match = findProject(categorySlug, projectSlug);
    if (match) {
      renderProject(match.category, match.project);
      return;
    }
  }

  renderHome();
}

function bindNavEvents() {
  getNavGroups().forEach((group) => {
    group.querySelector(".nav__trigger").addEventListener("click", () => {
      toggleNavGroup(group);
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

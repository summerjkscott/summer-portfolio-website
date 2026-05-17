let lightboxEl = null;
let lightboxItems = [];
let lightboxIndex = 0;

function ensureLightbox() {
  if (lightboxEl) return lightboxEl;

  lightboxEl = document.createElement("div");
  lightboxEl.className = "lightbox";
  lightboxEl.setAttribute("hidden", "");
  lightboxEl.innerHTML = `
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div class="lightbox__dialog" role="dialog" aria-modal="true" aria-label="Enlarged media">
      <button type="button" class="lightbox__close" data-lightbox-close aria-label="Close">×</button>
      <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="Previous">‹</button>
      <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="Next">›</button>
      <div class="lightbox__content" data-lightbox-content></div>
      <span class="lightbox__counter" data-lightbox-counter></span>
    </div>
  `;
  document.body.appendChild(lightboxEl);

  lightboxEl.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });
  lightboxEl.querySelector("[data-lightbox-prev]").addEventListener("click", () => {
    showLightboxSlide(lightboxIndex - 1);
  });
  lightboxEl.querySelector("[data-lightbox-next]").addEventListener("click", () => {
    showLightboxSlide(lightboxIndex + 1);
  });

  document.addEventListener("keydown", onLightboxKeydown);

  return lightboxEl;
}

function onLightboxKeydown(e) {
  if (!lightboxEl || lightboxEl.hasAttribute("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showLightboxSlide(lightboxIndex + 1);
  if (e.key === "ArrowLeft") showLightboxSlide(lightboxIndex - 1);
}

function buildLightboxItems(categorySlug, project) {
  if (!project?.media?.length) return [];
  return project.media.map((item, index) => ({
    type: item.type,
    src: getMediaSrc(categorySlug, project.slug, item.file),
    alt: `${project.title} — ${index + 1}`,
  }));
}

function showLightboxSlide(nextIndex) {
  if (!lightboxItems.length) return;

  lightboxIndex = (nextIndex + lightboxItems.length) % lightboxItems.length;
  const item = lightboxItems[lightboxIndex];
  const content = lightboxEl.querySelector("[data-lightbox-content]");
  const counter = lightboxEl.querySelector("[data-lightbox-counter]");

  content.querySelectorAll("video").forEach((v) => v.pause());

  if (item.type === "video") {
    content.innerHTML = `<video class="lightbox__media" src="${item.src}" controls playsinline autoplay></video>`;
  } else if (item.type === "pdf") {
    content.innerHTML = `<iframe class="lightbox__media lightbox__pdf" src="${item.src}" title="${item.alt}"></iframe>`;
  } else {
    content.innerHTML = `<img class="lightbox__media" src="${item.src}" alt="${item.alt}" />`;
  }

  counter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
  lightboxEl.querySelector("[data-lightbox-prev]").style.visibility =
    lightboxItems.length > 1 ? "visible" : "hidden";
  lightboxEl.querySelector("[data-lightbox-next]").style.visibility =
    lightboxItems.length > 1 ? "visible" : "hidden";
}

function openLightbox(items, startIndex = 0) {
  if (!items?.length) return;
  ensureLightbox();
  lightboxItems = items;
  showLightboxSlide(startIndex);
  lightboxEl.removeAttribute("hidden");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.setAttribute("hidden", "");
  document.body.classList.remove("lightbox-open");
  lightboxEl.querySelector("[data-lightbox-content]").innerHTML = "";
  lightboxItems = [];
}

function initDetailLightbox(categorySlug, project) {
  const items = buildLightboxItems(categorySlug, project);
  if (!items.length) return;

  document.querySelectorAll("[data-lightbox-detail]").forEach((el) => {
    const index = Number(el.dataset.lightboxIndex);
    el.addEventListener("click", () => openLightbox(items, index));
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(items, index);
      }
    });
  });
}

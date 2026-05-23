function renderCarouselMarkup(categorySlug, project, variant, options = {}) {
  if (!project.media || project.media.length === 0) {
    return `<div class="carousel carousel--${variant} carousel--empty">No media uploaded yet</div>`;
  }

  const items = project.media
    .map((item, index) => {
      const src = getMediaSrc(categorySlug, project.slug, item.file);
      const alt = `${project.title} — ${index + 1}`;
      const mediaHtml = renderMediaElement(item, src, alt, "carousel", {
        eager: index === 0,
      });
      return `
        <div class="carousel__slide${index === 0 ? " is-active" : ""}" data-index="${index}">
          ${mediaHtml}
        </div>`;
    })
    .join("");

  const total = project.media.length;
  const hintText = project.carouselLoop
    ? "Auto-playing · Click to enlarge"
    : "Click to enlarge";
  const hint =
    total > 0 ? `<span class="carousel__hint">${hintText}</span>` : "";
  const controls =
    total > 1
      ? `<div class="carousel__controls">
        <button type="button" class="carousel__btn" data-carousel-prev aria-label="Previous">‹</button>
        <button type="button" class="carousel__btn" data-carousel-next aria-label="Next">›</button>
      </div>`
      : "";

  const galleryAttrs = options.gallery
    ? `data-gallery="true" data-gallery-index="${options.galleryIndex}"`
    : "";
  const loopAttr = project.carouselLoop ? `data-carousel-loop="true"` : "";
  const loopClass = project.carouselLoop ? " carousel--loop" : "";

  return `
    <div
      class="carousel carousel--${variant}${loopClass}"
      data-carousel
      data-category-slug="${categorySlug}"
      data-project-slug="${project.slug}"
      ${galleryAttrs}
      ${loopAttr}
      data-total="${total}"
      tabindex="0"
      role="region"
      aria-label="${project.title} media gallery"
    >
      <div class="carousel__viewport" data-carousel-viewport>
        <div class="carousel__track">${items}</div>
        ${controls}
        <span class="carousel__counter" data-carousel-counter>1 / ${total}</span>
        ${hint}
      </div>
    </div>`;
}

function initCarousels(root) {
  root.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".carousel__slide")];
    if (slides.length === 0) return;

    const categorySlug = carousel.dataset.categorySlug;
    const projectSlug = carousel.dataset.projectSlug;
    const isGallery = carousel.dataset.gallery === "true";
    const galleryIndex = Number(carousel.dataset.galleryIndex) || 0;
    let lightboxItems = [];

    if (isGallery) {
      const category = findCategory(categorySlug);
      lightboxItems = category ? buildGalleryLightboxItems(category) : [];
    } else {
      const match = findProject(categorySlug, projectSlug);
      lightboxItems = match ? buildLightboxItems(categorySlug, match.project) : [];
    }

    let index = slides.findIndex((s) => s.classList.contains("is-active"));
    if (index < 0) index = 0;

    const counter = carousel.querySelector("[data-carousel-counter]");
    const viewport = carousel.querySelector("[data-carousel-viewport]");
    const shouldLoop = carousel.dataset.carouselLoop === "true";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let loopTimer = null;
    const loopMs = 1500;

    function pauseVideos(exceptSlide) {
      carousel.querySelectorAll(".carousel__video").forEach((video) => {
        if (!exceptSlide || !exceptSlide.contains(video)) {
          video.pause();
        }
      });
    }

    function showSlide(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
      });
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;

      const active = slides[index];
      pauseVideos(active);
      const video = active.querySelector(".carousel__video");
      if (video) {
        video.play().catch(() => {});
      }
    }

    function goNext() {
      showSlide(index + 1);
    }

    function goPrev() {
      showSlide(index - 1);
    }

    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", (e) => {
      e.stopPropagation();
      goNext();
    });

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", (e) => {
      e.stopPropagation();
      goPrev();
    });

    carousel
      .querySelectorAll(".carousel__image, .carousel__video, .carousel__pdf")
      .forEach((media) => {
        media.addEventListener("click", (e) => {
          e.stopPropagation();
          const slide = media.closest(".carousel__slide");
          const slideIndex = isGallery
            ? galleryIndex
            : slide
              ? Number(slide.dataset.index)
              : index;
          if (shouldLoop) stopLoop();
          const loopOptions = shouldLoop
            ? {
                loop: true,
                onIndexChange: (i) => showSlide(i),
                onClose: () => {
                  if (!document.hidden) startLoop();
                },
              }
            : {};
          openLightbox(lightboxItems, slideIndex, loopOptions);
        });
      });

    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.stopPropagation();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.stopPropagation();
        goPrev();
      }
    });

    function stopLoop() {
      if (loopTimer) {
        clearInterval(loopTimer);
        loopTimer = null;
      }
    }

    function startLoop() {
      if (!shouldLoop || slides.length <= 1 || prefersReducedMotion) return;
      stopLoop();
      loopTimer = setInterval(goNext, loopMs);
    }

    if (shouldLoop) {
      carousel.addEventListener("mouseenter", stopLoop);
      carousel.addEventListener("mouseleave", startLoop);
      carousel.addEventListener("focusin", stopLoop);
      carousel.addEventListener("focusout", startLoop);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopLoop();
        else startLoop();
      });
      startLoop();
    }

    showSlide(index);
  });
}

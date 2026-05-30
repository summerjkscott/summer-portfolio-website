function renderCarouselMarkup(categorySlug, project, variant, options = {}) {
  const sectionSlug = options.sectionSlug ?? null;
  const media = options.media ?? project.media;
  const displayTitle = options.carouselTitle ?? project.title;

  if (!media || media.length === 0) {
    return `<div class="carousel carousel--${variant} carousel--empty">No media uploaded yet</div>`;
  }

  const items = media
    .map((item, index) => {
      const src = getMediaSrc(categorySlug, project.slug, item.file, sectionSlug);
      const alt = `${displayTitle} — ${index + 1}`;
      const mediaHtml = renderMediaElement(item, src, alt, "carousel", {
        eager: index === 0,
      });
      return `
        <div class="carousel__slide${index === 0 ? " is-active" : ""}" data-index="${index}">
          ${mediaHtml}
        </div>`;
    })
    .join("");

  const total = media.length;
  const hintText =
    variant === "home"
      ? options.gallery
        ? options.linkToCategory
          ? "Click to view photography"
          : "Click to enlarge"
        : "Click to view project"
      : project.carouselLoop
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
  const sectionAttr = sectionSlug ? `data-section-slug="${sectionSlug}"` : "";
  const linkToCategoryAttr = options.linkToCategory
    ? `data-link-to-category="true"`
    : "";

  return `
    <div
      class="carousel carousel--${variant}${loopClass}"
      data-carousel
      data-category-slug="${categorySlug}"
      data-project-slug="${project.slug}"
      ${sectionAttr}
      ${galleryAttrs}
      ${linkToCategoryAttr}
      ${loopAttr}
      data-total="${total}"
      tabindex="0"
      role="region"
      aria-label="${displayTitle} media gallery"
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
    const sectionSlug = carousel.dataset.sectionSlug || null;
    const isGallery = carousel.dataset.gallery === "true";
    const galleryIndex = Number(carousel.dataset.galleryIndex) || 0;
    let lightboxItems = [];

    if (isGallery) {
      const category = findCategory(categorySlug);
      lightboxItems = category ? buildGalleryLightboxItems(category) : [];
    } else {
      const match = findProject(categorySlug, projectSlug);
      if (!match) {
        lightboxItems = [];
      } else if (sectionSlug && match.project.sections) {
        const section = match.project.sections.find((s) => s.slug === sectionSlug);
        lightboxItems = section
          ? buildLightboxItems(categorySlug, match.project, section)
          : [];
      } else {
        lightboxItems = buildLightboxItems(categorySlug, match.project);
      }
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

    const isHomeCard = carousel.classList.contains("carousel--home");
    const linkToCategory = carousel.dataset.linkToCategory === "true";
    const isHomeGallery = isHomeCard && isGallery && linkToCategory;

    function goToProjectPage() {
      if (shouldLoop) stopLoop();
      window.location.hash = `/${categorySlug}/${projectSlug}`;
    }

    function goToCategoryPage() {
      if (shouldLoop) stopLoop();
      window.location.hash = `/${categorySlug}`;
    }

    if (isHomeGallery) {
      viewport?.addEventListener("click", (e) => {
        if (e.target.closest(".carousel__btn")) return;
        goToCategoryPage();
      });
      carousel
        .querySelectorAll(".carousel__image, .carousel__video, .carousel__pdf")
        .forEach((media) => {
          media.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            goToCategoryPage();
          });
        });
    } else if (isHomeCard && !isGallery) {
      viewport?.addEventListener("click", (e) => {
        if (e.target.closest(".carousel__btn")) return;
        goToProjectPage();
      });
      carousel
        .querySelectorAll(".carousel__image, .carousel__video, .carousel__pdf")
        .forEach((media) => {
          media.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            goToProjectPage();
          });
        });
    } else {
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
    }

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

function initScrollAutoplay(root) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  root.querySelectorAll("[data-autoplay-on-visible]").forEach((section) => {
    const video = section.querySelector(".carousel__video");
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
  });
}

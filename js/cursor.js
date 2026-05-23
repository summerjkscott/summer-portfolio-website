(function () {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

  const HOVER_SELECTOR =
    "a, button, [data-back], .nav__toggle, .nav__trigger, .nav__link, .carousel__btn, .carousel__viewport, .lightbox, .lightbox__close, .home-project__title a";

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.classList.add("is-visible");
    cursor.classList.toggle("is-hover", !!e.target.closest(HOVER_SELECTOR));
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible", "is-hover");
  });
})();

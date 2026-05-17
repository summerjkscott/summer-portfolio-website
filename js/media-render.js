function renderMediaElement(item, src, alt, classPrefix, options = {}) {
  const loading = options.eager ? "eager" : "lazy";

  if (item.type === "video") {
    if (options.controls) {
      return `<video class="${classPrefix}__video" src="${src}" controls playsinline preload="metadata"></video>`;
    }
    return `<video class="${classPrefix}__video" src="${src}" muted playsinline loop preload="metadata"></video>`;
  }
  if (item.type === "pdf") {
    return `<iframe class="${classPrefix}__pdf" src="${src}" title="${alt}" loading="${loading}"></iframe>`;
  }
  return `<img class="${classPrefix}__image" src="${src}" alt="${alt}" loading="${loading}" />`;
}

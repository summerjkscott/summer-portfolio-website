function mediaImages(count, ext = "jpg") {
  return Array.from({ length: count }, (_, i) => ({
    type: "image",
    file: `${String(i + 1).padStart(2, "0")}.${ext}`,
  }));
}

function getMediaBasePath(categorySlug, projectSlug) {
  return `assets/projects/${categorySlug}/${projectSlug}`;
}

function getMediaSrc(categorySlug, projectSlug, file) {
  return `${getMediaBasePath(categorySlug, projectSlug)}/${encodeURIComponent(file)}`;
}

function observationMedia() {
  return Array.from({ length: 23 }, (_, i) => ({
    type: "image",
    file: `b901ce12-${String(i + 1).padStart(2, "0")}.png`,
  }));
}

const portfolio = {
  graphicDesign: {
    label: "Graphic Design",
    slug: "graphic-design",
    projects: [
      {
        title: "Thumbnail Thesis",
        slug: "thumbnail-thesis",
        date: "2025",
        description: `Thumbnail Thesis is a research-driven graphic design project that bridges critical inquiry and visual experimentation. The project involved developing a research question supported by secondary sources, organizing findings through an annotated bibliography, and translating this research into a thumbnail concept—prioritizing rapid composition and conceptual clarity over detail.

The final outcome took the form of a printed design kit, including a tri-fold brochure and postcards, which collectively present the research question, key references, and an early visual direction for a larger design investigation.`,
        media: mediaImages(6, "png"),
      },
      {
        title: "Augmented Poster",
        slug: "augmented-poster",
        date: "2024",
        description: `This collaborative project involved designing a series of A1 posters featuring animated augmented reality (AR) elements to promote a fictional screening of audiovisual works produced in a previous project. Working as a group, we developed original visual content—drawing from and adapting our earlier assets as well as creating new imagery—to translate time-based media into a compelling print-plus-AR format. The project explored how motion, layering, and interactivity can extend static poster design into an immersive experience.

Collaborative members: Ayesha Thakur, Summer Scott, Xingyu Campbell, Tracey Chen, & Serina Chan`,
        media: [
          { type: "video", file: "FINAL AR copy 2.mp4" },
          { type: "image", file: "01.jpg" },
          { type: "image", file: "02.jpg" },
          { type: "image", file: "03.jpeg" },
        ],
      },
      {
        title: "Field Trip",
        slug: "field-trip",
        date: "2025",
        description: `This project required a two-sided poster for a graphic design-focused exhibit aimed at museum and cultural centre visitors. Before creating the final poster, I first built an organized repository of images and graphic elements along with a tracking sheet to document details about each one. I then completed a visual analysis to highlight key aspects of the visuals. The final poster was developed through this structured process of organizing, analyzing, and applying research to design.`,
        media: mediaImages(1, "png"),
      },
      {
        title: "Observation",
        slug: "observation",
        date: "2024",
        description: `This project is a process-book that acts as a living, honest record of how and why I work, not just what I've made. It is not a portfolio or a polished presentation, but an exploration of my personal design process using all the work I produced in Design Process 1 and 2 classes. The content can include anything I've generated—writing, experiments, notes, research, and collected materials. The focus is on reflecting on what matters to me in design, including my principles, tools, media, and ways of thinking. The book must include at least two languages and it should take risks in form, structure, and material while honestly examining my process.`,
        media: observationMedia(),
      },
      {
        title: "Riso Booklet",
        slug: "riso-booklet",
        date: "2025",
        description: `I created a risograph-printed booklet featuring six female pop stars. I explored bold colour layering, texture, and image treatment using the unique qualities of risograph printing, such as slight misregistration and vibrant ink. The booklet focused on celebrating influential women in pop culture while experimenting with layout, repetition, and graphic contrast. Through this process, I learned how to design with print limitations in mind and use them as part of the visual language rather than something to correct.`,
        media: mediaImages(6, "jpg"),
      },
      {
        title: "Moving Poetry",
        slug: "moving-poetry",
        date: "2024",
        description: `For this project, I collaborated with classmate Ayesha Thakur by translating her moving poetry video into a printed, transcribed booklet after conducting an interview with her about her intentions and process. Instead of simply documenting the video, I focused on interpreting its tone, pacing, and emotional qualities through typography, layout, and image choices. At the same time, she created a printed outcome based on my video. This exchange emphasized translation, interpretation, and how design can shift meaning across different formats and media.`,
        media: mediaImages(9, "png"),
      },
      {
        title: "Confounding Tools",
        slug: "confounding-tools",
        date: "2024",
        description: `I designed a large-format 24" × 36" poster without using any Adobe or traditional print design software. Instead, I experimented with alternative digital tools and worked "against the grain" of platforms not meant for print production. Over three weeks, I conceived, developed, refined, printed, and documented the final composition. This constraint pushed me to rethink my usual design process, explore unexpected workflows, and consider how different digital environments shape visual outcomes.`,
        media: mediaImages(1, "png"),
      },
      {
        title: "Field Handbook",
        slug: "field-handbook",
        date: "2025",
        description: `I created a handbook titled Life in the Unliving: Hybrid Creatures Field Handbook, which explores objects that blur the line between living and non-living. Through photography and written reflection, I examined how certain designed environments—such as a life-sized chessboard—become "alive" through human interaction. The handbook combines text and image to consider how movement, performance, and presence animate static objects. Using a minimal black-and-white layout and strong typographic structure, I focused on clarity and contrast to support the conceptual theme of hybridity between material and human life.`,
        media: mediaImages(5, "png"),
      },
      {
        title: "Complex Graphic Designer",
        slug: "complex-graphic-designer",
        date: "2024",
        description: `For this project, I created a poster based on the idea of the "complex graphic designer." Taking inspiration from printers, I intentionally made the process complex by scanning, re-scanning, and layering elements to build the final composition. Instead of designing in a clean, straightforward way, I embraced distortion, texture, and accumulation through repeated physical and digital manipulation. The final poster reflects both the concept and the process—showing how complexity can exist not just in the visuals, but in the way the work is constructed.`,
        media: mediaImages(1, "png"),
      },
    ],
  },
  drawingsPaintings: {
    label: "Drawings & Paintings",
    slug: "drawings-paintings",
    projects: [
      {
        title: "Dot Landscape",
        slug: "dot-landscape",
        date: "",
        description: "Project description coming soon.",
        media: mediaImages(1),
      },
      {
        title: "Figure Studies",
        slug: "figure-studies",
        date: "",
        description: "Project description coming soon.",
        media: mediaImages(1),
      },
      {
        title: "Colour Field",
        slug: "colour-field",
        date: "",
        description: "Project description coming soon.",
        media: mediaImages(1),
      },
    ],
  },
  photography: {
    label: "Photography",
    slug: "photography",
    projects: [
      {
        title: "Sculpture Study",
        slug: "sculpture-study",
        date: "",
        description: "Project description coming soon.",
        media: mediaImages(1),
      },
      {
        title: "Urban Light",
        slug: "urban-light",
        date: "",
        description: "Project description coming soon.",
        media: mediaImages(1),
      },
      {
        title: "Still Life",
        slug: "still-life",
        date: "",
        description: "Project description coming soon.",
        media: mediaImages(1),
      },
    ],
  },
};

const categories = [
  portfolio.graphicDesign,
  portfolio.drawingsPaintings,
  portfolio.photography,
];

function findCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

function findProject(categorySlug, projectSlug) {
  const category = findCategory(categorySlug);
  if (!category) return null;
  const project = category.projects.find((p) => p.slug === projectSlug);
  if (!project) return null;
  return { category, project };
}

function formatDescription(text) {
  return text
    .trim()
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

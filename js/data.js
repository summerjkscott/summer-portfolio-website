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
  if (projectSlug?.startsWith("gallery-")) {
    return `assets/projects/${categorySlug}/${encodeURIComponent(file)}`;
  }
  return `${getMediaBasePath(categorySlug, projectSlug)}/${encodeURIComponent(file)}`;
}

function photographyGallery() {
  return Array.from({ length: 24 }, (_, i) => ({
    type: "image",
    file: `${String(i + 1).padStart(2, "0")}.jpg`,
  }));
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
        title: "3D Type - FIFA 26",
        slug: "3d-type-fifa-26",
        date: "2026",
        description: `The goal of this project was to explore how global events can bring people together through a shared visual language, while still keeping it rooted in a specific place. Inspired by the Toronto Sign at Toronto City Hall, I wanted to take a familiar city landmark and turn it into something more universally accessible, something that highlights connection, scale, and interaction.

To do this, I recreated the feeling of large-scale public typography in a miniature form, using dimensional letterforms to echo the presence of the original sign. The turf texture references soccer as a global language, while the small human figures add a sense of community and make the scene feel more relatable. The "FIFA 26" wording places the work within a global event, connecting local identity to an international audience. By combining a recognizable setting with tactile, scaled-down elements, the piece becomes an immersive scene that invites people from different backgrounds to think about how design can bring us together through shared experiences.`,
        media: mediaImages(7, "jpg"),
      },
      {
        title: "TravelZine",
        slug: "travelzine",
        date: "2026",
        description: `This interactive 11" × 17" magazine explores the cities that shape my identity. Designed as an interactive experience, the magazine invites viewers to follow in my footsteps by adding their own photos, notes, and reflections as they engage with each place. When placed on the ground, the zine matches the size of my foot - my literal footprint - emphasizing themes of presence, movement, and personal geography.`,
        media: mediaImages(12, "png"),
        download: {
          label: "Download TravelZine (PDF)",
          file: "TravelZine.pdf",
        },
      },
      {
        title: "70 Days of Typography",
        slug: "70-days-of-typography",
        date: "2026",
        description: `For this project, I created a perfect-bound 8.5" × 8.5" book documenting 70 days of wordmark explorations centered around the generated word "Hivie." The objective was to develop the word into a unique brand identity by deciding what type of company it could represent. Since the name naturally suggested associations with hives and bees, a honey company felt like the obvious direction to take. Through typography and visual experimentation, I explored branding, identity, and consistency across the entire process.`,
        media: mediaImages(43, "png"),
        carouselLoop: true,
      },
      {
        title: "Expressive Poster (LOVE)",
        slug: "expressive-poster-love",
        date: "2026",
        description: `This project involved selecting and designing 50–150 words within a 22" × 34" poster format. I chose to explore the theme of "Love" using text by Brianna West from <a href="https://thoughtcatalog.com/brianna-wiest/2013/03/love-in-five-paragraphs/" target="_blank" rel="noopener noreferrer">Thought Catalog</a>. Throughout the process, the poster evolved through multiple iterations and critiques from both my professor and classmates. In the final design, I aimed to capture the feeling and visual atmosphere of chocolate through rich, playful colours and bold typography, creating an emotional connection between love and sweetness. The overall aesthetic also carries a nostalgic quality reminiscent of Baskin-Robbins.`,
        media: [{ type: "image", file: "01.png" }],
      },
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
        title: "Skeletal Analysis",
        slug: "skeletal-analysis",
        date: "2026",
        description: `For this anatomy assignment, I selected a complex, non-anatomical pose to draw and label the human skeleton. I chose a figure skater, Aleksandra Trusova, as my reference because I used to figure skate and wanted to connect the project to a personal interest. The final piece is a digital sketch that focuses on understanding skeletal structure through movement and dynamic positioning.`,
        media: mediaImages(5, "png"),
      },
      {
        title: "11 Tattoo Design",
        slug: "11-tattoo-design",
        date: "2025",
        description: `My dad asked me to design a tattoo representing his dual citizenship in Canada and the United States, along with his passion for hockey. His jersey number is 11, and I incorporated both flags into the two number ones to reflect his identity and connection to both countries. The actual tattoo was completed by a professional tattoo artist using my design.`,
        media: mediaImages(2, "jpg"),
      },
      {
        title: "Butterfly Tattoo Design",
        slug: "butterfly-tattoo-design",
        date: "2024",
        description: `I designed a butterfly tattoo for my aunt, created specifically for placement on her elbow. The concept allows the butterfly’s wings to open and close naturally as she bends and extends her arm, bringing the design to life through movement. The final colour was added by the tattoo artist.`,
        media: mediaImages(2, "jpg"),
      },
      {
        title: "Turtle Island",
        slug: "turtle-island",
        date: "2024",
        description: `This 9” x 11” watercolour painting depicts a view of Toronto, including the CN Tower and surrounding buildings, contrasted with a small green space in the bottom corner that represents the land’s original natural state. The work reflects my understanding of Indigenous visual culture as a way of acknowledging that the land we live, study, and build cities on - Turtle Island - was taken and transformed through settler colonialism.

Through this piece, I wanted to visually express the contrast between the present urban landscape and the land’s history before colonization. The city dominates the composition to reflect how modern development has overtaken much of the natural environment, while the remaining green space serves as a reminder of what existed before. This project helped me reflect on my position as a settler and the importance of acknowledging the history and ongoing impact of colonialism through visual storytelling.`,
        media: mediaImages(1, "jpg"),
      },
      {
        title: "Ace of Hearts",
        slug: "ace-of-hearts",
        date: "2022",
        description: `This 27.5” × 19.5” pencil sketch was created at the beginning of Art 30 in high school. The assignment challenged us to find a unique way to incorporate roses into our work. I chose to illustrate roses growing from the arteries and veins of a human heart, blending themes of anatomy, emotion, and growth.

After completing the heart drawing, I felt the background lacked visual impact and spent time considering how to strengthen the composition. Later that day, I came across a photo on Instagram featuring the Ace of Hearts playing card, and the concept immediately connected with the piece. Inspired by the symbolism and visual structure of the card, I incorporated the Ace of Hearts into the background, which brought the entire composition together. The final result remains one of my favourite early artworks.`,
        media: mediaImages(1, "jpg"),
      },
      {
        title: "The Nightmare Before Christmas",
        slug: "nightmare-before-christmas",
        date: "2022",
        description: `The iconic landscape from the Disney film The Nightmare Before Christmas inspires this 19.5” × 19.5” acrylic painting. After watching the movie for the first time, I was drawn to its dramatic scenery and distinctive atmosphere, which inspired me to recreate the landscape.

I am especially proud of the final outcome because of the paint blending throughout the piece, which helped capture the contrast between the light and dark areas of the hills and added depth to the composition.`,
        media: mediaImages(1, "jpg"),
      },
      {
        title: "Dreaming of Travel",
        slug: "dreaming-of-travel",
        date: "2022",
        description: `I created this 19.5" x 19.5" acrylic painting as an entry for a school art competition centered around the theme of dreams and aspirations. Inspired by my dream of traveling the world, I designed the artwork to reflect exploration, curiosity, and the excitement of discovering new places and cultures.

This painting was especially enjoyable to create, as it allowed me to express both my creativity and personal ambitions through art. The piece was awarded third place in the competition, making it a memorable and rewarding experience.`,
        media: mediaImages(2, "png"),
      },
      {
        title: "Cactus",
        slug: "cactus",
        date: "2022",
        description: `This 20” × 16” acrylic painting was a fun and calming piece to create. I’ve always been drawn to a minimalistic style, so when the assignment required us to include a plant, I immediately knew I wanted to take that approach.

I chose to paint a cactus, as I find them visually striking and they also remind me of the desert environment where I grew up. The simplicity of the composition allowed me to focus on clean forms and subtle details, reflecting both my personal style and connection to my surroundings.`,
        media: mediaImages(1, "jpg"),
      },
      {
        title: "Deer",
        slug: "deer",
        date: "2022",
        description: `This 27.5” × 19.5” acrylic painting was inspired by Indigenous art, specifically the use of dot techniques. In Art 30, we were asked to create a piece using this style, and after researching ideas online, I chose to do a deer standing on a mountain landscape.

The process was detailed and time-consuming, but I enjoyed the slow, meditative nature of creating each dot. I would often listen to music while working, which made the experience calming and focused. To achieve different textures and levels of detail, I used the back of a paintbrush for the background colours and the tip of a skewer to create the finer outlines of the rock and deer.

Although meticulous, this piece was a rewarding experience that allowed me to develop patience and precision while exploring a new artistic style.`,
        media: mediaImages(1, "jpg"),
      },
      {
        title: "Rapunzel's Floating Lights",
        slug: "rapunzels-floating-lights",
        date: "2022",
        description: `I recreated the “floating lights” (lanterns) from the painting shown in Rapunzel’s room in the film Tangled. This 19.5” × 19.5” acrylic painting was based on that scene’s dreamy, atmospheric use of glowing lanterns and soft lighting.`,
        media: mediaImages(1, "jpg"),
      },
      {
        title: "Feather Headdress",
        slug: "feather-headdress",
        date: "2021",
        description: `This painting was created as part of a required assignment in my Art 20 class in high school, focused on Indigenous art. I was inspired by the feather headdresses traditionally worn by First Nations peoples, and I began the piece by painting an inukshuk wearing a feather headdress.

However, I was not satisfied with the initial composition, as I felt the placement of the inukshuk and headdress was not well-balanced or centered on the canvas. I chose to paint over the original image and rework the piece into an abstract portrait of an Indigenous man wearing a feather headdress instead.

While I am happy with the outcome, the process taught me the importance of planning composition more carefully before beginning to paint.`,
        media: mediaImages(2, "jpg"),
      },
      {
        title: "Moon & Tree",
        slug: "moon-and-tree",
        date: "2021",
        description: `This 27.5” × 19.5” acrylic painting developed through an emotional and unexpected creative process. I originally began the piece as a colourful tree landscape, but while painting, I realized I had forgotten to complete the background before adding the trees. When I attempted to paint the background afterward, I was unhappy with the result. With the project due the next day, I felt overwhelmed and frustrated.

Wanting a fresh start, I painted over the entire canvas in black and completely reimagined the composition. From there, I created a large moon with a leafless tree silhouetted in front of it. The final piece became the complete opposite of the original concept - transforming from something bright and cheerful into something dark, quiet, and emotional.

This painting became a way for me to express my emotions through art, and it remains one of my favourite pieces because of both the process and the outcome. I also appreciate how viewers interpret the work differently: some see the shading on the moon itself, while others interpret it as leaves blending into the tree. The piece challenged me creatively and emotionally, but ultimately became one of the most meaningful works I have created.`,
        media: mediaImages(1, "jpg"),
      },
      {
        title: "Bob Ross Inspired",
        slug: "bob-ross-inspired",
        date: "2020",
        description: `This 20” × 16” acrylic gesso painting was inspired by the work of Bob Ross. A friend and I created the piece together while following one of his painting tutorials on YouTube. The experience was both creative and memorable, allowing us to experiment with Bob Ross’s techniques and painting style.

One of my favourite details in the piece is the soft light effect in the background, which we created using paper towel on both of our canvases. Beyond the painting itself, this artwork holds personal value for me because it reminds me of my friend, who has since moved away. Every time I look at it, I remember the time we spent creating it together, which makes the piece especially meaningful.`,
        media: mediaImages(1, "jpg"),
      },
    ],
  },
  photography: {
    label: "Photography",
    slug: "photography",
    projects: [],
    gallery: photographyGallery(),
  },
};

function sortProjectsByDate(projects) {
  return [...projects].sort((a, b) => {
    const yearA = parseInt(a.date, 10) || 0;
    const yearB = parseInt(b.date, 10) || 0;
    return yearB - yearA;
  });
}

function getSortedProjects(category) {
  return sortProjectsByDate(category.projects);
}

const categories = [
  portfolio.graphicDesign,
  portfolio.drawingsPaintings,
  portfolio.photography,
];

categories.forEach((category) => {
  category.projects = sortProjectsByDate(category.projects);
});

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

function getProjectDownloadSrc(categorySlug, projectSlug, file) {
  return `${getMediaBasePath(categorySlug, projectSlug)}/${encodeURIComponent(file)}`;
}

function renderProjectDownload(category, project) {
  if (!project.download) return "";

  const { label, file } = project.download;
  const href = getProjectDownloadSrc(category.slug, project.slug, file);

  return `<p class="project-download body-text"><a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a></p>`;
}

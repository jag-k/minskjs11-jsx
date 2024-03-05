const videObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName === "class") {
      const { target } = mutation;
      if (target.classList.contains("active")) {
        target.play();
      } else if (target.classList.contains("visited")) {
        target.pause();
        target.currentTime = 0;
      }
    }
  });
});

document.querySelectorAll("video.next").forEach(function (video) {
  // Play when added "active" class to the video.
  videObserver.observe(video, { attributes: true });
  // Set speed to 2x.
  video.playbackRate = video.getAttribute("playback-rate") || 1;
});

const fullSlideVideoObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.attributeName === "class") {
      const { target } = mutation;
      target.querySelectorAll("video").forEach(function (video) {
        if (target.classList.contains("active")) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  });
});

document
  .querySelectorAll(".slide:has(video:not(.next))")
  .forEach(function (slide) {
    fullSlideVideoObserver.observe(slide, { attributes: true });
  });

document.querySelectorAll("code.hljs").forEach(function (block) {
  hljs.highlightElement(block);
  block.innerHTML = hljs.lineNumbersValue(block.innerHTML);
  if (block.dataset.spotlightCode) {
    const startLine = Number(block.dataset.lnStartFrom) || 1;
    const rows = block.querySelector("tbody").querySelectorAll("tr");
    block.dataset.spotlightCode.split(";").forEach(function (row) {
      if (!row.includes("-"))
        return rows[Number(row) - startLine].classList.add("spotlight-code");
      const [start, end] = row.split("-");
    });
  }
});

// ===== MENU BURGER =====
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  // ===== CARROUSEL ACTUALITES (accueil) =====
  const track = document.getElementById("newsTrack");
  if (track) {
    const cards = track.children.length;
    const prevBtn = document.getElementById("newsPrev");
    const nextBtn = document.getElementById("newsNext");
    let index = 0;

    function cardWidth() {
      return track.children[0].offsetWidth + 24; // gap inclus
    }

    function getVisible() {
      return window.innerWidth < 760 ? 1 : window.innerWidth < 1080 ? 2 : 3;
    }

    function update() {
      const maxIndex = Math.max(0, cards - getVisible());
      if (index > maxIndex) index = maxIndex;
      track.style.transform = `translateX(-${index * cardWidth()}px)`;
    }

    nextBtn.addEventListener("click", function () {
      const maxIndex = Math.max(0, cards - getVisible());
      index = index >= maxIndex ? 0 : index + 1;
      update();
    });

    prevBtn.addEventListener("click", function () {
      const maxIndex = Math.max(0, cards - getVisible());
      index = index <= 0 ? maxIndex : index - 1;
      update();
    });

    window.addEventListener("resize", update);

    // défilement automatique
    setInterval(function () {
      nextBtn.click();
    }, 6000);
  }

  // ===== ONGLETS MEDIATHEQUE =====
  const tabs = document.querySelectorAll(".media-tabs button");
  const galleryItems = document.querySelectorAll(".gallery-grid [data-cat]");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const cat = tab.dataset.filter;
        galleryItems.forEach(function (item) {
          item.style.display =
            cat === "all" || item.dataset.cat === cat ? "block" : "none";
        });
      });
    });
  }
});

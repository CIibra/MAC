document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");

  if (burger && menu) {
    burger.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  } else {
    console.log("Burger ou menu introuvable");
  }
});

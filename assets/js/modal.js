const btn = document.querySelector(".js-nav_request_estimate_link");
const btnb = document.querySelector(".js-request_estimate_link");
const modal = document.querySelector(".js-popup-wrapper");
const close = document.querySelector(".js-popup_close");
const nav = document.querySelector(".js-nav");
const head = document.querySelector(".js-site-navigation");
const menu = document.querySelector(".js-nav_ico");
btn.addEventListener("click", function () {
  modal.classList.remove("g-hide", "g-hidden");
});
btnb.addEventListener("click", function () {
  modal.classList.remove("g-hide", "g-hidden");
});
close.addEventListener("click", function () {
  modal.classList.add("g-hide", "g-hidden");
});
nav.addEventListener("click", function () {
  if (nav.classList.contains("active")) {
    head.classList.remove("opened");
    menu.classList.remove("active");
    nav.classList.remove("active");
    return;
  }
  head.classList.add("opened");
  menu.classList.add("active");
  nav.classList.add("active");
});

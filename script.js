// Toggle class active

const navbarNav = document.querySelector(".navbar-nav");
// when hamburger menu is clicked

document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik di luar sidebar untuk menghilangkan nav

const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Add event listener to "Pesan Sekarang" button
document.querySelector(".cta").addEventListener("click", function () {
  // Scroll to the menu section
  document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
});

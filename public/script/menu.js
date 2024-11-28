function toggleMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".menu-mobile");

  menuToggle.classList.toggle("open");

  mobileMenu.classList.toggle("active");

  // Если меню открыто, показываем его
  if (mobileMenu.classList.contains("active")) {
    mobileMenu.style.display = "flex";
  } else {
    mobileMenu.style.display = "none";
  }
}

// Назначаем обработчик на кнопку только после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }
});

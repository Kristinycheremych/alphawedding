let slideIndex = 1;
showSlides(slideIndex);

// Функция для изменения текущего слайда
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Функция для перемещения слайда влево/вправ
function moveSlide(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let slides = document.querySelectorAll(".review-slide");
  let dots = document.querySelectorAll(".nav-dot");

  // Проверяем, если слайды и точки навигации не пусты
  if (!slides || slides.length === 0) {
    return;
  }
  if (!dots || dots.length === 0) {
    console.error("Точки навигации не найдены.");
    return;
  }

  // Проверяем, чтобы индекс был в пределах допустимых значений
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Убираем класс "active" со всех слайдов и точек
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Проверяем, что slideIndex корректен
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].classList.add("active");
  } else {
    console.error("Не удалось найти слайд с индексом " + (slideIndex - 1));
  }

  // Проверяем, что точки навигации корректны
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  } else {
    console.error(
      "Не удалось найти точку навигации с индексом " + (slideIndex - 1)
    );
  }
}

// Добавление функционала для жестов
let touchStartX = 0; // Начальная позиция касания
let touchEndX = 0;   // Конечная позиция касания

// Обработчик события начала касания
document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

// Обработчик события завершения касания
document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  
  // Определяем направление свайпа
  if (touchStartX > touchEndX + 30) {
    // Свайп влево
    moveSlide(1);
  } else if (touchStartX < touchEndX - 30) {
    // Свайп вправо
    moveSlide(-1);
  }
});

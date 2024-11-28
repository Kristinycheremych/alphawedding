function toggleLanguage() {
  var button = document.getElementById("language-button");

  // Проверяем текущий текст на кнопке
  if (button.innerText === "EN") {
    button.innerText = "RU";
    // Переключаем на английскую версию сайта
    setTimeout(function () {
      window.location.href = "index-en.html";
    }, 100);
  } else {
    button.innerText = "EN";
    // Переключаем на русскую версию сайта
    setTimeout(function () {
      window.location.href = "index.html";
    }, 100);
  }
}

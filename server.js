import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve(); // Получаем корневую папку

// Middleware
app.use(
  cors({ origin: ["https://www.alphawedding.org", "http://127.0.0.1:8080"] })
); // Указываем домен
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Указываем статическую папку

const port = process.env.PORT;
const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

// API для отправки сообщений в Telegram
app.post("/sendMessage", async (req, res) => {
  const { name, phone, countryCode } = req.body;

  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString();
  const timeFormatted = currentDate.toLocaleTimeString();

  const message = `
    <b>Заявка (Свадьбы)</b>\n
    <i>Дата:</i> ${dateFormatted}\n
    <i>Время:</i> ${timeFormatted}\n
    <b>Контактные данные:</b>\n
    <i>Имя:</i> ${name}\n
    <i>Телефон:</i> ${phone} (${countryCode})
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (response.ok) {
      res.json({ success: true, message: "Заявка успешно отправлена!" });
    } else {
      res.status(500).json({
        success: false,
        message: "Ошибка при отправке. Попробуйте позже.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Ошибка при отправке. Попробуйте позже.",
    });
  }
});

// Все остальные запросы отправляем на index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

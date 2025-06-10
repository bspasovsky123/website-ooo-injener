const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Настроим транспорт для отправки email через Nodemailer (используем SMTP-сервер Yandex)
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',  // SMTP-сервер для Yandex (list.ru также использует этот сервер)
  port: 465,  // Порт для SSL-соединения
  secure: true,  // Используем SSL
  auth: {
    user: 'testwebsiteinjener@yandex.ru',  // Ваш email на Yandex
    pass: '123456Test!'   // Ваш пароль от почты на Yandex (или App Password, если включена двухфакторная аутентификация)
  }
});

// Обработчик POST запроса для отправки формы
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Настроим письмо
  const mailOptions = {
    from: email,  // Отправитель (тот, кто заполнил форму)
    to: 'testwebsiteinjener@yandex.ru',  // Замените на ваш email, куда будут приходить заявки
    subject: 'Новая заявка с сайта',
    text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
  };

  // Отправляем письмо
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Ошибка при отправке сообщения');
    }
    res.status(200).send('Сообщение успешно отправлено');
  });
});

// Статический сервер для вашего сайта
app.use(express.static('public'));

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

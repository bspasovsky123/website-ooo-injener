<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Указываем email, на который будут приходить заявки
    $to = "r-v-s@list.ru"; // Замените на ваш email
    $subject = "Заявка с сайта ООО 'Инженер'";
    
    // Формируем тело письма
    $message_body = "Имя: $name\nEmail: $email\nСообщение:\n$message";
    
    // Заголовки для отправки email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
    
    // Отправка письма
    if (mail($to, $subject, $message_body, $headers)) {
        echo "Ваше сообщение успешно отправлено!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
}
?>

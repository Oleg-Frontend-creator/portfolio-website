<?php
declare(strict_types=1);
// Возвращает: "OK" (успех) или текст ошибки

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo "Method Not Allowed";
  exit;
}

$to = 'webbuilding.moscow@yandex.com';
$subjectPrefix = '[Portfolio Callback]';


$fromEmail = 'no-reply@modernstack.ru';
$fromName  = 'ModernStack - Frontend Portfolio';

function clean(string $v): string {
  $v = trim($v);
  $v = str_replace(["\r", "\n"], ' ', $v); // защита от header injection
  return $v;
}

function field(string $key): string {
  return isset($_POST[$key]) ? clean((string)$_POST[$key]) : '';
}

// Достаём поля
$name    = field('name');
$email   = field('email');
$subject = field('subject');
$message = field('message');

// Валидация
if ($name === '' || mb_strlen($name) < 3 || mb_strlen($name) > 50) {
  http_response_code(400);
  echo "Invalid name";
  exit;
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo "Invalid email";
  exit;
}

if ($subject === '' || mb_strlen($subject) > 100) {
  http_response_code(400);
  echo "Invalid subject";
  exit;
}

if ($message === '' || mb_strlen($message) > 700) {
  http_response_code(400);
  echo "Invalid message";
  exit;
}

// Формируем письмо
$subjectSafe = $subjectPrefix . ' ' . $subject;

$body = "Новая заявка с сайта:\n\n";
$body .= "Имя: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Тема: {$subject}\n\n";
$body .= "Сообщение:\n{$message}\n\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n";
$body .= "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? '-') . "\n";

// Заголовки
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=utf-8";
$headers[] = "From: {$fromName} <{$fromEmail}>";
// Reply-To — чтобы удобно отвечать прямо на email клиента
$headers[] = "Reply-To: {$name} <{$email}>";

$headersStr = implode("\r\n", $headers);

// Отправка
$ok = mail($to, '=?UTF-8?B?'.base64_encode($subjectSafe).'?=', $body, $headersStr);

if (!$ok) {
  http_response_code(500);
  echo "Mail send failed";
  exit;
}

echo "OK";
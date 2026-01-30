<?php
declare(strict_types=1);

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
  $v = str_replace(["\r", "\n"], ' ', $v);
  return $v;
}

function field(string $key): string {
  return isset($_POST[$key]) ? clean((string)$_POST[$key]) : '';
}

$name    = field('name');
$email   = field('email');
$type = field('message-type');
$message = field('message');

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

if ($type === '' || mb_strlen($type) > 100) {
  http_response_code(400);
  echo "Invalid type";
  exit;
}

if ($message === '' || mb_strlen($message) > 700) {
  http_response_code(400);
  echo "Invalid message";
  exit;
}

$subjectSafe = $subjectPrefix . ' ' . $type;

$body = "Новая заявка с сайта:\n\n";
$body .= "Имя: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Тип обращения: {$type}\n\n";
$body .= "Сообщение:\n{$message}\n\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n";
$body .= "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? '-') . "\n";

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=utf-8";
$headers[] = "From: {$fromName} <{$fromEmail}>";

$headers[] = "Reply-To: {$name} <{$email}>";

$headersStr = implode("\r\n", $headers);

$ok = mail($to, '=?UTF-8?B?'.base64_encode($subjectSafe).'?=', $body, $headersStr);

if (!$ok) {
  http_response_code(500);
  echo "Mail send failed";
  exit;
}

echo "OK";
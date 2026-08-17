<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine maintenance mode path
$maintenance = file_exists(__DIR__.'/../app/storage/framework/maintenance.php')
    ? __DIR__.'/../app/storage/framework/maintenance.php'
    : __DIR__.'/../storage/framework/maintenance.php';

if (file_exists($maintenance)) {
    require $maintenance;
}

// Register Auto Loader (Supports both local server and cPanel public_html setup)
$autoloader = file_exists(__DIR__.'/../app/vendor/autoload.php')
    ? __DIR__.'/../app/vendor/autoload.php'
    : __DIR__.'/../vendor/autoload.php';

require $autoloader;

// Bootstrap Laravel and handle the request
$bootstrap = file_exists(__DIR__.'/../app/bootstrap/app.php')
    ? __DIR__.'/../app/bootstrap/app.php'
    : __DIR__.'/../bootstrap/app.php';

(require_once $bootstrap)->handleRequest(Request::capture());

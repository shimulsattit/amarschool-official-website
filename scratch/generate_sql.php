<?php
require __DIR__ . '/../vendor/autoload.php';

use Illuminate\Support\Facades\Hash;

$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$hashedPassword = Hash::make('2026$Amarschool%');
echo "HASH: " . $hashedPassword . "\n";

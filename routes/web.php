<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\LeadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Frontend Routes
Route::get('/', [SiteController::class, 'index'])->name('home');
Route::get('/about', [SiteController::class, 'about'])->name('about');
Route::get('/features', [SiteController::class, 'features'])->name('features');
Route::get('/id_card', [SiteController::class, 'idCard'])->name('id-card');
Route::get('/graphics-design-service', [SiteController::class, 'graphicsDesign'])->name('services.graphics');
Route::get('/web-development', [SiteController::class, 'webDevelopment'])->name('services.web-dev');
Route::get('/contact-us', [SiteController::class, 'contactUs'])->name('contact-us');
Route::get('/privacy-policy', [SiteController::class, 'privacyPolicy'])->name('privacy-policy');

// 301 Redirects for backward compatibility with old URL structures
Route::redirect('/id-card', '/id_card', 301);
Route::redirect('/services/graphics-design', '/graphics-design-service', 301);
Route::redirect('/services/web-development', '/web-development', 301);

Route::post('/demo-request', [LeadController::class, 'storeDemoRequest'])
    ->middleware('throttle:10,1')
    ->name('demo.request');

// Backend Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    
    // Admin Dashboard Sections
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/pages', [DashboardController::class, 'pages'])->name('dashboard.pages');
    Route::post('/dashboard/pages', [DashboardController::class, 'updatePages'])->name('dashboard.pages.update');
    Route::get('/dashboard/menu', [DashboardController::class, 'menu'])->name('dashboard.menu');
    Route::post('/dashboard/menu', [DashboardController::class, 'updateMenu'])->name('dashboard.menu.update');
    Route::get('/dashboard/settings', [DashboardController::class, 'settings'])->name('dashboard.settings');
    Route::post('/dashboard/settings', [DashboardController::class, 'updateSettings'])->name('dashboard.settings.update');

    Route::patch('/dashboard/leads/{lead}/status', [DashboardController::class, 'updateStatus'])->name('dashboard.leads.status');
    Route::delete('/dashboard/leads/{lead}', [DashboardController::class, 'destroy'])->name('dashboard.leads.destroy');
});

// Fallback upload server route in case cPanel public_html/uploads is not directly linked
Route::get('/uploads/{filename}', function ($filename) {
    $paths = [
        public_path('uploads/' . $filename),
        base_path('public/uploads/' . $filename),
        dirname(base_path()) . '/public_html/uploads/' . $filename,
        dirname(base_path()) . '/amarschool.co/uploads/' . $filename,
        storage_path('app/public/uploads/' . $filename),
    ];

    foreach ($paths as $path) {
        if (file_exists($path)) {
            return response()->file($path);
        }
    }

    abort(404);
})->where('filename', '.*');

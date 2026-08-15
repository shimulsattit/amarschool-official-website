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
Route::get('/id-card', [SiteController::class, 'idCard'])->name('id-card');
Route::get('/services/graphics-design', [SiteController::class, 'graphicsDesign'])->name('services.graphics');
Route::get('/services/web-development', [SiteController::class, 'webDevelopment'])->name('services.web-dev');

Route::post('/demo-request', [LeadController::class, 'storeDemoRequest'])->name('demo.request');

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
    Route::get('/dashboard/menu', [DashboardController::class, 'menu'])->name('dashboard.menu');
    Route::post('/dashboard/menu', [DashboardController::class, 'updateMenu'])->name('dashboard.menu.update');
    Route::get('/dashboard/settings', [DashboardController::class, 'settings'])->name('dashboard.settings');
    Route::post('/dashboard/settings', [DashboardController::class, 'updateSettings'])->name('dashboard.settings.update');

    Route::patch('/dashboard/leads/{lead}/status', [DashboardController::class, 'updateStatus'])->name('dashboard.leads.status');
    Route::delete('/dashboard/leads/{lead}', [DashboardController::class, 'destroy'])->name('dashboard.leads.destroy');
});

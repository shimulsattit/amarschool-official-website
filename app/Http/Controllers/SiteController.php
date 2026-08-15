<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class SiteController extends Controller
{
    /**
     * Display the Home Page.
     */
    public function index(): Response
    {
        return Inertia::render('Index', [
            'appName' => config('app.name', 'Amar School'),
        ]);
    }

    /**
     * Display the About Us Page.
     */
    public function about(): Response
    {
        return Inertia::render('About');
    }

    /**
     * Display the Features & Core Modules Page.
     */
    public function features(): Response
    {
        return Inertia::render('Features');
    }

    /**
     * Display the ID Card Service Page.
     */
    public function idCard(): Response
    {
        return Inertia::render('IdCard');
    }

    /**
     * Display the Graphics Design Service Page.
     */
    public function graphicsDesign(): Response
    {
        return Inertia::render('Services/GraphicsDesign');
    }

    /**
     * Display the Web Development Service Page.
     */
    public function webDevelopment(): Response
    {
        return Inertia::render('Services/WebDevelopment');
    }
}

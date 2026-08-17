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
        $pages = (new DashboardController())->getPagesData();
        $homePage = collect($pages)->firstWhere('slug', '/');
        $content = $homePage['content'] ?? [];

        return Inertia::render('Index', [
            'appName' => config('app.name', 'Amar School'),
            'pageContent' => $content,
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
        $pages = (new DashboardController())->getPagesData();
        $featuresPage = collect($pages)->firstWhere('slug', '/features');
        $homePage = collect($pages)->firstWhere('slug', '/');

        $content = array_merge($homePage['content'] ?? [], $featuresPage['content'] ?? []);
        $modules = $content['modules'] ?? [];

        return Inertia::render('Features', [
            'pageContent' => $content,
            'modules' => $modules,
        ]);
    }

    /**
     * Display the ID Card Service Page.
     */
    public function idCard(): Response
    {
        $pages = (new DashboardController())->getPagesData();
        $idCardPage = collect($pages)->firstWhere('slug', '/id-card');

        $content = $idCardPage['content'] ?? [];
        $samples = $content['samples'] ?? [];

        return Inertia::render('IdCard', [
            'pageContent' => $content,
            'samples' => $samples,
        ]);
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

    /**
     * Display the Privacy Policy Page.
     */
    public function privacyPolicy(): Response
    {
        return Inertia::render('PrivacyPolicy');
    }

    /**
     * Display the Contact Us Page.
     */
    public function contactUs(): Response
    {
        return Inertia::render('ContactUs');
    }
}

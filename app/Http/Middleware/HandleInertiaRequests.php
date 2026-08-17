<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $defaultMenuItems = [
            ['id' => 1, 'title' => 'Home', 'label' => 'Home', 'url' => '/', 'to' => '/', 'location' => 'Header & Footer', 'order' => 1, 'active' => true],
            ['id' => 2, 'title' => 'About', 'label' => 'About', 'url' => '/about', 'to' => '/about', 'location' => 'Header & Footer', 'order' => 2, 'active' => true],
            ['id' => 3, 'title' => 'Features', 'label' => 'Features', 'url' => '/features', 'to' => '/features', 'location' => 'Header & Footer', 'order' => 3, 'active' => true],
            ['id' => 4, 'title' => 'ID Card', 'label' => 'ID Card', 'url' => '/id-card', 'to' => '/id-card', 'location' => 'Header & Footer', 'order' => 4, 'active' => true],
            ['id' => 5, 'title' => 'Web Development', 'label' => 'Web Development', 'url' => '/services/web-development', 'to' => '/services/web-development', 'location' => 'Header & Footer', 'order' => 5, 'active' => true],
            ['id' => 6, 'title' => 'Graphics Design', 'label' => 'Graphics Design', 'url' => '/services/graphics-design', 'to' => '/services/graphics-design', 'location' => 'Header & Footer', 'order' => 6, 'active' => true],
        ];

        $defaultSettings = [
            'site_name' => 'Amar School',
            'tagline' => 'Education Management System',
            'support_phone' => '+88 01716 282 884',
            'support_email' => 'support@amarschool.com',
            'address' => 'Dhaka, Bangladesh',
            'facebook_url' => 'https://facebook.com/amarschool',
            'whatsapp_number' => '+8801716282884',
            'logo_url' => null,
            'footer_logo_url' => null,
            'favicon_url' => null,
        ];

        $menuItems = $defaultMenuItems;
        $menuPath = storage_path('app/menu_items.json');
        if (\Illuminate\Support\Facades\File::exists($menuPath)) {
            $jsonMenu = json_decode(\Illuminate\Support\Facades\File::get($menuPath), true);
            if (is_array($jsonMenu)) {
                $menuItems = $jsonMenu;
            }
        } else {
            $menuItems = session('menu_items', $defaultMenuItems);
        }

        $siteSettings = $defaultSettings;
        $settingsPath = storage_path('app/site_settings.json');
        if (\Illuminate\Support\Facades\File::exists($settingsPath)) {
            $jsonSettings = json_decode(\Illuminate\Support\Facades\File::get($settingsPath), true);
            if (is_array($jsonSettings)) {
                $siteSettings = array_merge($defaultSettings, $jsonSettings);
            }
        } else {
            $siteSettings = session('settings', $defaultSettings);
        }

        return [
            ...parent::share($request),
            'menuItems' => $menuItems,
            'siteSettings' => $siteSettings,
        ];
    }
}

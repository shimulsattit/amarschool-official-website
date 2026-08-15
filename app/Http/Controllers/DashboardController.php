<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Render backend admin dashboard view.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $leadsQuery = Lead::latest();

        if ($search) {
            $leadsQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('institute_name', 'like', "%{$search}%");
            });
        }

        $leads = $leadsQuery->paginate(15)->withQueryString();

        $stats = [
            'total_leads' => Lead::count(),
            'pending_leads' => Lead::where('status', 'pending')->count(),
            'contacted_leads' => Lead::where('status', 'contacted')->count(),
            'completed_leads' => Lead::where('status', 'completed')->count(),
        ];

        return Inertia::render('Dashboard/Index', [
            'leads' => $leads,
            'stats' => $stats,
            'filters' => [
                'search' => $search ?? '',
            ],
            'user' => $request->user(),
        ]);
    }

    /**
     * Render Pages Management view.
     */
    public function pages(): Response
    {
        $pagesList = [
            ['id' => 1, 'title' => 'Home Page', 'slug' => '/', 'status' => 'Published', 'updated_at' => '2026-08-15'],
            ['id' => 2, 'title' => 'About Us', 'slug' => '/about', 'status' => 'Published', 'updated_at' => '2026-08-15'],
            ['id' => 3, 'title' => 'Features & Modules', 'slug' => '/features', 'status' => 'Published', 'updated_at' => '2026-08-15'],
            ['id' => 4, 'title' => 'ID Card Design Service', 'slug' => '/id-card', 'status' => 'Published', 'updated_at' => '2026-08-15'],
            ['id' => 5, 'title' => 'Graphics Design Service', 'slug' => '/services/graphics-design', 'status' => 'Published', 'updated_at' => '2026-08-15'],
            ['id' => 6, 'title' => 'Web Development Service', 'slug' => '/services/web-development', 'status' => 'Published', 'updated_at' => '2026-08-15'],
        ];

        return Inertia::render('Dashboard/Pages', [
            'pages' => $pagesList,
        ]);
    }

    /**
     * Render Menu Management view.
     */
    public function menu(): Response
    {
        $defaultMenuItems = [
            ['id' => 1, 'title' => 'Home', 'label' => 'Home', 'url' => '/', 'to' => '/', 'location' => 'Header & Footer', 'order' => 1, 'active' => true],
            ['id' => 2, 'title' => 'About', 'label' => 'About', 'url' => '/about', 'to' => '/about', 'location' => 'Header & Footer', 'order' => 2, 'active' => true],
            ['id' => 3, 'title' => 'Features', 'label' => 'Features', 'url' => '/features', 'to' => '/features', 'location' => 'Header & Footer', 'order' => 3, 'active' => true],
            ['id' => 4, 'title' => 'ID Card', 'label' => 'ID Card', 'url' => '/id-card', 'to' => '/id-card', 'location' => 'Header & Footer', 'order' => 4, 'active' => true],
            ['id' => 5, 'title' => 'Web Development', 'label' => 'Web Development', 'url' => '/services/web-development', 'to' => '/services/web-development', 'location' => 'Header & Footer', 'order' => 5, 'active' => true],
            ['id' => 6, 'title' => 'Graphics Design', 'label' => 'Graphics Design', 'url' => '/services/graphics-design', 'to' => '/services/graphics-design', 'location' => 'Header & Footer', 'order' => 6, 'active' => true],
        ];

        $menuItems = session('menu_items', $defaultMenuItems);

        return Inertia::render('Dashboard/Menu', [
            'menuItems' => $menuItems,
        ]);
    }

    /**
     * Update and persist menu items to session/backend.
     */
    public function updateMenu(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'items' => ['required', 'array'],
            'items.*.title' => ['required', 'string', 'max:255'],
            'items.*.url' => ['required', 'string', 'max:255'],
            'items.*.location' => ['required', 'string', 'max:50'],
            'items.*.order' => ['required', 'numeric'],
            'items.*.active' => ['required', 'boolean'],
        ]);

        $formattedItems = array_map(function ($item) {
            return [
                'id' => $item['id'] ?? time(),
                'title' => $item['title'],
                'label' => $item['title'],
                'url' => $item['url'],
                'to' => $item['url'],
                'location' => $item['location'],
                'order' => (int) $item['order'],
                'active' => (bool) $item['active'],
            ];
        }, $validated['items']);

        session(['menu_items' => $formattedItems]);

        return back()->with('message', 'Menu items updated successfully.');
    }

    /**
     * Render Site Settings view.
     */
    public function settings(): Response
    {
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
        ];

        return Inertia::render('Dashboard/Settings', [
            'settings' => session('settings', $defaultSettings),
        ]);
    }

    /**
     * Save Site Settings including Header & Footer Logos.
     */
    public function updateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => ['required', 'string', 'max:255'],
            'tagline' => ['required', 'string', 'max:255'],
            'support_phone' => ['required', 'string', 'max:50'],
            'support_email' => ['required', 'email', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:50'],
            'logo_url' => ['nullable', 'string'],
            'footer_logo_url' => ['nullable', 'string'],
            'logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:4096'],
            'footer_logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:4096'],
        ]);

        $existingSettings = session('settings', []);
        $uploadPath = public_path('uploads');

        if (! File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        // Header Logo Upload
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = 'header_logo_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $filename);

            $validated['logo_url'] = '/uploads/' . $filename;
        } else {
            $validated['logo_url'] = $request->input('logo_url') ?? ($existingSettings['logo_url'] ?? null);
        }

        // Footer Logo Upload
        if ($request->hasFile('footer_logo')) {
            $file = $request->file('footer_logo');
            $filename = 'footer_logo_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $filename);

            $validated['footer_logo_url'] = '/uploads/' . $filename;
        } else {
            $validated['footer_logo_url'] = $request->input('footer_logo_url') ?? ($existingSettings['footer_logo_url'] ?? null);
        }

        unset($validated['logo']);
        unset($validated['footer_logo']);

        session(['settings' => $validated]);

        return back()->with('message', 'Site settings, Header Logo, and Footer Logo saved successfully.');
    }

    /**
     * Update lead status.
     */
    public function updateStatus(Lead $lead, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,contacted,completed,cancelled'],
        ]);

        $lead->update($validated);

        return back()->with('message', 'Lead status updated successfully.');
    }

    /**
     * Delete a lead.
     */
    public function destroy(Lead $lead): RedirectResponse
    {
        $lead->delete();

        return back()->with('message', 'Lead deleted successfully.');
    }
}

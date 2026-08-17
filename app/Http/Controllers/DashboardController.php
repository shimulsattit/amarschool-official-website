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
        return Inertia::render('Dashboard/Pages', [
            'pages' => $this->getPagesData(),
        ]);
    }

    /**
     * Update and persist website page contents, modules, and ID card design samples.
     */
    public function updatePages(Request $request): RedirectResponse
    {
        $pages = json_decode($request->input('pages_json'), true);
        if (! is_array($pages)) {
            $pages = $request->input('pages', []);
        }

        // Handle uploaded ID card sample images (Front & Back)
        $uploadPath = public_path('uploads');
        if (! File::isDirectory($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        // Handle uploaded Mobile App banner image
        if ($request->hasFile('app_banner_image')) {
            $file = $request->file('app_banner_image');
            if ($file) {
                $filename = 'mobile_app_banner_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadPath, $filename);
                foreach ($pages as &$page) {
                    if (($page['slug'] ?? '') === '/') {
                        $page['content']['app_image_url'] = '/uploads/' . $filename;
                    }
                }
            }
        }

        if ($request->hasFile('sample_front_images')) {
            foreach ($request->file('sample_front_images') as $sampleIndex => $file) {
                if ($file) {
                    $filename = 'id_card_front_' . time() . '_' . $sampleIndex . '.' . $file->getClientOriginalExtension();
                    $file->move($uploadPath, $filename);
                    foreach ($pages as &$page) {
                        if (($page['slug'] ?? '') === '/id-card') {
                            if (isset($page['content']['samples'][$sampleIndex])) {
                                $page['content']['samples'][$sampleIndex]['front_image_url'] = '/uploads/' . $filename;
                            }
                        }
                    }
                }
            }
        }

        if ($request->hasFile('sample_back_images')) {
            foreach ($request->file('sample_back_images') as $sampleIndex => $file) {
                if ($file) {
                    $filename = 'id_card_back_' . time() . '_' . $sampleIndex . '.' . $file->getClientOriginalExtension();
                    $file->move($uploadPath, $filename);
                    foreach ($pages as &$page) {
                        if (($page['slug'] ?? '') === '/id-card') {
                            if (isset($page['content']['samples'][$sampleIndex])) {
                                $page['content']['samples'][$sampleIndex]['back_image_url'] = '/uploads/' . $filename;
                            }
                        }
                    }
                }
            }
        }

        if ($request->hasFile('sample_images')) {
            foreach ($request->file('sample_images') as $sampleIndex => $file) {
                if ($file) {
                    $filename = 'id_card_sample_' . time() . '_' . $sampleIndex . '.' . $file->getClientOriginalExtension();
                    $file->move($uploadPath, $filename);
                    foreach ($pages as &$page) {
                        if (($page['slug'] ?? '') === '/id-card') {
                            if (isset($page['content']['samples'][$sampleIndex])) {
                                $page['content']['samples'][$sampleIndex]['image_url'] = '/uploads/' . $filename;
                                if (empty($page['content']['samples'][$sampleIndex]['front_image_url'])) {
                                    $page['content']['samples'][$sampleIndex]['front_image_url'] = '/uploads/' . $filename;
                                }
                            }
                        }
                    }
                }
            }
        }

        $path = storage_path('app/pages_content.json');
        $dir = dirname($path);
        if (! File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true, true);
        }

        File::put($path, json_encode($pages, JSON_PRETTY_PRINT));

        return back()->with('message', 'Page contents, Core Modules, and ID Card Samples saved successfully.');
    }

    /**
     * Render Menu Management view.
     */
    public function menu(): Response
    {
        $menuItems = $this->getMenuItems();

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

        $this->saveMenuItems($formattedItems);

        return back()->with('message', 'Menu items updated successfully.');
    }

    /**
     * Render Site Settings view.
     */
    public function settings(): Response
    {
        return Inertia::render('Dashboard/Settings', [
            'settings' => $this->getSettings(),
        ]);
    }

    /**
     * Save Site Settings including Header Logo, Footer Logo, and Favicon.
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
            'favicon_url' => ['nullable', 'string'],
            'logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:4096'],
            'footer_logo' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp', 'max:4096'],
            'favicon' => ['nullable', 'image', 'mimes:png,jpg,jpeg,svg,webp,ico', 'max:4096'],
        ]);

        $existingSettings = $this->getSettings();
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

        // Favicon Upload
        if ($request->hasFile('favicon')) {
            $file = $request->file('favicon');
            $filename = 'favicon_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $filename);

            $validated['favicon_url'] = '/uploads/' . $filename;
        } else {
            $validated['favicon_url'] = $request->input('favicon_url') ?? ($existingSettings['favicon_url'] ?? null);
        }

        unset($validated['logo']);
        unset($validated['footer_logo']);
        unset($validated['favicon']);

        $this->saveSettings($validated);

        return back()->with('message', 'Site settings, Header Logo, Footer Logo, and Favicon saved successfully.');
    }

    private function getSettings(): array
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
            'favicon_url' => null,
        ];

        $path = storage_path('app/site_settings.json');
        if (File::exists($path)) {
            $json = json_decode(File::get($path), true);
            if (is_array($json)) {
                return array_merge($defaultSettings, $json);
            }
        }

        return session('settings', $defaultSettings);
    }

    private function saveSettings(array $settings): void
    {
        $path = storage_path('app/site_settings.json');
        $dir = dirname($path);
        if (! File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true, true);
        }
        File::put($path, json_encode($settings, JSON_PRETTY_PRINT));
        session(['settings' => $settings]);
    }

    private function getMenuItems(): array
    {
        $defaultMenuItems = [
            ['id' => 1, 'title' => 'Home', 'label' => 'Home', 'url' => '/', 'to' => '/', 'location' => 'Header & Footer', 'order' => 1, 'active' => true],
            ['id' => 2, 'title' => 'About', 'label' => 'About', 'url' => '/about', 'to' => '/about', 'location' => 'Header & Footer', 'order' => 2, 'active' => true],
            ['id' => 3, 'title' => 'Features', 'label' => 'Features', 'url' => '/features', 'to' => '/features', 'location' => 'Header & Footer', 'order' => 3, 'active' => true],
            ['id' => 4, 'title' => 'ID Card', 'label' => 'ID Card', 'url' => '/id-card', 'to' => '/id-card', 'location' => 'Header & Footer', 'order' => 4, 'active' => true],
            ['id' => 5, 'title' => 'Web Development', 'label' => 'Web Development', 'url' => '/services/web-development', 'to' => '/services/web-development', 'location' => 'Header & Footer', 'order' => 5, 'active' => true],
            ['id' => 6, 'title' => 'Graphics Design', 'label' => 'Graphics Design', 'url' => '/services/graphics-design', 'to' => '/services/graphics-design', 'location' => 'Header & Footer', 'order' => 6, 'active' => true],
        ];

        $path = storage_path('app/menu_items.json');
        if (File::exists($path)) {
            $json = json_decode(File::get($path), true);
            if (is_array($json)) {
                return $json;
            }
        }

        return session('menu_items', $defaultMenuItems);
    }

    private function saveMenuItems(array $menuItems): void
    {
        $path = storage_path('app/menu_items.json');
        $dir = dirname($path);
        if (! File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true, true);
        }
        File::put($path, json_encode($menuItems, JSON_PRETTY_PRINT));
        session(['menu_items' => $menuItems]);
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

    public function getPagesData(): array
    {
        $defaultModules = [
            ['id' => 1, 'icon' => 'ClipboardList', 'title' => 'Admission Management', 'body' => 'Keep track of the admission procedure for your school. Record every detail of each student such as their name, age, address, class and grade from arrival.'],
            ['id' => 2, 'icon' => 'GraduationCap', 'title' => 'Student Management', 'body' => 'Track and unfold each student information of where they stand in their scholarship, and update status with one click of a button.'],
            ['id' => 3, 'icon' => 'CalendarCheck', 'title' => 'Attendance Management', 'body' => 'Monitor daily attendance for students and staff, with distance and delays, and generate a quick view of the overall class attendance.'],
            ['id' => 4, 'icon' => 'BookOpen', 'title' => 'Academic Management', 'body' => 'Schools no longer need to spend extra hours and human resources to maintain various academic activities.'],
            ['id' => 5, 'icon' => 'CreditCard', 'title' => 'Fees Management', 'body' => 'Keep track of the school fees and other payments made by your students. You can even send reminders when a student is due for payment.'],
            ['id' => 6, 'icon' => 'LineChart', 'title' => 'Exam and Result Management', 'body' => 'The software allows you to record your students\' test results for each subject and helps them improve.'],
            ['id' => 7, 'icon' => 'Users', 'title' => 'Parent Management', 'body' => 'This software allows you to manage the parents of each student. You can keep track of their contact information as well as their payment details.'],
            ['id' => 8, 'icon' => 'Wallet', 'title' => 'Payroll Management', 'body' => 'You can round the salary of your employees and make sure they receive them pay on time. It is essential to keep track of all financial transactions.'],
            ['id' => 9, 'icon' => 'UserCog', 'title' => 'Teacher and Employee Management', 'body' => 'Amarschool allows you to manage your teacher, employee and their records. It helps you keep track of their attendance, performance and leave.'],
            ['id' => 10, 'icon' => 'MessageSquare', 'title' => 'Payment and SMS Gateway', 'body' => 'Amarschool provides SMS gateways so that you can send SMS alerts for important events, and an online payment collection option.'],
            ['id' => 11, 'icon' => 'School', 'title' => 'Class Management', 'body' => 'Amarschool helps you create a class schedule, which is easy to manage and will help you keep track of your students\' activities.'],
            ['id' => 12, 'icon' => 'Smartphone', 'title' => 'Student and Teacher App', 'body' => 'Connecting with guardians is at your fingertips. Mobile apps for iOS and Android connected to School Management software.'],
            ['id' => 13, 'icon' => 'Percent', 'title' => 'Promotion Management', 'body' => 'Amarschool helps you manage the promotion of students from one grade to another, based on their performance.'],
            ['id' => 14, 'icon' => 'NotebookPen', 'title' => 'Lesson Planning', 'body' => 'Now teachers don\'t need to make separate manual full lesson planning. With Amarschool, teachers can easily do it and publish it for students.'],
            ['id' => 15, 'icon' => 'PlaneTakeoff', 'title' => 'Leave Management', 'body' => 'Manage the leave of all the teachers and staffs with ease. You can keep track of how many days are left for each teacher.'],
            ['id' => 16, 'icon' => 'Home', 'title' => 'Homework Management', 'body' => 'Once students can be given day by day homework effectively and avoid the impossibility of unfamiliarities to changed movement.'],
            ['id' => 17, 'icon' => 'Calculator', 'title' => 'Accounts Management', 'body' => 'This software allows you to manage the accounts of your school. It allows you to keep track of all the payments that are made by parents and students.'],
            ['id' => 18, 'icon' => 'Banknote', 'title' => 'Online Payment', 'body' => 'Guardians no longer need to go to the school to pay all the school fees and vouchers — they can collect and pay online.'],
            ['id' => 19, 'icon' => 'Bell', 'title' => 'Notice Management', 'body' => 'Amarschool allows you to create notices for students, teachers and parents and send notices to multiple recipients at once.'],
            ['id' => 20, 'icon' => 'Fingerprint', 'title' => 'Bio-Metric / RFID', 'body' => 'Amarschool ERP comes with easy integration with biometric device for employee/student attendance.'],
        ];

        $defaultPages = [
            [
                'id' => 1,
                'title' => 'Home Page',
                'slug' => '/',
                'status' => 'Published',
                'updated_at' => date('Y-m-d'),
                'content' => [
                    'heroKicker' => 'Manage School Easily',
                    'heroHeading' => 'Amar School Education Management System',
                    'heroDescription' => 'Amar School is a completely online school management software. It is a one stop solution to manage students, teachers, guardians, academics and accounts of your institute.',
                    'heroButtonText' => 'Request A Demo',
                    'whyTitle' => 'Completed School Management System',
                    'whyDescription' => 'Amarschool is a cloud based school management software that helps you to manage all your school work easily.',
                    'appTitle' => 'Stay connected with everyone! Try our Mobile App',
                    'appDescription' => 'Parents, students and teachers stay connected through the mobile app.',
                    'app_image_url' => null,
                    'google_play_url' => 'https://play.google.com/store',
                    'app_store_url' => 'https://apple.com/app-store',
                    'faqTitle' => 'Most common question about our services',
                ],
            ],
            [
                'id' => 2,
                'title' => 'About Us',
                'slug' => '/about',
                'status' => 'Published',
                'updated_at' => date('Y-m-d'),
                'content' => [
                    'heroHeading' => 'Completed Educational Solution',
                    'heroDescription' => 'Amar School Management System is a comprehensive online school management system.',
                ],
            ],
            [
                'id' => 3,
                'title' => 'Features & Modules',
                'slug' => '/features',
                'status' => 'Published',
                'updated_at' => date('Y-m-d'),
                'content' => [
                    'heroHeading' => 'Core Modules / Features',
                    'heroDescription' => 'Explore 20+ modules of Amar School for complete school automation.',
                    'modules' => $defaultModules,
                ],
            ],
            [
                'id' => 4,
                'title' => 'ID Card Design Service',
                'slug' => '/id-card',
                'status' => 'Published',
                'updated_at' => date('Y-m-d'),
                'content' => [
                    'heroHeading' => 'ID Card Design Service',
                    'heroDescription' => 'Professional student, teacher and staff ID card design for your institute.',
                    'samples' => [
                        [
                            'id' => 1,
                            'title' => 'PVC Card Design -01 (Student)',
                            'image_url' => null,
                        ],
                        [
                            'id' => 2,
                            'title' => 'PVC Card Design -01 (Teacher)',
                            'image_url' => null,
                        ],
                        [
                            'id' => 3,
                            'title' => 'PVC Card Design -01 (Back Part)',
                            'image_url' => null,
                        ],
                    ],
                ],
            ],
            [
                'id' => 5,
                'title' => 'Graphics Design Service',
                'slug' => '/services/graphics-design',
                'status' => 'Published',
                'updated_at' => date('Y-m-d'),
                'content' => [
                    'heroHeading' => 'Graphic Design Agency In Bangladesh',
                    'heroDescription' => 'Logo, business card, brochure, t-shirt and social media design.',
                ],
            ],
            [
                'id' => 6,
                'title' => 'Web Development Service',
                'slug' => '/services/web-development',
                'status' => 'Published',
                'updated_at' => date('Y-m-d'),
                'content' => [
                    'heroHeading' => 'Web Development Service',
                    'heroDescription' => 'Custom websites and web applications built by a team, not freelancers.',
                ],
            ],
        ];

        $path = storage_path('app/pages_content.json');
        if (File::exists($path)) {
            $json = json_decode(File::get($path), true);
            if (is_array($json) && count($json) > 0) {
                return $json;
            }
        }

        return $defaultPages;
    }
}

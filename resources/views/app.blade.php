<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title inertia>{{ config('app.name', 'Amar School') }}</title>

    <!-- Dynamic Favicon -->
    @php
      $settingsPath = storage_path('app/site_settings.json');
      $faviconUrl = '/favicon.ico';
      if (\Illuminate\Support\Facades\File::exists($settingsPath)) {
          $jsonSettings = json_decode(\Illuminate\Support\Facades\File::get($settingsPath), true);
          if (!empty($jsonSettings['favicon_url'])) {
              $faviconUrl = $jsonSettings['favicon_url'];
          }
      }
    @endphp
    <link id="site-favicon" rel="icon" href="{{ $faviconUrl }}" />
    <link rel="shortcut icon" href="{{ $faviconUrl }}" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />

    <!-- Scripts and Styles -->
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
  </head>
  <body class="font-sans antialiased bg-background text-foreground">
    @inertia
  </body>
</html>

import '../../src/styles.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const envAppName = import.meta.env.VITE_APP_NAME;
const appName = (!envAppName || envAppName === 'Laravel') ? 'Amar School' : envAppName;

createInertiaApp({
  title: (title) => (title ? `${title}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const faviconUrl = props.initialPage?.props?.siteSettings?.favicon_url;
    if (faviconUrl) {
      const existingIcons = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
      existingIcons.forEach((el) => {
        el.setAttribute('href', faviconUrl);
      });
    }

    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: {
    color: '#0284c7',
  },
});

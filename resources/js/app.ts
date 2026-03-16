import { createInertiaApp } from '@inertiajs/svelte';
import { hydrate, mount } from 'svelte';
import '../css/app.css';
import { initializeTheme } from '@/lib/theme.svelte';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.svelte', {
            eager: true,
        });

        return pages[`./pages/${name}.svelte`] as never;
    },
    setup({ el, App, props }) {
        if (!el) {
            return;
        }

        if (el.dataset.serverRendered === 'true') {
            hydrate(App, { target: el, props });
        } else {
            mount(App, { target: el, props });
        }
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();

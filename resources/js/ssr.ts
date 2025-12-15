import { createInertiaApp } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import { render } from 'svelte/server';

const appName = import.meta.env.VITE_APP_NAME || 'Larasvelte';

createServer((page) =>
    createInertiaApp({
        page,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => {
            const pages = import.meta.glob<{ default: any }>('./pages/**/*.svelte', { eager: true });
            return pages[`./pages/${name}.svelte`] as any;
        },
        setup({ App, props }) {
            return render(App, { props });
        },
    }),
);

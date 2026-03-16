import { createInertiaApp } from '@inertiajs/svelte';
import type { ResolvedComponent } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import { render } from 'svelte/server';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        resolve: (name) => {
            const pages = import.meta.glob<ResolvedComponent>(
                './pages/**/*.svelte',
                { eager: true },
            );
            return pages[`./pages/${name}.svelte`];
        },
        title: (title) => (title ? `${title} - ${appName}` : appName),
        setup({ App, props }) {
            return render(App, { props });
        },
    }),
);

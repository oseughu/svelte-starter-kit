import { createInertiaApp } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import { render } from 'svelte/server';

createServer((page) =>
    createInertiaApp({
        page,
        resolve: (name) => {
            const pages = import.meta.glob<{ default: any }>('./pages/**/*.svelte', { eager: true });
            return pages[`./pages/${name}.svelte`] as any;
        },
        setup({ App, props }) {
            return render(App, { props });
        },
    }),
);

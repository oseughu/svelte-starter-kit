import { createInertiaApp, type ResolvedComponent } from '@inertiajs/svelte';
import { hydrate, mount } from 'svelte';
import { route as routeFn } from 'ziggy-js';
import '../css/app.css';
import './bootstrap';

declare global {
    const route: typeof routeFn;
}

createInertiaApp({
    resolve: (name: string) => {
        const pages = import.meta.glob<ResolvedComponent>('./pages/**/*.svelte', { eager: true });
        return pages[`./pages/${name}.svelte`];
    },
    setup({ el, App, props }) {
        if (el && el.dataset.serverRendered === 'true') {
            hydrate(App, { target: el, props });
        } else if (el) {
            mount(App, { target: el, props });
        }
    },
});

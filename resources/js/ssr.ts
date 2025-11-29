import type { ResolvedComponent } from '@inertiajs/svelte';
import { createInertiaApp } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import type { LegacyComponentType } from 'svelte/legacy';
import { render } from 'svelte/server';

createServer((page) =>
    createInertiaApp({
        page,
        resolve: async (name: string): Promise<ResolvedComponent> => {
            const pages = import.meta.glob<{ default: LegacyComponentType }>('./pages/**/*.svelte', { eager: true });
            return pages[`./pages/${name}.svelte`].default as unknown as ResolvedComponent;
        },
        setup({ App, props }) {
            return render(App, { props });
        },
    }),
);

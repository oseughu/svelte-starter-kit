import type { ResolvedComponent } from '@inertiajs/svelte';
import { createInertiaApp } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import type { LegacyComponentType } from 'svelte/legacy';
import { render } from 'svelte/server';
import { port } from './lib/portFinder';

// Create a waiting function to ensure port is generated before starting server
const waitForPort = (callback: (port: number) => void) => {
    // Check if port is already defined
    if (port !== undefined) {
        callback(port);
        return;
    }

    // If not, wait a bit and try again
    setTimeout(() => waitForPort(callback), 100);
};

// Wait for port to be ready, then start server
waitForPort((serverPort) => {
    createServer(
        (page) =>
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
        serverPort,
    );
});

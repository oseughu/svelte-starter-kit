import type { ResolvedComponent } from '@inertiajs/svelte';
import { createInertiaApp } from '@inertiajs/svelte';
import createServer from '@inertiajs/svelte/server';
import { createServer as createNetServer } from 'node:net';
import type { LegacyComponentType } from 'svelte/legacy';
import { render } from 'svelte/server';

// Function to find an available port
async function findAvailablePort(startPort: number): Promise<number> {
    const isPortAvailable = (port: number): Promise<boolean> => {
        return new Promise((resolve) => {
            const server = createNetServer();

            server.once('error', () => {
                // Port is in use
                resolve(false);
            });

            server.once('listening', () => {
                // Port is available, close the server
                server.close();
                resolve(true);
            });

            server.listen(port);
        });
    };

    let port = startPort;
    let available = await isPortAvailable(port);

    while (!available) {
        port++;
        available = await isPortAvailable(port);

        if (port > startPort + 100) {
            throw new Error(`Could not find available port after trying ${100} ports`);
        }
    }

    console.log(`Found available port: ${port}`);
    return port;
}

const startPort: number = 13714;

findAvailablePort(startPort).then((port) => {
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
        port,
    );
});

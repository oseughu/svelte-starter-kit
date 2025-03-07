import { createServer as createNetServer } from 'node:net';

/**
 * Check if a specific port is available
 */
export const isPortAvailable = (port: number): Promise<boolean> => {
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

/**
 * Find an available port starting from the given port
 */
export const findAvailablePort = async (startPort: number, maxAttempts = 100): Promise<number> => {
    let port = startPort;
    let available = await isPortAvailable(port);
    let attempts = 0;

    while (!available && attempts < maxAttempts) {
        port++;
        available = await isPortAvailable(port);
        attempts++;
    }

    if (!available) {
        throw new Error(`Could not find available port after trying ${maxAttempts} ports`);
    }

    return port;
};

// Default starting port
const DEFAULT_PORT = 13714;

// Pre-generate a port number when this module is first imported
export let port: number;

// Initialize the port (this runs when the module is imported)
(async () => {
    try {
        port = await findAvailablePort(DEFAULT_PORT);
    } catch (error) {
        console.error('Failed to find available port:', error);
        // Fallback to default port in case of error
        port = DEFAULT_PORT;
    }
})();

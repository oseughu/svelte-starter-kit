<?php

namespace App\Utils;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class PortFinder
{
    /**
     * Start searching from this port number
     *
     * @var int
     */
    protected $startPort;

    /**
     * Maximum number of ports to check
     *
     * @var int
     */
    protected $maxAttempts;

    /**
     * Create a new PortFinder instance
     *
     * @param int $startPort
     * @param int $maxAttempts
     */
    public function __construct(int $startPort = 13714, int $maxAttempts = 100)
    {
        $this->startPort = $startPort;
        $this->maxAttempts = $maxAttempts;
    }

    /**
     * Check if a specific port is available
     *
     * @param int $port
     * @return bool
     */
    public function isPortAvailable(int $port): bool
    {
        // Create a socket
        $socket = @socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        if ($socket === false) {
            return false;
        }

        // Set option to allow address reuse
        @socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

        // Attempt to bind to the port
        $result = @socket_bind($socket, '127.0.0.1', $port);

        // Always close the socket
        socket_close($socket);

        return $result !== false;
    }

    /**
     * Find the first available port
     *
     * @return int
     */
    public function findAvailablePort(): int
    {
        $port = $this->startPort;
        $attempts = 0;

        while ($attempts < $this->maxAttempts) {
            if ($this->isPortAvailable($port)) {
                return $port;
            }

            $port++;
            $attempts++;
        }

        // Fallback to original port if none found
        return $this->startPort;
    }

    /**
     * Write the port to the .env file
     *
     * @param int $port
     * @param string $envVar
     * @return bool True if successful, false otherwise
     */
    public function writeToEnv(int $port, string $envVar = 'INERTIA_SSR_PORT'): bool
    {
        $envFile = base_path('.env');

        if (file_exists($envFile)) {
            $envContents = file_get_contents($envFile);

            // Check if variable already exists in .env
            if (Str::contains($envContents, $envVar . '=')) {
                // Replace existing value
                $envContents = preg_replace(
                    '/' . $envVar . '=(.*)/i',
                    $envVar . '=' . $port,
                    $envContents
                );
            } else {
                // Add new value
                $envContents .= "\n" . $envVar . "=" . $port;
            }

            // Write updated contents back to .env file
            if (file_put_contents($envFile, $envContents) !== false) {
                // Clear cached config to make sure it takes effect
                if (function_exists('artisan')) {
                    Artisan::call('config:clear');
                }
                return true;
            }
        }

        return false;
    }

    /**
     * Find an available port and save it to the .env file
     *
     * @param int $startPort
     * @param int $maxAttempts
     * @param string $envVar
     * @return int The found port
     */
    public static function findAndSave(int $startPort = 13714, int $maxAttempts = 100, string $envVar = 'INERTIA_SSR_PORT'): int
    {
        $finder = new self($startPort, $maxAttempts);
        $port = $finder->findAvailablePort();
        $finder->writeToEnv($port, $envVar);

        return $port;
    }

    /**
     * Static helper to quickly find an available port
     *
     * @param int $startPort
     * @param int $maxAttempts
     * @return int
     */
    public static function find(int $startPort = 13714, int $maxAttempts = 100): int
    {
        return (new self($startPort, $maxAttempts))->findAvailablePort();
    }
}

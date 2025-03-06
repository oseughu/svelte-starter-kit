<?php

namespace App\Utils;

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

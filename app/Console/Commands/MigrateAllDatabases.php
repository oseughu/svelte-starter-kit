<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MigrateAllDatabases extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'migrate:all {--fresh : Drop all tables before migrating} {--seed : Seed the database after migrating}';

    /**
     * The console command description.
     */
    protected $description = 'Ensure all SQLite databases exist and run migrations for each database separately.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        // Get APP_NAME and generate SQLite database names
        $appName = Str::snake(env('APP_NAME', 'larasvelte')); // Default to "laravel" if APP_NAME is not set
        $databasePath = database_path("{$appName}.sqlite");
        $queuePath = database_path("{$appName}_queue.sqlite");
        $cachePath = database_path("{$appName}_cache.sqlite");

        // Define databases and their migration directories
        $databases = [
            'sqlite' => ['path' => $databasePath, 'migrations' => 'database/migrations'],
            'sqlite_queue' => ['path' => $queuePath, 'migrations' => 'database/migrations/queue'],
            'sqlite_cache' => ['path' => $cachePath, 'migrations' => 'database/migrations/cache'],
        ];

        // Ensure all SQLite databases exist
        foreach ($databases as $connection => $dbConfig) {
            if (!File::exists($dbConfig['path'])) {
                File::put($dbConfig['path'], '');
                $this->info("Created SQLite database: {$dbConfig['path']}");
            }
        }

        // Run migrations for each database
        foreach ($databases as $connection => $dbConfig) {
            $this->info("Running migrations for database: $connection");

            $options = [
                '--database' => $connection,
                '--path' => $dbConfig['migrations'],
                '--force' => true,
            ];

            if ($this->option('fresh')) {
                $this->info("Dropping all tables for $connection before migrating...");
                Artisan::call('migrate:refresh', $options);
            } else {
                Artisan::call('migrate', $options);
            }

            $this->info(Artisan::output());

            // Run seeders if requested
            if ($this->option('seed')) {
                $this->info("Seeding database: $connection");
                Artisan::call('db:seed', ['--database' => $connection]);
                $this->info(Artisan::output());
            }
        }
    }
}

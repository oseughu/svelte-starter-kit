<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class AppSetup extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'app:setup';

    /**
     * The console command description.
     */
    protected $description = 'Ensure the .env file exists and generate APP_KEY if missing';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $envPath = base_path('.env');
        $envExamplePath = base_path('.env.example');

        // Step 1: Ensure .env exists
        if (!File::exists($envPath)) {
            if (File::exists($envExamplePath)) {
                File::copy($envExamplePath, $envPath);
                $this->info('Created .env file from .env.example.');
            } else {
                $this->error('.env.example file is missing. Cannot create .env.');

                return;
            }
        } else {
            $this->info('.env file already exists.');
        }

        // Step 2: Ensure APP_KEY is set
        $envContent = File::get($envPath);
        if (!preg_match('/^APP_KEY=(?!\s*\$).+$/m', $envContent)) {
            $this->info('APP_KEY is missing or empty. Generating a new one...');
            Artisan::call('key:generate', ['--force' => true]);
            $this->info(Artisan::output());
        } else {
            $this->info('APP_KEY already exists. No action needed.');
        }

        $this->info('Application setup completed successfully!');
    }
}

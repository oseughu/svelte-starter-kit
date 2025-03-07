<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $connections = ['sqlite', 'sqlite_queue', 'sqlite_cache'];

        foreach ($connections as $connection) {
            if (DB::connection($connection)->getDriverName() === 'sqlite') {
                DB::connection($connection)->unprepared(
                    <<<'SQL'
                    PRAGMA auto_vacuum = incremental;
                    PRAGMA journal_mode = WAL;
                    PRAGMA page_size = 32768;
                    SQL
                );
            }
        }
    }
};

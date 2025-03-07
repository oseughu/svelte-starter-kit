<?php

namespace App\Http\Middleware;

use Closure;

class TelescopeAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (env('APP_ENV') !== 'local') {
            $username = $request->header('PHP_AUTH_USER');
            $password = $request->header('PHP_AUTH_PW');

            if (
                !$username ||
                !$password ||
                $username !== config('telescope.basic_auth.username') ||
                $password !== config('telescope.basic_auth.password')
            ) {
                return response('Invalid credentials', 401, ['WWW-Authenticate' => 'Basic']);
            }
        }

        return $next($request);
    }
}

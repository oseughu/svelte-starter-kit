<?php

namespace Laravel\WorkOS\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateSessionWithWorkOS
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request);
    }
}

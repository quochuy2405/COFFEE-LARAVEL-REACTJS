<?php

namespace App\Http\Middleware;

use Closure;

class Manager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $header = $request->header('Authorization');
        $tokenParts = explode(".", $header);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtPayload = json_decode($tokenPayload);
        if ($jwtPayload->RoleId == 2)
            return $next($request);
        return response("Unauthorize", 401);
    }
}

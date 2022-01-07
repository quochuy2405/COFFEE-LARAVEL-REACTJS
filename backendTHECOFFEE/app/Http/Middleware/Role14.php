<?php

namespace App\Http\Middleware;

use Closure;

class Role1_4
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
        if ($jwtPayload->RoleId == 1 || $jwtPayload->RoleId == 4)
            return $next($request);
        return response("Unauthorize", 401);
    }
}

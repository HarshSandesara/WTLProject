<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    
    public function handle($request, Closure $next, $guard = null)
    {
        $js_code = 'console.log(' . json_encode($guard, JSON_HEX_TAG) . 
    ');';
        
        $js_code = '<script>' . $js_code . '</script>';
    
        echo $js_code;

        if (Auth::guard($guard)->check()) {        
            if ($guard === "committee") {
                return redirect('/committee');
            }
            return redirect(RouteServiceProvider::HOME);
        }

        return $next($request);
    }
}

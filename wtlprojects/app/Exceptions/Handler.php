<?php

namespace App\Exceptions;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Auth;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        return parent::render($request, $exception);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        if ($request->is('committee') || $request->is('committee/*')) {
            return redirect()->guest('/login/committee');
        }
        return redirect()->guest(route('login'));
        // if (in_array('committee', $exception->guards())) {
        //     return $request->expectsJson()
        //         ? response()->json([
        //               'message' => $exception->getMessage()
        //         ], 401)
        //         : redirect()->guest(route('/login/committee'));
        // }

        // return $request->expectsJson()
        // ? response()->json([
        //       'message' => $exception->getMessage()
        // ], 401)
        // : redirect()->guest(route('login'));
    }
}
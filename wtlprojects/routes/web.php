<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
// Route::get('/home', ['middleware' => 'auth', 'uses' => 'EventController@index']);
// Route::get('/events/{id}', 'EventController@show');
// Route::get('/committee', ['middleware' => 'auth.committee', function() {
//         return view('committee');
//     }
// ]);

Route::get('/login/committee', 'Auth\LoginController@showCommitteeLoginForm')->name('login/committee');
Route::get('/register/committee', 'Auth\RegisterController@showCommitteeRegisterForm');

Route::post('/events', 'EventController@store');
Route::post('/login/committee', 'Auth\LoginController@committeeLogin');
Route::post('/register/committee', 'Auth\RegisterController@createCommittee');

Route::get('/home', 'EventController@index') -> middleware('auth');
Route::get('/committee', 'EventController@index') -> middleware('auth:committee');
Route::any('/logoutMiddle', 'EventController@logout2');
// Route::view('/home', 'index') -> middleware('auth');


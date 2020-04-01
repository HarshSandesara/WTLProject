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

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
Route::get('/home', 'EventController@index');
// Route::get('/events/{id}', 'EventController@show');
Route::post('/events', 'EventController@store');
Route::view('/committee', 'committee');

Route::get('/login/committee', 'Auth\LoginController@showCommitteeLoginForm');
Route::get('/register/committee', 'Auth\RegisterController@showCommitteeRegisterForm');

Route::post('/login/committee', 'Auth\LoginController@committeeLogin');
Route::post('/register/committee', 'Auth\RegisterController@createCommittee');

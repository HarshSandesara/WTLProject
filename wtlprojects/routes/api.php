<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Event;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/players', 'PlayerController@index');
// Route::get('/players/{id}', 'PlayerController@show');
// Route::post('/players', 'PlayerController@store');
// Route::post('/players/{id}/answers', 'PlayerController@answer');
// Route::delete('/players/{id}', 'PlayerController@delete');
// Route::delete('/players/{id}/answers', 'PlayerController@resetAnswers');

Route::get('/events', 'EventController@indexApi');
Route::get('/events/{id}', 'EventController@show');
Route::get('/getprofile', 'EventController@loginDataApi');
Route::get('/committeesData', 'EventController@getCommitteeData');
Route::get('/following/{id}', 'EventController@getFollowingData');
Route::get('/follow/{user_id}/{committee_id}', 'EventController@follow');
Route::get('/register/{user_id}/{event_id}', 'EventController@register');
Route::get('/responses/{event_id}', 'EventController@responses');
Route::post('/events', 'EventController@storeApi');
Route::put('/events/{id}', 'EventController@update');
Route::delete('/events/{id}', 'EventController@delete');

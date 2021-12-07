<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::POST('/test', [ApiController::class, 'testapi']);

Route::POST('/testAgain', function(){
    return 'Test 2 Yeah yeah yeah';
});

// Route::POST('/getIncome', [ApiController::class, 'getIncome']);

Route::POST('/addIncome', [ApiController::class, 'addIncome']);

Route::POST('/removeIncome', [ApiController::class, 'removeIncome']);

Route::POST('/getExpenses', [ApiController::class, 'getExpenses']);

Route::POST('/addExpenses', [ApiController::class, 'addExpenses']);

Route::POST('/removeExpenses', [ApiController::class, 'removeExpenses']);

Route::group([
    'middleware' => 'api',
    // 'middleware' => 'auth.jwt',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::group([
    'middleware' => 'api',
    // 'middleware' => 'auth.jwt',
    // 'prefix' => 'auth'

], function ($router) {
    Route::POST('/getIncome', [ApiController::class, 'getIncome']); 
});
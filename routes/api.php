<?php

use App\Http\Controllers\JournalEntryController;
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

Route::get('entries/{date}', [JournalEntryController::class, 'getEntries']);
Route::post('entries/{date}', [JournalEntryController::class, 'addOrUpdateEntry']);


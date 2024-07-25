<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
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


/*
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
*/

/*
Route::get('/home', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');
*/

/*
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
*/

Route::middleware('auth')->group(function () {
    Route::get('/settings', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/settings', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/settings', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', function () {
        return to_route('home');
    })->name('/');
    Route::get('/home', [MainController::class, 'home'])->name('home');

    Route::get('/explore', [MainController::class, 'explore'])->name('explore');
    Route::get('/search/{search?}', [MainController::class, 'search'])->name('search');

    Route::get('/dashboard', function () {
        return to_route('home');
    })->name('dashboard');

    Route::get('/posts/attachement/{fileName}', [PostController::class, 'attachement'])->name('posts.attachement');

    Route::get('/chats', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chats/{id}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chats', [ChatController::class, 'store'])->name('chat.store');
    //Route::delete('/chats/{id}', [ChatController::class, 'destroy'])->name('chat.destroy');

    Route::post('/chats/{chatId}/messages', [MessageController::class, 'store'])->name('message.store');
    Route::put('/messages/{id}', [MessageController::class, 'update'])->name('message.update');
    Route::delete('/messages/{id}', [MessageController::class, 'destroy'])->name('message.destroy');

    Route::resources([
        'posts' => PostController::class,
    ]);

    Route::get('/profile/{tag}', [ProfileController::class, 'show'])->name('profile.show');

    Route::get('/user/avatar/{fileName}', [ProfileController::class, 'avatarAttachment'])->name('user.avatar.attachment');
    Route::get('/user/banner/{fileName}', [ProfileController::class, 'bannerAttachment'])->name('user.banner.attachment');
});

require __DIR__ . '/auth.php';

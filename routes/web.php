<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get("/",  function () {
    return view("home");
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/register', function () {
    return view('register');
});

Route::get("/scheduling", function () {
    return view('scheduling');
});

Route::get("/profile", function () {
    return view('profile');
});

Route::get('/profile/donations', function(){
    return view('view-donations');
});

Route::get('/profile/edit', function () {
    return view('edit-profile');
});

Route::get('/profile/{id}', function (String $id) {
    return view('profile', ['id' => $id]);
});

Route::get("/chat", function () {
    return view('chat');
});

Route::get("/chat/{id}", function (String $id) {
    return view('chat', ['id' => $id]);
});

Route::get("/post/{id}", function (String $id) {
    return view('post', ['id' => $id]);
});

Route::get("/search/ongs", function () {
    return view('search-ong');
});

Route::get("/search/posts", function () {
    return view('search-post');
});
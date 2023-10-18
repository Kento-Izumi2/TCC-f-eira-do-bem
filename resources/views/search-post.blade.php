@extends('layouts.app')

@section('title', 'Pesquisa')

@section('content')
@include('partials.sidebar')
    @vite(['resources/js/search-post.js'])
    <div id="home">
        @include('partials.header')
        <div class="d-flex flex-column max-w-3xl mx-auto align-items-center" id="posting-content">
            <p class="text-white fs-4 mt-1" id="posts-count"></p>
            <div class="space-y-4" id="posts-container">
            </div>
        </div>
    </div>
@endsection

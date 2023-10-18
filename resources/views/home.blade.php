@extends('layouts.app')

@section('title', 'Home')

@section('content')
    @vite(['resources/js/home.js'])
    @include('partials.sidebar')
    <div id="home">
        @include('partials.header')
        <div class="d-flex flex-column max-w-3xl mx-auto align-items-center" id="posting-content">
            <form id="create-form" class="w-100 p-3 bg-white mt-4 mb-4 space-x-4 gap-2 d-flex flex-column">
                @csrf
                <img class="d-none" id="image-preview">
                <input type="file" name="post-image" accept="image/*" id="upload-image" class="d-none">
                <div class="d-flex gap-1">
                    <button id="add-media-button" type="button">
                        <img class="icon-24" src={{ asset('images/document-plus.svg') }} alt="Adicionar imagem" />
                    </button>
                    <textarea name="post-text" class="p-3" placeholder="O que você está pensando..." id="post-text" rows="3"></textarea>
                    <button id="post-send-button">
                        <img class="icon-24" src={{ asset('images/send.svg') }} alt="Publicar" />
                    </button>
                </div>
            </form>
            <div class="space-y-4" id="posts-container">
            </div>
        </div>
    </div>
@endsection

@extends('layouts.app')

@section('content')
    @vite(['resources/js/profile.js'])
    @if (isset($id))
        <meta name="user-id" content="{{ $id }}" id="user-id">
    @endif
    <div class="min-vh-100 w-100 p-sm-4 p-0">
        <div class="w-100 min-vh-100 p-sm-4 d-flex flex-column gap-4 flex-shrink-0" id="profile-container">
            @include('partials.sidebar') 
            <div class="w-100 d-flex flex-row justify-content-between" id="profile-header">
                @include("partials.menu")
                <img src="{{asset('images/logo.png')}}" alt="" class="icon-32" onclick="window.location.href = '/'" style="cursor: pointer;">
            </div>
            <div id="profile-information" class="w-100 d-flex flex-sm-row px-2 flex-column gap-sm-5 gap-1 align-items-center">
                <img id="user-image" alt="Imagem de perfil" class="rounded-circle">
                <div class="d-flex flex-column w-100 gap-2">
                    <div class="d-flex aligns-items-center" id="user-info">
                        <p class="fw-bold m-0 w-100" id="user-name"></p>
                    </div>
                    <div id="profile-bio" class="bg-white w-100 rounded-3 p-2 d-flex">
                        <p id="user-bio" class="user-bio"></p>
                        <textarea id="user-input-bio" class="d-none user-bio"></textarea>
                    </div>
                </div>
            </div>
            <div id="profile-publications" class="w-100 d-flex flex-column my-2 gap-4">
                <div>
                    <p class="fs-3 fw-bold">Publicações</p>
                </div>
                <div id="profile-publication-grid" class="w-100">
                </div>
            </div>
        </div>
    </div>
@endsection

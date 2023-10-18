@extends("layouts.app")

@section("title", "Doações")

@section("content")
    @vite(["resources/js/view-donations.js"])
    <div class="min-vh-100 w-100 p-4">
        @include('partials.sidebar') 
        <div id="donations">

            <div class="w-100 d-flex flex-row justify-content-between">
                @include("partials.menu")
                <img src="{{asset('images/logo.png')}}" alt="" class="icon-32" onclick="window.location.href = '/'" style="cursor: pointer;">
            </div>
            <div id="donations-header">
                <p class="text-primary" id="waiting">Em espera</p>
                <p id="accepted">Aceitas</p>
                <p id="refused">Recusadas</p>
            </div>
            <div class="donations-container" id="donations-container">
            </div>
        </div>
    </div>
@endsection
@extends('layouts.app')

@section('title', 'Agendamento')

@section('content')
    @vite(['resources/js/scheduling.js'])
    <div class="conteiner-fluid d-flex min-vh-100 p-4">

        @include('partials.sidebar') 
        <div class="scheduling">
            <div class="d-flex col-10 justify-content-between">
                @include('partials.menu')

                <img src="{{ asset('images/logo.png') }} " class="icon-32" onclick="window.location.href = '/'" style="cursor: pointer;">
            </div>

            <form class="d-flex w-100 align-items-center justify-content-center gap-3" id="scheduling-form">
                <div class="col-10 d-flex flex-column gap-5">
                    <div class="row m-0">
                        <div class="col-12">
                            <label for="ONGname">Nome ONG</label>
                            <div class="position-relative">
                                <input class="form-control" type="text" id="ongName">
                               <div id="ongsContainer" class="d-none ongsList form-control">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row m-0">
                        <div class="col-6">
                            <label for="schedulingDate">Data:</label>
                            <input class="form-control" type="date" min="" id="schedulingDate">
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-6">
                            <label for="schedulingTime">Horario:</label>
                            <input class="form-control" type="time" id="schedulingTime">
                        </div>

                        <div class="col-6">
                            <label for="schedulingLocal">Local:</label>
                            <input class="form-control" type="text" id="schedulingLocal" placeholder="Av. Endereço Exemplar, 1234">
                        </div>
                    </div>
                    <div class="row m-0">
                        <label for="donateItems">Itens:</label>
                        <div class="col-6">
                            <textarea id="schedulingItems" cols="30" rows="10" class="form-control items"></textarea>
                        </div>
                        <div class="col-6 d-flex flex-column">
                            <iframe id="maps-frame" src="https://maps.google.com/maps?q=Etec Zona Leste&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" width="100%" height="250" style="border: 1px solid #dee2e6; overflow: hidden; border-radius: 0.5rem;"></iframe>
                            {{-- <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12665.220691391682!2d-46.46347494973219!3d-23.52533511861408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce616495555555%3A0x8076d1577db86cf1!2sEtec%20da%20Zona%20Leste!5e0!3m2!1spt-BR!2sbr!4v1694101471673!5m2!1spt-BR!2sbr"
                                 class="w-100 h-100" allowfullscreen="" loading="lazy" ceferrerpolicy="no-referrer-when-downgrade"></iframe> --}}
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-12">
                            <button class="btn btn-color w-100">Solicitar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection

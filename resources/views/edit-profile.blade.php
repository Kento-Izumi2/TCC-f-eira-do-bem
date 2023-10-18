@extends('layouts.app')

@section('title', 'Editar Perfil')

@section('content')
    @vite(['resources/js/edit-profile.js'])    
    <div class="min-vh-100 w-100 p-4">
        <div class="w-100 h-100 d-flex flex-column gap-4 flex-shrink-0 position-relative" id="edit-container">
        @include('partials.sidebar') 
            <div id="edit-header" class="px-2 d-flex flex-sm-row flex-column align-items-center">
                <div class="flex flex-column align-items-center gap-1 my-3" id="edit-header-photo">
                    <img id="user-image" class="rounded-circle">
                    <p id="user-name" class="m-0 text-center fw-bold fs-4"></p>
                </div>
                <div class="d-flex w-100">
                    <div class="d-flex align-items-center w-100">
                        <div class="d-flex flex-column gap-2 w-100 justify-content-center">
                            <div class="d-flex flex-column align-items-center">
                                <p class="m-0 fs-5 fw-bold">Doações feitas</p>
                                <p id="user-donations-made" class="m-0 fs-4"></p>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <p class="m-0 fs-5 fw-bold">Doações recebidas</p>
                                <p id="user-donations-recived" class="m-0 fs-4"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="position-absolute top-16 right-16">
                    @include('partials.menu')
                </div>
            </div>
            <div id="edit-content" class="p-2 d-flex flex-column align-items-center gap-2">
                <h1 class="fs-4">Dados cadastrados</h1>
                <form action="/profile/edit" method="POST"
                    class="d-flex flex-sm-row flex-column w-100 justify-content-sm-around align-items-center align-items-sm-start gap-4"
                    id="edit-form">
                    @method('PUT')
                    @csrf
                    <div class="d-flex flex-column gap-2 w-100">
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="name" class="fw-semibold">
                                Nome:
                            </label>
                            <input disabled type="text" name="name" id="name" 
                                class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="email" class="fw-semibold">
                                E-mail:
                            </label>
                            <input disabled type="text" name="email" id="email" 
                                class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="password" class="fw-semibold">
                                Senha:
                            </label>
                            <input disabled type="password" name="password" id="password" placeholder="Nova senha"
                                class="form-control">
                        </div>
                        {{-- CNPJ --}}
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="cnpj" class="fw-semibold">
                                CNPJ:
                            </label>
                            <input disabled type="text" name="cnpj" id="cnpj" 
                                class="form-control">
                        </div>
                    </div>
                    <div class="d-flex flex-column gap-2 w-100">
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="phone" class="fw-semibold">
                                Telefone:
                            </label>
                            <input disabled type="text" name="phone" id="phone" 
                                class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="address" class="fw-semibold">
                                Endereço:
                            </label>
                            <input disabled type="text" name="address" id="address" 
                                class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="city" class="fw-semibold">
                                Cidade:
                            </label>
                            <input disabled type="text" name="city" id="city" 
                                class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 100px" for="state" class="fw-semibold">
                                Estado:
                            </label>
                            <input disabled type="text" name="state" id="state" 
                                class="form-control">
                        </div>
                    </div>

                </form>
                <div
                    class="w-100 gap-2 d-flex flex-sm-row flex-column justify-content-center justify-content-sm-end p-5 mt-sm-5 mt-1">
                    <button class="btn px-3" id="report-button">Gerar relatório</button>
                    <button class="btn px-3" id="view-donation-button" onclick="location.href='donations'">Visualizar doações</button>
                    <button class="btn px-3" id="edit-button">Alterar dados</button>
                    <button class="btn px-3" id="save-button" disabled>Salvar alterações</button>
                    <button class="btn px-3" id="delete-button">Excluir conta</button>
                </div>
            </div>
        </div>
    </div>
@endsection

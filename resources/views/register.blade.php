@extends('layouts.app')

@section('title', 'Register')

@section('content')
    @vite(['resources/js/register.js'])
    @include('partials.sidebar')
    <div class="min-vh-100 w-100 p-4">
        <div class="w-100 h-100 px-2 py-2 d-flex flex-column gap-4 flex-shrink-0" id="register-container">
            <div class="w-100 d-flex flex-row justify-content-between" id="register-header">
            <div class="w-100 d-flex flex-row justify-content-between" id="profile-header">
                @include("partials.menu")
                <img src="{{asset('images/logo.png')}}" alt="" class="icon-32" onclick="window.location.href = '/'" style="cursor: pointer;">
            </div>
            </div>
            <form method="POST"  id="register-form"
                class="d-flex flex-column justify-content-around h-100 w-100 flex-grow-1">
                <div
                    class="d-flex w-100 justify-content-between flex-sm-row flex-column-reverse align-items-center flex-shrink-0 px-5">
                    <div class="d-flex flex-column w-100 py-4 gap-2 mx-5">
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 200px" for="name" class="fw-semibold">
                                Nome:
                            </label>
                            <input type="text" name="name" id="name" placeholder="Nome" class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 200px" for="email" class="fw-semibold">
                                E-mail:
                            </label>
                            <input type="email" name="email" id="email" placeholder="E-mail" class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 200px" for="password" class="fw-semibold">
                                Senha:
                            </label>
                            <input type="password" name="password" id="password" placeholder="Senha" class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 200px" for="phone" class="fw-semibold">
                                Telefone:
                            </label>
                            <input type="text" name="phone" id="phone" placeholder="Telefone" class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">

                            <label style="width: 200px" for="address" class="fw-semibold">
                                Endereço:
                            </label>
                            <input type="text" name="address" id="address" placeholder="Endereço" class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">

                            <label style="width: 200px" for="cnpj" class="fw-semibold">
                                CNPJ:
                            </label>
                            <input type="text" name="cnpj" id="cnpj" placeholder="CNPJ" class="form-control">
                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">
                            <label style="width: 200px" for="city" class="fw-semibold">
                                Cidade:
                            </label>
                            <input type="text" name="city" id="city" placeholder="Cidade" class="form-control">

                        </div>
                        <div class="d-flex flex-shrink-0 flex-sm-row flex-column align-items-sm-center">

                            <label style="width: 200px" for="state" class="fw-semibold">
                                Estado:
                            </label>
                            <input type="text" name="state" id="state" placeholder="Estado" class="form-control">
                        </div>
                    </div>
                    <div class="d-flex w-100 flex-column align-items-center">
                        <button class="border-0 bg-transparent d-flex flex-column align-items-center p-5" type="button"
                            id="file-upload-button" >
                            <img id="user-image" src="{{ asset('images/user-circle.svg') }}" alt="Imagem de usuário" />
                            <span class="fw-semibold">Carregue uma foto</span>
                        </button>
                        <input type="file" name="image" id="input-image" class="d-none" accept="image/*"
                            />
                    </div>
                </div>
                <div id="register-form-buttons" class="">
                    {{-- Botão Limpar e Botão de enviar --}}
                    <div
                        class="d-flex flex-row justify-content-around justify-content-sm-end align-items-center w-100 px-5 py-4 gap-2">
                        <button type="button" id="clean-inputs" class="fs-5 fw-medium py-2 px-4 rounded-2">
                            Limpar
                        </button>
                        <button type="submit" class="fs-5 fw-medium py-2 px-4 rounded-2">
                            Entrar
                        </button>
                    </div>
            </form>
        </div>
    </div>
@endsection

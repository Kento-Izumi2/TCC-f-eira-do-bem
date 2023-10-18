@extends('layouts.app')

@section('title', 'Login')

@section('content')
    @vite(['resources/js/login.js'])
    <div
        class="container vh-100 d-flex flex-column align-items-center justify-content-start justify-content-sm-center text-white p-5 gap-4">
        <h1 class="display-3 fw-bold">Login</h1>
        <form action="#" id="login-form" class="d-flex flex-column align-items-center gap-3">
            <div class="d-flex flex-column flex-sm-row align-items-sm-center">
                <label style="width: 80px" for="email" class="fw-semibold">
                    E-mail:
                </label>
                <input type="text" name="email" id="email" placeholder="E-mail" class="form-control">
            </div>
            <div class="d-flex flex-column flex-sm-row align-items-sm-center">
                <label style="width: 80px" for="password" class="fw-semibold">
                    Senha:
                </label>
                <input type="password" name="password" id="password" placeholder="Senha" class="form-control">
            </div>
            <button class="btn btn-primary w-50 fs-5 fw-medium mt-4">
                Entrar
            </button>
        </form>
        <div id="social-login">
            <p>Registrar com: </p>
            <div id="social-login-buttons">
                <button id="google-button">
                    <img src="{{ asset('images/google.png') }}" alt="">
                </button>
            </div>
        </div>
        <div>
            <p class="fs-4">Não tem uma conta? <a href="/register">Registrar</a></p>
        </div>
    </div>
@endsection

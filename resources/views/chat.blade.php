@extends('layouts.app')

@section('title', 'Chat')

@section('content')
    @vite(['resources/js/chat.js'])
    @if(isset($id))
        <meta name="chat-id" content="{{ $id }}" id="chat-id">
    @endif
    <div class="conteiner-fluid d-flex min-vh-100 p-4">

        @include('partials.sidebar') 
        <div id="chat">
            <div class="d-flex w-100" id="header-chat">
                <div class="col-12 col-md-6 d-flex justify-content-center align-items-center gap-5 px-3" id="header-control">
                    <div class="d-flex justify-content-center align-items-center">
                        @include('partials.menu')
                        <img src="{{ asset('images/chat.png') }}" class="openChat" onclick="openChats()">
                    </div>
                    <div class="search col-8 d-flex justify-content-center">
                        <input id="search-users">
                        <button class="search-button">
                            <img src="{{ asset('images/search.png') }}" alt="">
                        </button>
                        <div class="d-none" id="search-users-result">

                        </div>
                    </div>

                </div>
                <div class="col-12 col-md-6 d-flex align-items-center">
                    <img src="{{ asset('images/chat.png') }}" class="openChat" onclick="openChats()">
                    <p class="w-100 fs-2 text-center" id="user-chat-title">
                    </p>
                </div>
            </div>
            <div class="d-flex w-100" id="body-chat">
                <div class="col-12 col-md-6 d-flex gap-3 flex-column h-100 user-chats-container" id="body-control">
                </div>
                <div class="col-12 col-md-6 d-flex flex-column gap-3">
                    <div class="messages-area d-flex flex-column p-4">
                       
                    </div>
                    <div class="send w-100 d-flex justify-content-center">
                        <input id="message-input">
                        <button id="message-send">
                            <img src="{{ asset('images/send.png') }}" alt="">
                        </button>
                    </div>
                </div>
                <div class="w-100 p-4 d-flex align-items-center">
                </div>
            </div>
        </div>
    </div>
    </div>
    <script>
        var isOpen = false

        window.addEventListener("resize", (e) => {
            if (e.target.outerWidth > 767 && isOpen) {
                openChats()
            }
        })

        function openChats() {
            const headerChat = document.getElementById('header-chat')
            const bodyChat = document.getElementById('body-chat')
            if (isOpen) {
                headerChat.children[0].setAttribute("id", "header-control")
                bodyChat.children[0].setAttribute("id", "body-control")
                headerChat.children[1].classList.remove("d-none")
                bodyChat.children[1].classList.remove("d-none")

            } else {
                headerChat.children[0].removeAttribute("id", "header-control")
                bodyChat.children[0].removeAttribute("id", "body-control")
                headerChat.children[1].classList.add("d-none")
                bodyChat.children[1].classList.add("d-none")
            }
            isOpen = !isOpen
        }
    </script>
@endsection

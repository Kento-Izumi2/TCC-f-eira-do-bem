@extends('layouts.app')

@section('content')
    @vite(['resources/js/post.js'])
    <div class="min-vh-100 w-100 p-sm-4 p-0">
        <meta name="post-id" content="{{ $id }}">
        @include('partials.sidebar') 
        <div id="post-container">
            <div>
                @include('partials.menu')
            </div>
            <div id="post-content">
                <div id="post-content-image">
                    <img src="" alt="Publicação" id="post-image">
                </div>
                <div id="post-comment-section">
                    <div id="comments">
                        <div class="comment" id="post-detail">
                            <img class="rounded-circle" src="" id="post-author-image"
                                alt="">
                            <div class="comment-message" id="">
                                <a class="fw-bold" id="post-author-name"></a>
                                <span id="post-message"></span>
                            </div>
                        </div>
                    </div>
                    <div>

                        <div id="post-interactions">
                            <div>
                                <button id="like-button">
                                    <img src="{{ asset('images/heart.svg') }}" alt="Curtir" id="heart-icon">
                                </button>
                                <span id="post-likes-count"></span>
                            </div>
                            <div>
                                <button id="focus-comment-button">
                                    <img src="{{ asset('images/chat-bubble.svg') }}" alt="Comentar">
                                </button>
                                <span id="post-comments-count"></span>
                            </div>
                        </div>
                        <div id="post-send-comment">
                            <input type="text" placeholder="Adicione um comentário..." id="input-comment" />
                            <button id="comment-button">
                                <img src="{{ asset('images/send.png') }}" alt="Enviar">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            
        </script>
    @endsection

<div class="header">
    <div class="header-logo">
        <img src="{{ asset('images/logo.png')}}" alt="Logo Feira do Bem" onclick="window.location.href = '/'" style="cursor: pointer;">
    </div>
    <div class="header-search-bar">
        <input type="text" name="search" class="header-search-input" />
        <div id="search-box" class="d-none">
            <a id="search-ongs" href="/search/ongs?q=x">Procurar por X em ONGs/Empresas</a>
            <a id="search-posts" href="/search/posts?q=y">Procurar por Y em postagens</a>
        </div>
        <button class="header-search-button" id="search-button">
            <img src="{{ asset('images/search.png') }}" alt="">
        </button>
    </div>
    <nav class="header-nav">
        @include('partials.menu')
    </nav>
    <script>
        const searchButton = document.getElementById('search-button');
        const searchInput = document.querySelector('.header-search-input');
        const searchBox = document.getElementById('search-box');
        const searchOngs = document.getElementById('search-ongs');
        const searchPosts = document.getElementById('search-posts');

        document.addEventListener("DOMContentLoaded", () => {
            searchInput.value = "";
        })

        searchInput.addEventListener("focusout", () => {
            setTimeout(() => {
                searchBox.classList.add('d-none');
            }, 1000);
        })

        searchInput.addEventListener("focusin", () => {
            if(searchInput.value.length > 0) {
                searchBox.classList.remove('d-none');
            }
        })

        searchInput.addEventListener("input", (e) => {
            if(e.target.value.length > 0) {
                searchBox.classList.remove('d-none');
            } else {
                searchBox.classList.add('d-none');
            }
            searchOngs.href = `/search/ongs?q=${e.target.value}`;
            searchPosts.href = `/search/posts?q=${e.target.value}`;
            searchOngs.innerText = `Procurar por ${e.target.value} em ONGs/Empresas`;
            searchPosts.innerText = `Procurar por ${e.target.value} em postagens`;

        })

        searchButton.addEventListener('click', () => {
            window.location.href = `/search/posts?q=${e.target.value}`;
        });
    </script>
</div>

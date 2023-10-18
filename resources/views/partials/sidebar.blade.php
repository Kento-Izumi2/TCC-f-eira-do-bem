@vite(['resources/js/sidebar.js'])
<div id="sidebar" class="z-3">
    <div class="close">
        <img class="icon-32" src="{{ asset("images/x.png")}}" alt="">
    </div>
    <div id="sidebar-user">
        <img src="{{asset('images/user-circle.svg')}}" alt="Imagem de perfil" id="sidebar-photo-user">
        <p id="user_name"></p>
    </div>
    <div id="sidebar-options">
        <a class="sidebar-option" href="/">
            <img class="icon-32" src="{{asset("images/home.png")}}" alt="">
            <p>Home</p>
        </a>
        <a class="sidebar-option" href="/chat">
            <img class="icon-32" src="{{ asset("images/chat.png") }}" alt="">
            <p>Chat</p>
        </a>
        <a class="sidebar-option" href="/scheduling">
            <img class="icon-32" src=" {{ asset("images/gift.png") }}" alt="">
            <p>Doar</p>
        </a>
       <a class="sidebar-option d-none" href="/profile" id="profile-option">
            <img class="icon-32" src="{{ asset("images/user.png")}}" alt="">
            <p>Perfil</p>
        </a> 
        <a class="sidebar-option d-none" id="logout-option">
            <img class="icon-32" src="{{ asset("images/exit.png")}}" alt="">
            <p>Logout</p>
        </a> 
        <a class="sidebar-option" href="/login" id="login-option">
            <img class="icon-32" src="{{ asset("images/user.png")}}" alt="">
            <p>Login</p>
        </a> 
        <a class="sidebar-option" href="/register" id="register-option">
            <img class="icon-32" src="{{ asset("images/user.png")}}" alt="">
            <p>Cadastro</p>
        </a> 
    </div>
    <script>
        const closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', () => {
            const sidebar = document.querySelector('#sidebar');
            sidebar.classList.toggle('enable')
        });
    </script>
</div>
 
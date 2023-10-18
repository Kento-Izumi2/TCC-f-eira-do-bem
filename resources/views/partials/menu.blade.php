<div id="menu">
    <button class="header-menu-button">
        <img src="{{ asset('images/hamburguer.png') }}" alt="Menu">
    </button>
    <script>
        const headerMenuButton = document.querySelector('.header-menu-button');
        headerMenuButton.addEventListener('click', () => {
            const sidebar = document.querySelector('#sidebar');
            sidebar.classList.toggle('enable')
        });
    </script>
</div>
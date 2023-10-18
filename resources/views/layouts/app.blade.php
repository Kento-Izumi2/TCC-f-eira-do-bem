<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title') | Feira do bem</title>
    @vite(['resources/js/app.js'])
</head>
<body>
    <div class="min-vh-100 overflow-hidden" id="root">
        @yield('content')
    </div>
</body>
</html>
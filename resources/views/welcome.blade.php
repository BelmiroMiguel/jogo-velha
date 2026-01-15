<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('estilo.css') }}">

</head>

<body>

    <header>
        <h1>Jogo da Velha</h1>
    </header>


    <main>
        <!-- 1. Tabuleiro -->
        <section id="tabuleiro-section">
            <h2>Tabuleiro</h2>

            <div class="jogadores-info">
                <div class="jogador">
                    <label for="nomeJogador1">Jogador 1:</label>
                    <input type="text" id="nomeJogador1" placeholder="Nome do Jogador 1">
                    <span class="vitorias">Vitórias: <strong id="vitorias1">0</strong></span>
                </div>
                <div class="jogador">
                    <label for="nomeJogador2">Jogador 2:</label>
                    <input type="text" id="nomeJogador2" placeholder="Nome do Jogador 2">
                    <span class="vitorias">Vitórias: <strong id="vitorias2">0</strong></span>
                </div>
            </div>

            <div id="tabuleiro" class="tabuleiro">
                <div class="celula" data-posicao="0"></div>
                <div class="celula" data-posicao="1"></div>
                <div class="celula" data-posicao="2"></div>
                <div class="celula" data-posicao="3"></div>
                <div class="celula" data-posicao="4"></div>
                <div class="celula" data-posicao="5"></div>
                <div class="celula" data-posicao="6"></div>
                <div class="celula" data-posicao="7"></div>
                <div class="celula" data-posicao="8"></div>
            </div>
        </section>


        <!-- 2. Ranking de jogadores -->
        <section id="ranking-section">
            <h2>Ranking de Jogadores</h2>
            <ul id="ranking-jogadores" class="ranking">
                <!-- JS vai popular aqui -->
            </ul>
        </section>

        <!-- 3. Lista de jogos -->
        <section id="jogos-section">
            <h2>Jogos Recentes</h2>
            <ul id="lista-jogos" class="lista-jogos">
                <!-- JS vai popular aqui -->
            </ul>
        </section>

        <!-- 4. Replay do jogo -->
        <section id="replay-section">
            <h2>Replay</h2>
            <div id="replay-controls">
                <button id="replay-voltar">⏮️ Voltar</button>
                <button id="replay-pausar">⏸️ Pausar</button>
                <button id="replay-continuar">▶️ Continuar</button>
                <button id="replay-avancar">⏭️ Avançar</button>
            </div>
            <div id="replay-tabuleiro" class="tabuleiro">
                <div class="celula" data-posicao="0"></div>
                <div class="celula" data-posicao="1"></div>
                <div class="celula" data-posicao="2"></div>
                <div class="celula" data-posicao="3"></div>
                <div class="celula" data-posicao="4"></div>
                <div class="celula" data-posicao="5"></div>
                <div class="celula" data-posicao="6"></div>
                <div class="celula" data-posicao="7"></div>
                <div class="celula" data-posicao="8"></div>
            </div>
        </section>
    </main>


    <script src="{{ asset('script.js') }}"></script>

</body>

</html>

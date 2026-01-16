<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic-Tac-Toe Pro | Battle Arena</title>
    <link rel="stylesheet" href="{{ asset('estilo.css') }}">
    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap"
        rel="stylesheet">
</head>

<body class="dark-theme">

    <header>
        <div class="logo">
            <span class="glitch" data-text="TIC-TAC-TOE">TIC-TAC-TOE</span>
            <span class="subtitle">ARENA PRO</span>
        </div>
    </header>

    <main class="container">
        <!-- Coluna Esquerda: Tabuleiro e Controles -->
        <div class="left-panel">
            <section id="tabuleiro-section" class="glass-card">
                <div class="section-header">
                    <h2><span class="dot"></span> Partida Atual</h2>
                    <button id="btn-novo-jogo" class="btn-primary">Novo Jogo 🎮</button>
                </div>

                <div class="jogadores-info">
                    <div class="jogador p1">
                        <input type="text" id="nomeJogador1" placeholder="Player X">
                        <div class="stats-mini">
                            Vitórias: <strong id="vitorias1">0</strong>
                        </div>
                    </div>
                    <div class="vs-divider">VS</div>
                    <div class="jogador p2">
                        <input type="text" id="nomeJogador2" placeholder="Player O">
                        <div class="stats-mini">
                            Vitórias: <strong id="vitorias2">0</strong>
                        </div>
                    </div>
                </div>

                <div id="tabuleiro" class="tabuleiro">
                    @for ($i = 0; $i < 9; $i++)
                        <div class="celula" data-posicao="{{ $i }}"></div>
                    @endfor
                </div>
            </section>

            <section id="replay-section" class="glass-card mt-20">
                <h2>🎞️ Replay da Partida</h2>
                <div id="replay-controls">
                    <button id="replay-voltar" title="Voltar">⏮️</button>
                    <button id="replay-pausar" title="Pausar">⏸️</button>
                    <button id="replay-continuar" title="Reproduzir" class="btn-glow">▶️</button>
                    <button id="replay-avancar" title="Avançar">⏭️</button>
                </div>
                <div id="replay-tabuleiro" class="tabuleiro-mini">
                    @for ($i = 0; $i < 9; $i++)
                        <div class="celula-mini" data-posicao="{{ $i }}"></div>
                    @endfor
                </div>
            </section>
        </div>

        <!-- Coluna Direita: Ranking e Histórico -->
        <div class="right-panel">
            <section id="ranking-section" class="glass-card h-50">
                <h2>🏆 Hall da Fama</h2>
                <ul id="ranking-jogadores" class="ranking-list">
                    <!-- JS -->
                </ul>
            </section>

            <section id="jogos-section" class="glass-card h-50 mt-20">
                <h2>📜 Histórico</h2>
                <ul id="lista-jogos" class="jogos-list">
                    <!-- JS -->
                </ul>
            </section>
        </div>
    </main>

    <script src="{{ asset('script.js') }}"></script>
</body>

</html>

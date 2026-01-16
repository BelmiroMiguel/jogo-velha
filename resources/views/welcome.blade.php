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

    <main class="container">
        <!-- Coluna Esquerda: Tabuleiro e Controles -->
        <div class="left-panel">
            <section id="tabuleiro-section" class="glass-card">
                <div class="section-header">
                    <h2><span class="dot glitch "></span> JOGO DA VELHA</h2>
                    <button id="btn-novo-jogo" class="btn-primary">Novo Jogo 🎮</button>
                </div>

                <div class="jogadores-info">
                    <div class="jogador p1">
                        <p class="">X</p>
                        <input type="text" id="nomeJogador1" placeholder="Player X">
                        <div class="stats-mini">
                            Vitórias: <strong id="vitorias1">0</strong>
                        </div>
                    </div>
                    <div class="vs-divider">VS</div>
                    <div class="jogador p2">
                        <p class="">O</p>
                        <input type="text" id="nomeJogador2" placeholder="Player O">
                        <div class="stats-mini">
                            Vitórias: <strong id="vitorias2">0</strong>
                        </div>
                    </div>
                </div>

                <div class="status-turno">
                    <span>Vez de:</span>
                    <strong id="vez-jogador">X</strong>
                </div>

                <div id="tabuleiro" class="tabuleiro">
                    @for ($i = 0; $i < 9; $i++)
                        <div class="celula" data-posicao="{{ $i }}"></div>
                    @endfor
                </div>
            </section>

            <section id="replay-section" class="glass-card mt-20">
                <h2>🎞️ Replay da Partida</h2>

                <div class="replay-wrapper">
                    <!-- Controles (Esquerda) -->
                    <div id="replay-controls">
                        <button id="replay-voltar" title="Voltar">
                            <span>⏮️</span> <small>Voltar</small>
                        </button>
                        <button id="replay-pausar" title="Pausar">
                            <span>⏸️</span> <small>Pausar</small>
                        </button>
                        <button id="replay-continuar" title="Reproduzir" class="btn-glow">
                            <span>▶️</span> <small>Play</small>
                        </button>
                        <button id="replay-avancar" title="Avançar">
                            <span>⏭️</span> <small>Avançar</small>
                        </button>
                    </div>

                    <!-- Tabuleiro (Centro) -->
                    <div id="replay-tabuleiro" class="tabuleiro-mini">
                        @for ($i = 0; $i < 9; $i++)
                            <div class="celula-mini" data-posicao="{{ $i }}"></div>
                        @endfor
                    </div>

                    <!-- Informações (Direita) -->
                    <div class="replay-info">
                        <div class="info-box">
                            <span class="label">Progresso</span>
                            <div class="valor">
                                <span id="passo-atual">0</span> / <span id="total-passos"
                                    style="color: rgb(7, 61, 0)">0</span>
                            </div>
                            <small style="font-size: 0.8rem">Passos</small>
                        </div>

                        <div class="info-box status-vitoria">
                            <span class="label">Resultado</span>
                            <div id="replay-resultado" class="valor-resultado">-</div>
                        </div>
                    </div>
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

    <div id="modal-alerta" class="modal-overlay">
        <div class="modal-content glass-card">
            <div class="modal-icon">🏆</div>
            <h2 id="modal-titulo">FIM DE JOGO</h2>
            <p id="modal-mensagem"></p>
            <button id="btn-continuar" class="btn-glow">Continuar</button>
        </div>
    </div>

    <div id="modal-erro" class="modal-overlay">
        <div class="modal-content error-card">
            <div class="modal-icon">🚫</div>
            <h2 id="modal-erro-titulo">ERRO</h2>
            <p id="modal-erro-mensagem"></p>
            <button id="btn-erro-fechar" class="btn-error">Entendido</button>
        </div>
    </div>

    <script src="{{ asset('script.js') }}"></script>
</body>

</html>

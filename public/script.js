// URLs da API
const API_BASE = "http://localhost:8000/api"; // ajuste pro seu ambiente
const URL_JOGAR = `${API_BASE}/jogar`;
const URL_JOGADORES = `${API_BASE}/jogadores`;
const URL_JOGOS = `${API_BASE}/jogos`;

// Elementos DOM
const tabuleiro = document.getElementById("tabuleiro");
const rankingEl = document.getElementById("ranking-jogadores");
const listaJogosEl = document.getElementById("lista-jogos");
const replayTabuleiro = document.getElementById("replay-tabuleiro");
let replayJogadas = [];
let replayIndex = 0;
let replayInterval = null;

let jogoAtual = null;

// ==========================
// FUNÇÕES PRINCIPAIS
// ==========================

// 1. Jogar
async function jogar(idJogo = null, nomeJogador1, nomeJogador2, posicao) {
    try {
        const res = await fetch(URL_JOGAR, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idJogo,
                nomeJogador1,
                nomeJogador2,
                posicao,
            }),
        });

        const data = await res.json();

        if (res.status != 200) {
            throw new Error(data.error || "Erro desconhecido");
        }

        jogoAtual = data.jogo;

        if (jogoAtual.status != "decorrer") {
            alert(
                `Jogo finalizado! Resultado: ${jogoAtual.status} ${
                    jogoAtual.jogadorVitoria
                        ? "- Vencedor: " + jogoAtual.jogadorVitoria.nome
                        : ""
                }`
            );
        }

        atualizarTabuleiro(data.jogo.jogadas);
        atualizarListaJogos();
        atualizarRanking();

        return data;
    } catch (err) {
        alert("Erro ao jogar: " + err);
    }
}

// 2. Listar jogadores (ranking)
async function atualizarRanking() {
    try {
        const res = await fetch(URL_JOGADORES);
        const jogadores = await res.json();

        rankingEl.innerHTML = "";
        jogadores.forEach((j) => {
            const li = document.createElement("li");
            li.textContent = `${j.nome} - Vitórias: ${j.qtdVitorias}, Empates: ${j.qtdEmpates}, Derrotas: ${j.qtdDerrotas}`;
            rankingEl.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao buscar ranking:", err);
    }
}

// 3. Listar jogos
async function atualizarListaJogos() {
    try {
        const res = await fetch(URL_JOGOS);
        const jogos = await res.json();

        listaJogosEl.innerHTML = "";
        jogos.forEach((j) => {
            const li = document.createElement("li");
            li.textContent = `Jogo ${j.idJogo}: ${j.jogador1.nome} vs ${j.jogador2.nome} - Status: ${j.status}`;
            li.addEventListener("click", () => {
                jogoAtual = j;
                atualizarTabuleiro(j.jogadas);

                iniciarReplay(j);
            });
            listaJogosEl.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao buscar jogos:", err);
    }
}

// ==========================
// TABULEIRO
// ==========================

function atualizarTabuleiro(jogadas) {
    // desabilitar inputs de nome e setar nomes
    document.getElementById("nomeJogador1").value = jogoAtual.jogador1.nome;
    document.getElementById("nomeJogador1").disabled = true;
    document.getElementById("nomeJogador2").value = jogoAtual.jogador2.nome;
    document.getElementById("nomeJogador2").disabled = true;

    document.getElementById("vitorias1").innerText =
        jogoAtual.jogador1.qtdVitorias;
    document.getElementById("vitorias2").innerText =
        jogoAtual.jogador2.qtdVitorias;

    // Limpa tabuleiro
    tabuleiro.querySelectorAll(".celula").forEach((c) => (c.textContent = ""));
    // Preenche jogadas
    jogadas.forEach((j) => {
        const celula = tabuleiro.querySelector(
            `.celula[data-posicao='${j.posicao}']`
        );
        if (celula) celula.textContent = j.simbolo || ""; // se quiser mostrar X/O ou outro
    });
}

// Adiciona clique para jogar
tabuleiro.querySelectorAll(".celula").forEach((c) => {
    c.addEventListener("click", () => {
        const pos = parseInt(c.dataset.posicao);
        jogar(
            jogoAtual ? jogoAtual.idJogo : null,
            jogoAtual
                ? jogoAtual.nomeJogador1
                : document.getElementById("nomeJogador1").value,
            jogoAtual
                ? jogoAtual.nomeJogador2
                : document.getElementById("nomeJogador2").value,
            pos
        );
    });
});

// ==========================
// REPLAY
// ==========================

function iniciarReplay(jogo) {
    replayJogadas = jogo.jogadas;
    replayIndex = 0;
    atualizarReplayTabuleiro();
    pausarReplay();
}

function atualizarReplayTabuleiro() {
    replayTabuleiro
        .querySelectorAll(".celula")
        .forEach((c) => (c.textContent = ""));
    for (let i = 0; i <= replayIndex; i++) {
        const j = replayJogadas[i];
        const celula = replayTabuleiro.querySelector(
            `.celula[data-posicao='${j.posicao}']`
        );
        if (celula) celula.textContent = j.simbolo || "";
    }
}

// Controles replay
function avancarReplay() {
    if (replayIndex < replayJogadas.length - 1) {
        replayIndex++;
        atualizarReplayTabuleiro();
    }
}
function voltarReplay() {
    if (replayIndex > 0) {
        replayIndex--;
        atualizarReplayTabuleiro();
    }
}
function pausarReplay() {
    if (replayInterval) clearInterval(replayInterval);
}
function continuarReplay() {
    pausarReplay();
    replayInterval = setInterval(() => {
        if (replayIndex < replayJogadas.length - 1) {
            replayIndex++;
            atualizarReplayTabuleiro();
        } else {
            pausarReplay();
        }
    }, 1000);
}

// Botões replay
document
    .getElementById("replay-avancar")
    .addEventListener("click", avancarReplay);
document
    .getElementById("replay-voltar")
    .addEventListener("click", voltarReplay);
document
    .getElementById("replay-pausar")
    .addEventListener("click", pausarReplay);
document
    .getElementById("replay-continuar")
    .addEventListener("click", continuarReplay);

// ==========================
// INICIALIZAÇÃO
// ==========================

atualizarRanking();
atualizarListaJogos();

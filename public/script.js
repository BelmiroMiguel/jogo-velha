const API_BASE = "http://localhost:8000/api";
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

// Botão Novo Jogo
document.getElementById("btn-novo-jogo").addEventListener("click", () => {
    jogoAtual = null;
    document.getElementById("nomeJogador1").disabled = false;
    document.getElementById("nomeJogador2").disabled = false;
    document.getElementById("nomeJogador1").value = "";
    document.getElementById("nomeJogador2").value = "";
    document
        .querySelectorAll(".tabuleiro .celula")
        .forEach((c) => (c.textContent = ""));
    console.log("Sistema resetado para novo jogo.");

    // Resetar tudo e jogoAtual
    jogoAtual = null;
    atualizarTabuleiro([]);
    atualizarListaJogos();
    atualizarRanking();
    atualizarReplayTabuleiro();
});

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
        if (res.status != 200) throw new Error(data.error || "Erro");

        jogoAtual = data.jogo;
        atualizarTabuleiro(data.jogo.jogadas);
        atualizarListaJogos();
        atualizarRanking();

        if (jogoAtual.status != "decorrer") {
            // Pequeno delay para a animação da última peça terminar
            setTimeout(
                () => alert(`FIM DE JOGO: ${jogoAtual.status.toUpperCase()}`),
                300
            );
        }
    } catch (err) {
        alert(err.message);
    }
}

function atualizarTabuleiro(jogadas) {
    const i1 = document.getElementById("nomeJogador1");
    const i2 = document.getElementById("nomeJogador2");

    i1.value = jogoAtual?.jogador1?.nome ?? "";
    i1.disabled = true;
    i2.value = jogoAtual?.jogador2?.nome ?? "";
    i2.disabled = true;

    document.getElementById("vitorias1").innerText =
        jogoAtual?.jogador1?.qtdVitorias;
    document.getElementById("vitorias2").innerText =
        jogoAtual?.jogador2?.qtdVitorias;

    document
        .querySelectorAll(".tabuleiro .celula")
        .forEach((c) => (c.textContent = ""));

    jogadas.forEach((j) => {
        const celula = document.querySelector(
            `.tabuleiro .celula[data-posicao='${j.posicao}']`
        );
        if (celula) {
            celula.textContent = j.simbolo;
            celula.style.color = j.simbolo === "X" ? "#00f2ff" : "#ff0055";
            celula.style.textShadow = `0 0 10px ${
                j.simbolo === "X" ? "#00f2ff" : "#ff0055"
            }`;
        }
    });
}

// Event Listeners para o Tabuleiro
document.querySelectorAll(".tabuleiro .celula").forEach((c) => {
    c.addEventListener("click", () => {
        const pos = parseInt(c.dataset.posicao);
        const n1 = document.getElementById("nomeJogador1").value;
        const n2 = document.getElementById("nomeJogador2").value;

        if (!n1 || !n2) return alert("Insira os nomes dos jogadores!");

        jogar(jogoAtual?.idJogo, n1, n2, pos);
    });
});

async function atualizarRanking() {
    const res = await fetch(URL_JOGADORES);
    const jogadores = await res.json();
    const rankingEl = document.getElementById("ranking-jogadores");

    rankingEl.innerHTML = jogadores
        .map(
            (j, index) => `
        <li>
            <span class="jogador-info"><strong>#${index + 1}</strong> ${
                j.nome
            }</span>
            <span class="v-count" style="display: flex; align-items: center; gap: 5px;">
                <span style="font-size:1.4rem">${j.qtdVitorias}</span>
                <span style=" ">🏆</span>
            </span>
        </li>
    `
        )
        .join("");
}

async function atualizarListaJogos() {
    const res = await fetch(URL_JOGOS);
    const jogos = await res.json();
    const listaEl = document.getElementById("lista-jogos");

    listaEl.innerHTML = jogos
        .map(
            (j) => `
        <li class="${
            j.idJogo === jogoAtual?.idJogo ? "active" : ""
        }" id="jogo-${j.idJogo}">
            <div >
                <small>ID #${j.idJogo}</small>
                <div class="jogo-info">
                    <span class="${
                        j.jogador1.idJogador == j.jogadorVitoria?.idJogador
                            ? "vencedor"
                            : ""
                    }">${j.jogador1.nome}</span>
                    vs
                    <span class="${
                        j.jogador2.idJogador == j.jogadorVitoria?.idJogador
                            ? "vencedor"
                            : ""
                    }">${j.jogador2.nome}</span>
                </div>
            </div>
            <span class="status-badge">${j.status}</span>
        </li>
    `
        )
        .join("");

    // click no item do jogo histórico
    listaEl.querySelectorAll("li").forEach((li, index) => {
        li.addEventListener("click", () => {
            li.classList.add("active");
            document
                .querySelectorAll("#lista-jogos li")
                .forEach((sibling, sIndex) => {
                    if (sIndex !== index) sibling.classList.remove("active");
                });
            iniciarReplay(jogos[index]);
        });
    });
}

// ==========================
// REPLAY
// ==========================

function iniciarReplay(jogo) {
    jogoAtual = jogo;
    const i1 = document.getElementById("nomeJogador1");
    const i2 = document.getElementById("nomeJogador2");

    i1.value = jogo.jogador1.nome;
    i1.disabled = true;
    i2.value = jogo.jogador2.nome;
    i2.disabled = true;

    document.getElementById("vitorias1").innerText = jogo.jogador1.qtdVitorias;
    document.getElementById("vitorias2").innerText = jogo.jogador2.qtdVitorias;

    atualizarTabuleiro(jogo.jogadas);

    // Configurar replay
    replayJogadas = jogo.jogadas;
    replayIndex = 0;
    atualizarReplayTabuleiro();
    pausarReplay();
}

function atualizarReplayTabuleiro() {
    // SELECIONA AS CÉLULAS MINI
    const celulasMini = document.querySelectorAll(".celula-mini");

    // Limpa todas
    celulasMini.forEach((c) => (c.textContent = ""));

    // Preenche até o index atual
    for (let i = 0; i <= replayIndex; i++) {
        const jogada = replayJogadas[i];
        if (jogada) {
            const celula = document.querySelector(
                `.celula-mini[data-posicao='${jogada.posicao}']`
            );
            if (celula) {
                celula.textContent = jogada.simbolo;
                celula.style.color =
                    jogada.simbolo === "X" ? "var(--primary)" : "var(--accent)";
            }
        }
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

// Inicialização
atualizarRanking();
atualizarListaJogos();

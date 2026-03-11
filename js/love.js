const HEART_CELL_SIZE = 40;

// Mapa 13x11 do coração (1 = tem coração, 0 = vazio)
// Desenhado para ficar totalmente preenchido como na imagem que você mandou
const HEART_MAP = [
    "0011100001110",
    "0111110011110",
    "1111111111111",
    "1111111111111",
    "1111111111111",
    "0111111111110",
    "0011111111100",
    "0001111111000",
    "0000111110000",
    "0000011100000",
    "0000001000000"
];

const love = document.getElementsByClassName("love")[0];
let timer = null;
let index = 0;
let typingStarted = false;
let heartStarted = false;

// Pré-calcula todas as posições onde terá coração
const heartCells = [];
for (let row = 0; row < HEART_MAP.length; row++) {
    const line = HEART_MAP[row];
    for (let col = 0; col < line.length; col++) {
        if (line.charAt(col) === "1") {
            heartCells.push({ x: col, y: row });
        }
    }
}

function Next() {
    if (index >= heartCells.length) {
        clearInterval(timer);
        if (!typingStarted) {
            typingStarted = true;
            startTyping();
        }
        return;
    }

    const cellInfo = heartCells[index++];
    const cell = document.createElement("div");
    cell.className = "heart-cell";
    cell.style.left = (cellInfo.x * HEART_CELL_SIZE) + "px";
    cell.style.top = (cellInfo.y * HEART_CELL_SIZE) + "px";
    love.appendChild(cell);
}

function startTyping() {
    const textWrapper = document.querySelector(".love-text");
    const mainEl = document.querySelector(".love-main");
    const subEl = document.querySelector(".love-sub");
    const metaEl = document.querySelector(".love-meta");

    if (!textWrapper || !mainEl || !subEl || !metaEl) return;

    const mainText = "I love you";
    const subText = "Maria Eduarda Pinheiro Passos";
    const metaText = "@dudixvzp";

    let mainIdx = 0;
    let subIdx = 0;
    let metaIdx = 0;
    let step = "main";

    // apaga o texto inicial para só aparecer digitado
    mainEl.textContent = "";
    subEl.textContent = "";
    metaEl.textContent = "";

    // agora mostra o bloco de texto (começa invisível no CSS)
    textWrapper.style.opacity = "1";

    const speed = 80; // ms por caractere

    const typeTimer = setInterval(() => {
        if (step === "main") {
            if (mainIdx < mainText.length) {
                mainEl.textContent += mainText.charAt(mainIdx++);
                return;
            }
            step = "sub";
            return;
        }

        if (step === "sub") {
            if (subIdx < subText.length) {
                subEl.textContent += subText.charAt(subIdx++);
                return;
            }
            step = "meta";
            return;
        }

        if (step === "meta") {
            if (metaIdx < metaText.length) {
                metaEl.textContent += metaText.charAt(metaIdx++);
                return;
            }
            clearInterval(typeTimer);
        }
    }, speed);
}

window.onload = function () {
    // começa a montar o coração DEPOIS de um tempo fixo
    // para dar tempo do GIF aparecer primeiro, mesmo se vier do cache
    const HEART_START_DELAY_MS = 7000; // 7s depois do carregamento da página

    function startHeart() {
        if (heartStarted) return;
        heartStarted = true;
        timer = setInterval(() => {
            Next();
        }, 30); // mais rápido: intervalo menor entre os corações
    }

    setTimeout(startHeart, HEART_START_DELAY_MS);
};


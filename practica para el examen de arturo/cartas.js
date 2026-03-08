const emojis = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍉", "🥝", "🍍"];
let tablero = [];
let cartasVolteadas = [];
let parejasEncontradas = 0;

// --- TAREA A: Duplicar emojis y mezclar ---
function setupTablero() {
    for (let i = 0; i < emojis.length; i++) {
    tablero.push(emojis[i]);
    tablero.push(emojis[i]); // duplicar
    }
    
    for (let i = tablero.length - 1;i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        let temp = tablero[i];
        tablero[i] = tablero[j];
        tablero[j] = temp;
    }
}

// --- TAREA B: Pintar el tablero en el DOM ---
function pintarTablero() {
    const tableroDiv = document.getElementById("tablero");
    tableroDiv.innerHTML = ""; // limpiar por si se reinicia
    tablero.forEach((emoji, index) => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.emoji = emoji;

        const frontal = document.createElement("div");
        frontal.classList.add("frontal");
        frontal.textContent = "?";

        const trasera = document.createElement("div");
        trasera.classList.add("trasera");
        trasera.textContent = emoji;

        carta.appendChild(frontal);
        carta.appendChild(trasera);

        carta.addEventListener("click", () => girarCarta(carta));

        tableroDiv.appendChild(carta);
    });
}

// --- TAREA C: Interacción y Lógica ---
function girarCarta(carta) {
    if (
        cartasVolteadas.length < 2 &&
        !carta.classList.contains("volteada") &&
        !carta.classList.contains("encontrada")
    ) {
        carta.classList.add("volteada");
        cartasVolteadas.push(carta);

        if (cartasVolteadas.length === 2) {
            verificarPareja();
        }
    }
}

function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;

    if (carta1.dataset.emoji === carta2.dataset.emoji) {
        // Pareja encontrada
        carta1.classList.add("encontrada");
        carta2.classList.add("encontrada");
        parejasEncontradas++;
        cartasVolteadas = [];

        if (parejasEncontradas === emojis.length) {
            document.getElementById("mensaje").textContent = "¡Victoria! 🎉";
        }
    } else {
        // No son iguales, girarlas de nuevo tras 1s
        setTimeout(() => {
            carta1.classList.remove("volteada");
            carta2.classList.remove("volteada");
            cartasVolteadas = [];
        }, 1000);
    }
}

// --- Inicialización ---
setupTablero();
pintarTablero();
const emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎹']; // Los símbolos
let cartasVolteadas = [];
let parejasEncontradas = 0; // Parejas encontradas
let movimientos = 0; // Movimientos realizado
let bloqueado = false;

/*const imagenes = [
    'imagenes/perro.png',
    'imagenes/gato.png',
    'imagenes/pajaro.png',
    'imagenes/pez.png'
];*/

let cartas = [...emojis, ...emojis];
//let cartas = [...imagenes, ...imagenes];

function mezclarCartas() {
    cartas.sort(() => Math.random() - 0.5); // da número aleatorio entre -0.5 y 0.5
}

function crearTablero() {
    let tablero = document.getElementById('tablero');
    tablero.innerHTML = '';
    for (let i = 0; i < cartas.length; i++) {
        let carta = document.createElement('div');
        carta.className = 'carta oculta';
        carta.textContent = '?';
        carta.dataset.emoji = cartas[i];
        carta.addEventListener('click', voltearCarta);
        tablero.appendChild(carta);
        /*let img = document.createElement('img'); En vez del textContent hacia abajo
        img.src = cartas[i];
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.display = 'none'; // Oculta al principio
        carta.appendChild(img);
        carta.dataset.imagen = cartas[i]; // ✅ Cambiar de emoji a imagen
        carta.addEventListener('click', voltearCarta);
        tablero.appendChild(carta);*/
    }
}

function voltearCarta() {
    let carta = this;
    if (bloqueado) return;
    if (carta.classList.contains('visible') || 
        carta.classList.contains('encontrada')) {
        return;
    }
    if (cartasVolteadas.length >= 2) return;
    carta.textContent = carta.dataset.emoji;
    carta.classList.remove('oculta');
    carta.classList.add('visible');
    cartasVolteadas.push(carta);
    if (cartasVolteadas.length === 2) {
        bloqueado = true;
        movimientos++;
        document.getElementById('movimientos').textContent = movimientos;
        setTimeout(comprobarPareja, 1000);
    }
}

/*function voltearCarta() {
    let carta = this;
    if (bloqueado) return;
    if (carta.classList.contains('visible') || 
        carta.classList.contains('encontrada')) {
        return;
    }
    if (cartasVolteadas.length >= 2) return;

    let img = carta.querySelector('img');
    img.style.display = 'block';
    carta.textContent = ''; // Quitar el "?"
    carta.appendChild(img); // Volver a agregar la imagen
    
    carta.classList.remove('oculta');
    carta.classList.add('visible');
    cartasVolteadas.push(carta);
    
    if (cartasVolteadas.length === 2) {
        bloqueado = true;
        movimientos++;
        document.getElementById('movimientos').textContent = movimientos;
        setTimeout(comprobarPareja, 1000);
    }
}*/

function comprobarPareja() {
    let carta1 = cartasVolteadas[0];
    let carta2 = cartasVolteadas[1];
    let emoji1 = carta1.dataset.emoji;
    let emoji2 = carta2.dataset.emoji;
    /*let imagen1 = carta1.dataset.imagen;  Cambiar de emoji a imagen
    let imagen2 = carta2.dataset.imagen;*/
    if (emoji1 === emoji2) {
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        parejasEncontradas++;
        document.getElementById('parejas').textContent = parejasEncontradas;
        if (parejasEncontradas === emojis.length) {
        /*if (parejasEncontradas === imagenes.length) { Cambiar emojis por imagenes*/
            setTimeout(() => {
                alert('¡GANASTE! 🎉\nMovimientos: ' + movimientos);
            }, 500);}
    }
    else {
/*      let img1 = carta1.querySelector('img');
        let img2 = carta2.querySelector('img');
        img1.style.display = 'none';
        img2.style.display = 'none';*/
        carta1.textContent = '?';
        carta1.classList.remove('visible');
        carta1.classList.add('oculta');
        carta2.textContent = '?';
        carta2.classList.remove('visible');
        carta2.classList.add('oculta');
    }
    cartasVolteadas = [];
    bloqueado = false;
}

mezclarCartas();
crearTablero();

function reiniciarJuego() {
    cartasVolteadas = [];
    parejasEncontradas = 0;
    movimientos = 0;
    bloqueado = false;
    document.getElementById('movimientos').textContent = 0;
    document.getElementById('parejas').textContent = 0;
    mezclarCartas();
    crearTablero();
}
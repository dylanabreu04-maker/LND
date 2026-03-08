// 1. VARIABLES GLOBALES
const simbolosOriginales = ["🦁", "🐯", "🐻", "🐨", "🐼", "🐸", "🐙", "🦄"];

let tablero = [];  //Lo usaremos para guardar todos los simbolos del tablero        
let cartasVolteadas = [];  //Se guardan las cartas volteadas aquÃ­ hay que cargarlo y vaciarlo cuando toque
let movimientos = 0; //Sirve para contar el numero de movimientos(cada vez que se levantan dos cartas se debe sumar 1)      
let paresEncontrados = 0; //Sirve para aumentar el numero de pares encontrados en caso de llegar al numero de simbolos se gana 
let bloqueado = false; //Sirve para bloquear el tablero y que no levanten mas de dos cartas    

// Referencias al HTML
const contenedorTablero = document.getElementById('tablero-juego');
const displayMovimientos = document.getElementById('movimientos');
const modalVictoria = document.getElementById('modal-victoria');
const boton = document.querySelector('.btn-jugar');


// 2. FUNCIONES 

// PASO 1: LÃ“GICA DE DATOS
function crearTableroLogico() {
    simbolosOriginales.forEach(simbolo => {
        tablero.push(simbolo);
        tablero.push(simbolo);
    })
    tablero.sort(() => Math.random() - 0.5);

    boton.addEventListener('click', reiniciar)
    
    console.log("Tablero generado:", tablero);
}

// PASO 2: DIBUJAR EN EL HTML
function dibujarTableroHTML() {
    contenedorTablero.innerHTML = ''; // Limpieza inicial

    tablero.forEach(simbolo => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.simbolo = simbolo

        carta.innerHTML = `
            <div class="contenido-carta">
                <div class="cara-frontal">?</div>
                <div class="cara-trasera">${simbolo}</div>
            </div>
        `;

        carta.addEventListener('click', () => {manejarClick(carta)})

        contenedorTablero.appendChild(carta)
    })
}

// PASO 3: GESTIONAR EL CLIC
function manejarClick(carta) {

    if (bloqueado || carta.classList.contains('volteada') ||
    carta.classList.contains('encontrada')) return;

    carta.classList.add('volteada');
    cartasVolteadas.push(carta);
    
    if (cartasVolteadas.length == 2)
    {
        bloqueado = true;
        movimientos++;
        displayMovimientos.textContent = `movimientos`;
        setTimeout(verificarPar, 1000);
    }
}

// PASO 4: VERIFICAR SI SON IGUALES
function verificarPar() {
    const carta1 = cartasVolteadas[0];
    const carta2 = cartasVolteadas[1];

    if (carta1.dataset.simbolo == carta2.dataset.simbolo)
    {
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        paresEncontrados++;
        if (paresEncontrados == (tablero.length)/2)
        {
            modalVictoria.classList.remove('oculto')
        }
    }
    else
    {
        carta1.classList.remove('volteada');
        carta2.classList.remove('volteada');
    }

    bloqueado = false;
    cartasVolteadas = [];
}

function reiniciar(){
    modalVictoria.classList.add('oculto');
    tablero = [];
    movimientos = 0;
    paresEncontrados=0;
    crearTableroLogico();
    dibujarTableroHTML();
}

// 3. INICIO DEL JUEGO 
crearTableroLogico();
dibujarTableroHTML();
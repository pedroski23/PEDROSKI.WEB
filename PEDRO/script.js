// Variables del juego
const tablero = document.querySelectorAll('.celda');
const mensaje = document.getElementById('mensaje');
const reiniciarBtn = document.getElementById('reiniciar');
let jugadorActual = 'X';
let juegoTerminado = false;
let tableroEstado = ['', '', '', '', '', '', '', '', ''];

// Combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Función para manejar un clic en una celda
tablero.forEach((celda, index) => {
    celda.addEventListener('click', () => {
        if (juegoTerminado || tableroEstado[index] !== '') return;

        tableroEstado[index] = jugadorActual;
        celda.textContent = jugadorActual;

        if (verificarGanador()) {
            mensaje.textContent = `¡El jugador ${jugadorActual} ha ganado!`;
            lanzarFuegosArtificiales(); // Llamada a la función de fuegos artificiales
            juegoTerminado = true;
        } else if (tableroEstado.every(celda => celda !== '')) {
            mensaje.textContent = '¡Es un empate!';
            juegoTerminado = true;
        } else {
            cambiarJugador();
        }
    });
});

// Función para cambiar de jugador
function cambiarJugador() {
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    mensaje.textContent = `Turno del jugador ${jugadorActual}`;
}

// Función para verificar si hay un ganador
function verificarGanador() {
    return combinacionesGanadoras.some(combinacion => {
        return combinacion.every(index => tableroEstado[index] === jugadorActual);
    });
}

// Función para reiniciar el juego
reiniciarBtn.addEventListener('click', reiniciarJuego);

function reiniciarJuego() {
    tableroEstado = ['', '', '', '', '', '', '', '', ''];
    juegoTerminado = false;
    jugadorActual = 'X';
    mensaje.textContent = `Turno del jugador ${jugadorActual}`;
    tablero.forEach(celda => celda.textContent = '');
}

// Función para lanzar los fuegos artificiales
function lanzarFuegosArtificiales() {
    var count = 200; // Cantidad de fuegos artificiales
    var defaults = {
        origin: { y: 0.6 }
    };

    function lanzarConfetti() {
        confetti(Object.assign({}, defaults, {
            particleCount: Math.floor(count * 0.25),
            spread: 26,
            startVelocity: 55,
            colors: ['#bb0000', '#ffffff'],
        }));
        confetti(Object.assign({}, defaults, {
            particleCount: Math.floor(count * 0.2),
            spread: 60,
            colors: ['#00bbff', '#ffbb00'],
        }));
    }

    // Hacer que el efecto se vea como fuegos artificiales disparados por 2 segundos
    for (let i = 0; i < 6; i++) {
        setTimeout(lanzarConfetti, i * 400);
    }
}

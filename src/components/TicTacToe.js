import React, { useState, useEffect } from 'react';
import './TicTacToe.css'

// tiene que haber un cuadrado de 3x3
// cada cuadradito en el cuadrado, tendrá un índice (o sea, de 0 a 8)
// const con las combinaciones ganadoras del tablero (0,1,2 - 0,3,6 - 1,4,7...)

// 0,1,2
// 3,4,5
// 6,7,8

// una constante tablero que maneje el estado inicial del tablero y permita su actualización con useState
// el jugador actual por defecto en X
// un ganador por defecto como null
// Estado inicial del tablero como null
// un useEffect que cada vez que cambie el tablero compruebe si se ha ganado o terminado el juego
// Si el cuadrado ya tiene un valor (X u O) o ya hay un ganador, impedir más movimientos ahí o en general
// No modificar el tablero original o por defecto, solo el actual (.slice no cambia el estado original del tablero, solo su copia)
// con .slice al resetear el tablero vuelve a null completo sin las movidas anteriores
// Actualizar el estado del tablero con la nueva copia del tablero con las jugadas actuales
//  función para comprobar el ganador según el estado del tablero
// para una combinación dentro de combinaciones ganadoras...se gana
// En los índices especificados de cada combinación ganadora debe haber el mismo símbolo (X o O)
// si el tablero no tiene una de esas combinaciones, es empate
// Cambiar el jugador actual. Si el jugador actual es 'X', cambiar a 'O', y viceversa
// lógica para el botón de reseteo del juego
// cambiará el tablero a su estado inicial
// todos los estados vuelven a estar por defecto como al principio
// const cuadrado que recibe un index y que al hacerle click se ejecute jugar
// botones de a 3 cuadrados con un index asignado para cada uno
// div que entrega la info de ganar o empatar
// botón para resetear el juego que reinicie el tablero a su estado inicial

const combinacionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const estadoInicialTablero = Array(9).fill(null);
// Array(9).fill(null) === [null, null, null, null, null, null, null, null]

const TicTacToe = () => {
  const [tablero, setTablero] = useState(estadoInicialTablero);
  const [jugadorActual, setJugadorActual] = useState('X');
  const [ganador, setGanador] = useState(null);

  // -------------------------------------------------------------------------------------------------------------

  // función para jugar en base al index en el tablero 
  const jugar = (index) => {

    if (tablero[index] || ganador) return;
    // tablero[index] No permite hacer un movimiento en una casilla ya ocupada
    // ganador No permite hacer más movimientos
    //  La declaración return en una función detiene la ejecución de la función y la hace salir inmediatamente (lo que viene después de la función entonces no se va a ejecutar)
    const nuevoTablero = tablero.slice();
    // esto asegura que cualquier cambio se haga en una nueva copia y no en el estado original

    // Colocar la marca del jugador actual en la posición especificada por 'index'
    nuevoTablero[index] = jugadorActual;
    // coloca la marca del jugador actual ('X' o 'O') en la posición especificada por index en la copia del tablero (nuevoTablero)
    setTablero(nuevoTablero);
    setJugadorActual(jugadorActual === 'X' ? 'O' : 'X');
  };
  // -------------------------------------------------------------------------------------------------------------
  const comprobarGanador = () => {
    for (let combinacion of combinacionesGanadoras) {
      const [a, b, c] = combinacion;
      if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
        // desestructuración de array combinacionesGanadoras para extraer los tres índices de cada combinación que contendrán los símbolos X o O
        // a, b, y c representan las posiciones en el tablero que deben ser iguales para que haya una combinación ganadora
        // si en combinacionesGanadoras del tablero, tablero en el [indiceA] es, por ej, 'X', el B y C deben también ser 'X' para ganar
        // Si tablero[a] tiene el valor 'X', entonces para que haya una combinación ganadora, tablero[b] y tablero[c] también deben ser 'X'
        setGanador(tablero[a]);
        return;
      }
    }
    if (!tablero.includes(null)) {
      // si no hay espacios vacíos (ni tampoco es ganador, según lo anterior), entonces es empate
      setGanador('Empate');
    }
  };

  useEffect(() => {
    comprobarGanador();
  }, [tablero]);

  // -------------------------------------------------------------------------------------------------------------
  const ResetearJuego = () => {
    setTablero(estadoInicialTablero);
    setJugadorActual('X');
    setGanador(null);
  }
  // -------------------------------------------------------------------------------------------------------------
  const cuadrado = (index) => {
    return (
      <button className="cuadrado" onClick={() => jugar(index)}>
        {tablero[index]}
      </button>
    );
  };
  // -------------------------------------------------------------------------------------------------------------
  return (
    <div className="tic-tac-toe">
      <div className="tablero">
        <div className='fila'>
          {cuadrado(0)}
          {cuadrado(1)}
          {cuadrado(2)}
        </div>

        <div className='fila'>
          {cuadrado(3)}
          {cuadrado(4)}
          {cuadrado(5)}
        </div>

        <div className='fila'>
          {cuadrado(6)}
          {cuadrado(7)}
          {cuadrado(8)}
        </div>
        {/* ------------------------------------------------------------------------------------------------------------- */}

      </div>
      <div className="info">
        {ganador ? (
          <h1>{ganador === 'Empate' ? '¡Es un empate!' : `¡Ganó ${ganador}!`}</h1>
        ) : (
          <h2>Jugando...</h2>
        )}
      </div>
      <button onClick={ResetearJuego}>Reiniciar Juego</button>
    </div>
  );
};

export default TicTacToe;


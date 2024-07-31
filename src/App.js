import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import './App.css';

// Animación de lanzamiento
const launch = keyframes`
  0% {
    transform: translateY(0) rotateY(0deg);
  }
  50% {
    transform: translateY(-150px) rotateY(360deg);
  }
  100% {
    transform: translateY(0) rotateY(720deg);
  }
`;

// Componente de moneda
const Coin = styled.div`
  width: 256px;
  height: 256px;
  border-radius: 50%;
  perspective: 1000px;
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFD700;
  background-image: url(${props => props.$isFlipping ? `${process.env.PUBLIC_URL}/coin.png` : (props.$result === 'Cara' ? `${process.env.PUBLIC_URL}/cara.png` : `${process.env.PUBLIC_URL}/cruz.png`)});
  background-size: cover;
  background-position: center;
  animation: ${props => props.$animate && css`${launch} 2s ease-in-out`};
`;

function App() {
  const [result, setResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const audioRef = useRef(null);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    if (audioRef.current) {
      audioRef.current.play(); // Reproduce el sonido
    }

    setTimeout(() => {
      const randomOutcome = Math.random() < 0.5 ? 'Cara' : 'Cruz';
      setResult(randomOutcome);
      setIsFlipping(false);
    }, 1000); // El tiempo debe coincidir con la duración de la animación
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Juguemos a la ficha!</h1>
        <Coin 
          $animate={isFlipping} 
          $result={result} 
          $isFlipping={isFlipping}
        />
        <button 
          onClick={flipCoin} 
          disabled={isFlipping}
        >
          Lanzar Moneda
        </button>
        {result && <h2>Resultado: {result}</h2>}
        <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/coin-flip.mp3`} preload="auto" />
      </header>
    </div>
  );
}

export default App;
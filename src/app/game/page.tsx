'use client'

import styles from "./game.module.scss";
import { useEffect } from "react";
import { getGame } from "@/lib/game-service";
import type { Game } from "@/lib/model";
import { useState } from "react";
import QuestionDisplay from "./question-display/page";

function Title({ game, timer }: { game: Game | null, timer: number }) {
  return <div className="title">
    <img className="logo" src="/wwbam.png" alt="wwbam" />
    <div className="title-text">
      Who wants to be a <span className="bible">Bible</span> Millionaire?
    </div>
    <div className="name-level">
      <p>{game?.playerName}</p>
      <p>Level {game?.gameLevel}</p>
    </div>
    <div className="timer">
      <p>{timer}</p>
    </div>
  </div>
}

export default function Game() {
  const [gameState, setGameState] = useState<Game | null>(null);
  const [timer, setTimer] = useState(60);
  let timerValue = 60;
  let timeoutId: number | null = null;

  function initQuestion(gs: Game) {
    console.log('initQuestion', timeoutId);
    if (timeoutId) {
      console.log('clearing timeout', timeoutId);
      window.clearTimeout(timeoutId);
    }
    timeoutId = null;
    setGameState(gs);
    timerValue = 60;
    setTimer(timerValue);

    function tick() {
      timerValue --;
      setTimer(timerValue);
      console.log('tick', timerValue);
      if (timerValue > 0) {
        timeoutId = window.setTimeout(tick, 1000);
        console.log('setting timeout', timeoutId);
      }
    }
    timeoutId = window.setTimeout(tick, 1000);
    console.log('setting timeout', timeoutId);
  }

  useEffect(() => {
    console.log('useEffect');
    initQuestion(getGame()!);
  }, []);

  if (!gameState) {
    return <div className={styles.game}>
      <p>Loading...</p>
    </div>
  }

  return <div className={styles.game}>
    <Title game={gameState} timer={timer} />
    <QuestionDisplay game={gameState} callback={(correct) => {
      console.log(correct);
      if (correct) {
        let newGameState = JSON.parse(JSON.stringify(gameState));
        newGameState.gameLevel++;
        initQuestion(newGameState);
      }
    }} />
  </div>;
}

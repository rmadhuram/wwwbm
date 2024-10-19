'use client'

import styles from "./game.module.scss";
import { useEffect } from "react";
import { getGame } from "@/lib/client/game-service";
import type { Game } from "@/lib/model";
import { useState } from "react";
import QuestionDisplay from "./question-display/page";

let timeoutId: number | null = null;

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
      <p>{timer < 10 ? '0' + timer : timer}</p>
    </div>
  </div>
}

export default function Game() {
  const [gameState, setGameState] = useState<Game | null>(null);
  const [timer, setTimer] = useState(60);
  let timerValue = 60;

  function initQuestion(gs: Game) {
    console.log('initQuestion', timeoutId);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
    setGameState(gs);
    timerValue = 60;
    setTimer(timerValue);

    function tick() {
      timerValue --;
      setTimer(timerValue);
      if (timerValue > 0) {
        timeoutId = window.setTimeout(tick, 1000);
      }
    }
    timeoutId = window.setTimeout(tick, 1000);
  }

  useEffect(() => {
    initQuestion(getGame()!);
    return () => {
      // component unmounting
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    }
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

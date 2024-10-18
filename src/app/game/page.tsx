'use client'

import styles from "./game.module.scss";
import { useEffect } from "react";
import { getGame } from "@/lib/game-service";
import type { Game } from "@/lib/model";
import { useState } from "react";
import QuestionDisplay from "./question-display/page";
function Title({ game }: { game: Game | null }) {
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
      <p>27</p>
    </div>
  </div>
}

export default function Game() {
  const [gameState, setGameState] = useState<Game | null>(null);
  useEffect(() => {
    setGameState(getGame());
  }, []);

  if (!gameState) {
    return <div className={styles.game}>
      <p>Loading...</p>
    </div>
  }

  return <div className={styles.game}>
    <Title game={gameState} />
    <QuestionDisplay game={gameState} callback={(correct) => {
      console.log(correct);
      if (correct) {
        let newGameState = JSON.parse(JSON.stringify(gameState));
        newGameState.gameLevel++;
        setGameState(newGameState);
      }
    }} />
  </div>;
}

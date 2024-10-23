"use client";
import styles from "./fact.module.scss";
import { GameState, AnswerState } from "@/lib/model";

export default function Fact({ gameState, nextCallback, answerState }: { gameState: GameState, nextCallback: () => void, answerState: AnswerState }) {

  return (
    <div className={styles["fact"]}>
      <div className={`fact-container ${answerState}`}>  
        <div className="reference">
          {gameState.questions[gameState.gameLevel - 1].reference}
        </div>
        <div className="fact-text">
          {gameState.questions[gameState.gameLevel - 1].fact}
        </div>
        <button onClick={nextCallback}>Next</button>
      </div>
    </div>
  );
}

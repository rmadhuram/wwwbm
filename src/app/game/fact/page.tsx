"use client";
import styles from "./fact.module.scss";
import { GameState, AnswerState } from "@/lib/model";

export default function Fact({ gameState, nextCallback, answerState }: { gameState: GameState, nextCallback: () => void, answerState: AnswerState }) {

  return (
    <div className={styles["fact"]}>
      <p>answer: {answerState}</p>
      <p>{gameState.questions[gameState.gameLevel - 1].question}</p>
      <button onClick={nextCallback}>Next</button>
    </div>
  );
}

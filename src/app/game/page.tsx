"use client";

import styles from "./game.module.scss";
import { useEffect } from "react";
import { getGame, promoteNextLevel } from "@/lib/client/game-service";
import { GameState, AnswerState } from "@/lib/model";
import { useState } from "react";
import QuestionDisplay from "./question-display/page";
import { useRouter } from "next/navigation";
import { playAudio, AUDIO_BG, stopAudio } from "@/lib/client/audio-service";
import Fact from "./fact/page";

let timeoutId: number | null = null;
let timerValue = 60;
let startTime: number = 0;

function Title({ game, timer }: { game: GameState | null; timer: number }) {
  return (
    <div className="title">
      <img className="logo" src="/wwbam.png" alt="wwbam" />
      <div className="title-text">
        Who wants to be a <span className="bible">Bible</span> Millionaire?
      </div>
      <div className="name-level">
        <p>{game?.playerName}</p>
        <p>Level {game?.gameLevel}</p>
      </div>
      <div className="timer">
        <p>{timer < 10 ? "0" + timer : timer}</p>
      </div>
    </div>
  );
}
let newGameState: GameState | null = null;

export default function Game() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [timer, setTimer] = useState(60);
  const [showingFact, setShowingFact] = useState(false);
  const [answerState, setAnswerState] = useState<AnswerState>(null); 
  const router = useRouter();
  /**
   * Initialize the question and start the timer
   */
  function initQuestion(gs: GameState) {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
    setGameState(gs);
    timerValue = 60;
    startTime = Date.now();
    setTimer(timerValue);
    playAudio(AUDIO_BG);  

    function tick() {
      timerValue--;
      setTimer(timerValue);
      if (timerValue > 0) {
        timeoutId = window.setTimeout(tick, 1000);
      } else {
        stopAudio();
        setAnswerState('timeout');
        setShowingFact(true);
      }
    }
    timeoutId = window.setTimeout(tick, 1000);
  }

  // this is called after a few seconds when the user has answered the question
  // we move on to the next question
  function handleQuestionAnswer(correct: boolean) {
    stopAudio();
    setAnswerState(correct ? 'correct' : 'wrong');
    setShowingFact(true);
  }

  function handleFactNext() {
    console.log('answer state', answerState);
  
    if (answerState === 'wrong' || answerState === 'timeout' || gameState?.gameLevel === 5) {
      // we don't move on to the next question
      router.push('/thank-you');
      return;
    }

    setShowingFact(false);
    if (newGameState) {
      initQuestion(newGameState);
    }
  }

  // this is called immediately when the question is answered
  // we prepare the next game state and keep it ready for the next question
  function stopTimerCallback(correct: boolean) {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }

    if (correct && gameState) {
      gameState.maxCompletedLevel++;
      let timeTaken = Date.now() - startTime;
      newGameState = promoteNextLevel(60 - timerValue, timeTaken);
    }
  }

  useEffect(() => {
    initQuestion(getGame()!);
    return () => {
      // component unmounting
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      stopAudio();
    };
  }, []);

  if (!gameState) {
    return (
      <div className={styles.game}>
        <p>Loading...</p>
      </div>
    );
  }

  if (showingFact) {
    return (
      <div className={styles.game}>
        <Fact gameState={gameState} answerState={answerState} nextCallback={handleFactNext}  />
      </div>
    );
  }

  return (
    <div className={styles.game}>
      <Title game={gameState} timer={timer} />
      <QuestionDisplay
        timer={timer}
        game={gameState}
        callback={handleQuestionAnswer}
        stopTimerCallback={stopTimerCallback}
      />
    </div>
  );
}

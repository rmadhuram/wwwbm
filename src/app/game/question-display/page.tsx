import styles from "./question-display.module.scss";
import { GameState } from "../../../lib/model";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  playAudio,
  AUDIO_CORRECT,
  AUDIO_WRONG,
} from "@/lib/client/audio-service";

/**
 * QuestionDisplay component
 * @param timer - the timer
 * @param game - the game state
 * @param callback - the callback function to call after playing the audio for selection.
 * @param stopTimerCallback - the callback function to call when the answer is selected
 * @returns
 */
export default function QuestionDisplay({
  timer,
  game,
  callback,
  stopTimerCallback,
}: {
  timer: number;
  game: GameState;
  callback: (correct: boolean) => void;
  stopTimerCallback: (correct: boolean) => void;
}) {
  let currentQuestion = game.questions[game.gameLevel - 1];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  // this is to prevent the user from selecting another option after the answer is locked
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();

  const handleAnswer = (index: number) => {
    if (isLocked) {
      return;
    }
    const isCorrect = index == currentQuestion.correct;

    stopTimerCallback(isCorrect);
    setSelectedAnswer(index);
    setCorrectAnswer(currentQuestion.correct);
    playAudio(isCorrect ? AUDIO_CORRECT : AUDIO_WRONG);

    if (isCorrect && game.gameLevel === 5) {
      game.maxCompletedLevel = game.gameLevel;
    }

    setIsLocked(true);
    setTimeout(() => {
      setIsLocked(false);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      callback(isCorrect);
    }, 4000);
  };

  const assignClassName = (index: number) => {
    if (selectedAnswer === index) {
      return index === currentQuestion.correct ? "correct" : "incorrect";
    }
    if (correctAnswer !== null && index === correctAnswer) {
      return "correct";
    }
    return "default";
  };

  return (
    <div className={styles["question-display"]}>
      <div className="question">
        <p>{currentQuestion.question}</p>
      </div>
      <div className="answers">
        {currentQuestion.options.map((option, index) => (
          <div
            className={`answer ${assignClassName(index)}`}
            key={index}
            onClick={() => handleAnswer(index)}
          >
            <p>
              {String.fromCharCode(65 + index)}: {option}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

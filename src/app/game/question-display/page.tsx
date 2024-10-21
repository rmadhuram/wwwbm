import styles from "./question-display.module.scss";
import { Game } from "../../../lib/model";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { playAudio, AUDIO_CORRECT, AUDIO_WRONG } from "@/lib/client/audio-service";
export default function QuestionDisplay({
  timer,
  game,
  callback,
  stopTimerCallback,
}: {
  timer: number;
  game: Game;
  callback: (correct: boolean) => void;
  stopTimerCallback: (correct: boolean) => void;
}) {
  let currentQuestion = game.questions[game.gameLevel - 1];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  // this is to prevent the user from selecting another option after the answer is locked
  const [isLocked, setIsLocked] = useState(false);

  const router = useRouter();

  const name = game.playerName;
  const completedLevels = game.maxCompletedLevel;
  const time = game.totalHighResTime / 1000;
  const level = game.playerLevel;

  if (timer === 0) {
    router.push(
      `/thank-you?name=${name}&completedLevels=${completedLevels}&time=${time}&level=${level}`
    );
  }

  const handleAnswer = (index: number) => {
    if (isLocked) {
      return;
    }
    const isCorrect = index == currentQuestion.correct;

    stopTimerCallback(isCorrect);
    setSelectedAnswer(index);
    setCorrectAnswer(currentQuestion.correct);

    if (isCorrect) {
      playAudio(AUDIO_CORRECT);
    } else {
      playAudio(AUDIO_WRONG);
    }

    setIsLocked(true);
    setTimeout(() => {
      setIsLocked(false);
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      if (game.gameLevel < 5) {
        // if the level is less than 5, we need to call the callback to advance to the next level
        callback(isCorrect);
      }

      if (isCorrect && game.gameLevel === 5) {
        game.maxCompletedLevel = game.gameLevel;
      }

      if (!isCorrect || game.gameLevel === 5) {
        router.push(
          `/thank-you?name=${name}&completedLevels=${completedLevels}&time=${time}&level=${level}`
        );
      }
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

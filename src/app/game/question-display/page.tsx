import styles from "./question-display.module.scss";
import { Game } from "../../../lib/model";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionDisplay({
  timer,
  game,
  callback,
}: {
  timer: number;
  game: Game;
  callback: (correct: boolean) => void;
}) {
  let currentQuestion = game.questions[game.gameLevel - 1];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const router = useRouter();

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setCorrectAnswer(currentQuestion.correct);

    const isCorrect = index == currentQuestion.correct;

    const name = game.playerName;
    const score = game.maxCompletedLevel;
    const time = game.totalHighResTime;
    const level = game.playerLevel;

    if (!isCorrect || game.gameLevel === 5 || timer === 0) {
      router.push(
        `/thank-you?name=${name}&score=${score}&time=${time}&level=${level}`
      );
    } else {
      setTimeout(() => {
        setSelectedAnswer(null);
        setCorrectAnswer(null);
        callback(isCorrect);
      }, 2000);
    }
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

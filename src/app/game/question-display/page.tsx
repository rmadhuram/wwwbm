import styles from "./question-display.module.scss";
import { Game } from "../../../lib/model";
import { useState } from "react";

export default function QuestionDisplay({
  game,
  callback,
}: {
  game: Game;
  callback: (correct: boolean) => void;
}) {
  let currentQuestion = game.questions[game.gameLevel - 1];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    console.log(index);
    setSelectedAnswer(index);
    const isCorrect = index == currentQuestion.correct;

    setCorrectAnswer(currentQuestion.correct);

    setTimeout(() => {
      setSelectedAnswer(null);
      setCorrectAnswer(null);
      callback(isCorrect);
    }, 2000);
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

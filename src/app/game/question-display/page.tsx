import styles from "./question-display.module.scss";
import { Game } from "../../../lib/model";

export default function QuestionDisplay({
  game,
  callback,
}: {
  game: Game;
  callback: (correct: boolean) => void;
}) {
  let currentQuestion = game.questions[game.gameLevel - 1];

  const handleAnswer = (index: number) => {
    console.log(index);
    callback(index == currentQuestion.correct);
  }

  return <div className={styles['question-display']}>
    <div className="question">
      <p>{currentQuestion.question}</p>
    </div>
    <div className="answers">
      {currentQuestion.answers.map((answer, index) => (
        <div className="answer" key={index} onClick={() => handleAnswer(index)}>
          <p>{String.fromCharCode(65 + index)}: {answer}</p>
        </div>
      ))} 
    </div>
  </div>
}

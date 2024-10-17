import styles from "./game.module.scss";

export default function Game() {
  return <div className={styles.game}>
    <div className="title">
      <img className="logo" src="/wwbam.png" alt="wwbam" />
      <div className="title-text">
        Who wants to be a <span className="bible">Bible</span> Millionaire?
      </div>
      <div className="name-level">
        <p>JOHN DOE</p>
        <p>Level 4</p>
      </div>
      <div className="timer">
        <p>27</p>
      </div>
    </div>
    <div className="question">
      <p>What gift did the wise men NOT bring to baby Jesus?</p>
    </div>
    <div className="answers">
      <div className="answer">
        <p>A. Gold</p>
      </div>
      <div className="answer">
        <p>B. Myrrh</p>
      </div>
      <div className="answer">
        <p>C. Frankincense</p>
      </div>
      <div className="answer">
        <p>D. Silver</p>
      </div>
    </div>
  </div>;
}

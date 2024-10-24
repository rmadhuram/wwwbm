"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { QuestionBase } from "@/lib/model";
import { setQuestions } from "@/lib/client/question-service";

export default function Init() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questionBase, setQuestionBase] = useState<QuestionBase>();

  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        let data = await fetch("/api/init");
        console.log(data);
        if (data.ok) {
          let questions: QuestionBase = await data.json();
          setQuestions(questions);
          setQuestionBase(questions);
        } else {
          console.error("Failed to initialize");
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  function goToHome() {
    router.push("/home");
  }

  return (
    <div className={styles.init}>
      <h1>Who wants to be a Bible Millionaire?</h1>
      {error ? (
        <h3 className="error">Failed to initialize</h3>
      ) : loading ? (
        <h3>Initializing...</h3>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Level 1</th>
                <th>Level 2</th>
                <th>Level 3</th>
                <th>Level 4</th>
                <th>Level 5</th>
                <th>Total</th>
              </tr>   
            </thead>
            <tbody>
              <tr>
                <td>Kids</td>
                {Array.from({ length: 5 }, (_, i) => (
                  <td key={i}>{questionBase?.kidsQuestions[i].length}</td>
                ))}
                <td>{questionBase?.kidsQuestions.reduce((acc, curr) => acc + curr.length, 0)}</td>
              </tr>
              <tr>
                <td>Adults</td>
                {Array.from({ length: 5 }, (_, i) => (
                  <td key={i}>{questionBase?.adultQuestions[i].length}</td>
                ))}
                <td>{questionBase?.adultQuestions.reduce((acc, curr) => acc + curr.length, 0)}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={goToHome}>Start</button>
        </>
      )}
    </div>
  );
}

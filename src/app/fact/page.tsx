"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./fact.module.scss";

export default function Fact() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isCorrect = searchParams.get("correct");
  const image = searchParams.get("image");

  function handleNext() {
    if (isCorrect === "true") {
      router.push("/game");
    } else {
      console.log(isCorrect);
      router.push("/thank-you");
    }
  }
  return (
    <div className={styles["fact"]}>
      <button onClick={handleNext}>Next</button>
      <img src={image as string} alt="fact page" />
    </div>
  );
}

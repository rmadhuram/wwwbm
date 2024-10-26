"use client";
import { useRouter } from "next/navigation";
import styles from "./rules.module.scss";

export default function Rules() {
  const router = useRouter();

  function handlePlay() {
    router.push("/game");
  }
  return (
    <div className={styles["rules"]}>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
}

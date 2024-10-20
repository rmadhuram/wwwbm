"use client";

import { useSearchParams } from "next/navigation";
import styles from "./thank-you.module.scss";
import { useEffect } from "react";

export default function ThankYou() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const score = searchParams.get("score");
  const time = searchParams.get("time");
  const level = searchParams.get("level");

  useEffect(() => {
    updateLeaderBoard();
  });

  const updateLeaderBoard = async () => {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, score, time, level }),
    });
  };

  return (
    <div className={styles["thank-you"]}>
      <h1>Thank you</h1>
      <h3>Your score will be emailed to you shortly</h3>
    </div>
  );
}

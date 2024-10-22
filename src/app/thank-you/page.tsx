"use client";

import styles from "./thank-you.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { addToLeaderBoard, getGame } from "@/lib/client/game-service";
import { LeaderBoards } from "@/lib/model";

export default function ThankYou() {
  const router = useRouter();

  useEffect(() => {
    updateLeaderBoard();
    setTimeout(() => {
      router.push("/home");
    }, 3000);
  }, []);

  const updateLeaderBoard = async () => {
    const response = await fetch("/api/leaderboard");
    if (!response.ok) {
      throw new Error(`Error : ${response.status}`);
    }

    const leaderboards: LeaderBoards = await response.json();

    const game = getGame();
    if (!game) return;

    addToLeaderBoard(leaderboards, game);

    console.log("game", game);
    if (game.maxCompletedLevel === 0) {
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    } else {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(leaderboards),
      });
    }
  };

  return (
    <div className={styles["thank-you"]}>
      <h1>Thank you</h1>
      <h3>Your score will be emailed to you shortly</h3>
    </div>
  );
}

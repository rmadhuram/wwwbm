"use client";

import styles from "./thank-you.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { addToLeaderBoard, getGame } from "@/lib/client/game-service";
import { LeaderBoards } from "@/lib/model";

export default function ThankYou() {
  const router = useRouter();
  const game = getGame();

  const updateLeaderBoard = async () => {
    const response = await fetch("/api/leaderboard");
    if (!response.ok) {
      throw new Error(`Error : ${response.status}`);
    }

    const leaderboards: LeaderBoards = await response.json();
    if (game) {
      addToLeaderBoard(leaderboards, game);

      // write to file.
      if (game.maxCompletedLevel > 0) {
        const response = await fetch("/api/leaderboard", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(leaderboards),
        });
      }
    }
  };

  useEffect(() => {
    updateLeaderBoard();
  }, []);

  function formatTime(time: number) {
    return Math.round(time / 100) / 10;
  } 

  return (
    <div className={styles["thank-you"]}>
      <h1>Thank you</h1>
      <h3>{game?.playerName}</h3>
      <table>
        <tbody>
          <tr>
            <td>Levels cleared</td>
            <td className="value">{game?.maxCompletedLevel}</td>
          </tr>
          <tr>
            <td>Time taken</td>
            <td className="value">{formatTime(game?.totalHighResTime ?? 0)} seconds</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => router.push("/home")}>Finish</button>
    </div>
  );
}

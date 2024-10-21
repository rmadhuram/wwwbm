"use client";

import styles from "./home.module.scss";
import { useRouter } from "next/navigation";
import { addToLeaderBoard, startGame } from "@/lib/client/game-service";
import { useState, useEffect } from "react";
import { Game, LeaderBoardEntry, LeaderBoards } from "@/lib/model";
import { playAudio, stopAudio, AUDIO_MAIN } from "@/lib/client/audio-service";

interface LeaderboardProps {
  title: string;
  leaderboard: LeaderBoardEntry[];
}

function Leaderboard({ title, leaderboard }: LeaderboardProps) {
  function formatTime(time: number) {
    return Math.round(time / 100) / 10;
  } 

  function getMedal(index: number) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-title">{title}</div>
      <table>
        <thead>
          <tr>
            <th className="rank">Rank</th>
            <th className="name">Name</th>
            <th className="num-correct">Levels</th>
            <th className="total-seconds">Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <tr key={index}>
              <td className="rank"><span className="medal">{getMedal(index)}</span> <span className="rank-number">{index > 2 ? index + 1 : ""}</span></td>
              <td className="name">{item.name}</td>
              <td className="num-correct">
                {item.completedLevels === 0
                  ? 0
                  : Number(item.completedLevels)}
              </td>
              <td className="total-seconds">{formatTime(item.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [leaderboard, setLeaderBoard] = useState<LeaderBoards | null>(null);

  const fetchLeaderBoard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const fetchedLeaderBoard: LeaderBoards = await response.json();
      setLeaderBoard(fetchedLeaderBoard);

      /*

      addToLeaderBoard(fetchedLeaderBoard, {
        id: "1",
        playerName: "test",
        playerLevel: "kid",
        questions: [],
        gameLevel: 1,
        maxCompletedLevel: 1,
        totalTime: 0,
        totalHighResTime: 7.281,
      });

      addToLeaderBoard(fetchedLeaderBoard, {
        id: "1",
        playerName: "test",
        playerLevel: "kid",
        questions: [],
        gameLevel: 1,
        maxCompletedLevel: 3,
        totalTime: 0,
        totalHighResTime: 19.281,
      });


      addToLeaderBoard(fetchedLeaderBoard, {
        id: "1",
        playerName: "test",
        playerLevel: "kid",
        questions: [],
        gameLevel: 1,
        maxCompletedLevel: 1,
        totalTime: 0,
        totalHighResTime: 21.98,
      });
      console.log("fetchedLeaderBoard", fetchedLeaderBoard);
      */

    } catch (error) {
      console.log("Error fetching the leaderboard:", error);
    }
  };

  useEffect(() => {
    playAudio(AUDIO_MAIN);
    fetchLeaderBoard();

    return () => {
      stopAudio();
    }
  }, []);

  function start() {
    // Initialize game
    startGame(name, type as "kid" | "adult");
    router.push("/game");
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setType(e.target.value);
  }

  return (
    <div className={styles.home}>
      <div className="title">
        <img className="logo" src="/wwbam.png" alt="wwbam" />
        <div className="title-text">
          Who wants to be a <span className="bible">Bible</span> Millionaire?
        </div>
      </div>
      <div className="title-1">
        <p>CCI 2024 - LEADER BOARD</p>
      </div>
      <div className="leaderboard-container">
        <div className="kids-leaderboard">
          <Leaderboard title="KIDS" leaderboard={leaderboard?.kid || []} />
        </div>
        <div className="adults-leaderboard">
          <Leaderboard title="ADULTS" leaderboard={leaderboard?.adult || []} />
        </div>
      </div>
      <div className="start-game-container">
        <p className="start-game-text">
          Test your Bible Knowledge! Win exciting prizes!
        </p>
        <input type="text" placeholder="Name" onChange={handleNameChange} />
        <div className="level-select">
          <div className="level-select-item">
            <input
              type="radio"
              id="kid"
              name="level"
              value="kid"
              onChange={handleTypeChange}
            />
            <label htmlFor="kid">Child</label>
          </div>
          <div className="level-select-item">
            <input
              type="radio"
              id="adult"
              name="level"
              value="adult"
              onChange={handleTypeChange}
            />
            <label htmlFor="adult">Adult</label>
          </div>
        </div>
        <button onClick={start} disabled={!name || !type}>
          Start Game
        </button>
      </div>
    </div>
  );
}

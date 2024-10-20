"use client";

import styles from "./home.module.scss";
import { useRouter } from "next/navigation";
import { startGame } from "@/lib/client/game-service";
import { useState } from "react";
import { useEffect } from "react";

interface LeaderboardProps {
  title: string;
  leaderboard: {
    name: string;
    numCorrect: number;
    totalSeconds: number;
  }[];
}

function Leaderboard({ title, leaderboard }: LeaderboardProps) {
  return (
    <div className="leaderboard">
      <div className="leaderboard-title">{title}</div>
      <table>
        <thead>
          <tr>
            <th className="rank">Rank</th>
            <th>Name</th>
            <th className="num-correct">Levels</th>
            <th className="total-seconds">Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <tr key={index}>
              <td className="rank">{index + 1}</td>
              <td className="name">{item.name}</td>
              <td className="num-correct">{item.numCorrect}</td>
              <td className="total-seconds">{item.totalSeconds}</td>
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
  const [leaderboard, setLeaderBoard] = useState<{
    kids: LeaderboardProps;
    adults: LeaderboardProps;
  } | null>(null);

  function start() {
    // initialize game
    startGame(name, type as "kid" | "adult");
    router.push("/game");
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setType(e.target.value);
  }

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  const fetchLeaderBoard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const fetchedLeaderBoard = await response.json();

      const kidsLeaderboard: LeaderboardProps = {
        title: "KIDS",
        leaderboard: fetchedLeaderBoard.kid.map((entry: any) => ({
          name: entry.name,
          numCorrect: entry.score,
          totalSeconds: entry.time,
        })),
      };

      const adultsLeaderboard: LeaderboardProps = {
        title: "ADULTS",
        leaderboard: fetchedLeaderBoard.adult.map((entry: any) => ({
          name: entry.name,
          numCorrect: entry.score,
          totalSeconds: entry.time,
        })),
      };

      setLeaderBoard({ kids: kidsLeaderboard, adults: adultsLeaderboard });
    } catch (error) {
      console.log("Error fetching the leader: error");
    }
  };

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
          <Leaderboard
            title={leaderboard?.kids.title || "KIDS"}
            leaderboard={leaderboard?.kids.leaderboard || []}
          />
        </div>
        <div className="adults-leaderboard">
          <Leaderboard
            title={leaderboard?.adults.title || "ADULTS"}
            leaderboard={leaderboard?.adults.leaderboard || []}
          />
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

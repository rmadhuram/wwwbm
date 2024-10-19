"use client";

import styles from "./home.module.scss";
import { useRouter } from "next/navigation";
import { startGame } from "@/lib/client/game-service";
import { useState } from "react";

interface LeaderboardProps {
  title: string;
  leaderboard: {
    name: string;
    numCorrect: number;
    totalSeconds: number;
  }[];
}

const kidsLeaderboard: LeaderboardProps = {
  title: "KIDS",
  leaderboard: [
    { name: "John Doe", numCorrect: 5, totalSeconds: 257 },
    { name: "Jane Doe", numCorrect: 5, totalSeconds: 276 },
    { name: "John Smith", numCorrect: 4, totalSeconds: 213 },
    { name: "John Doe", numCorrect: 3, totalSeconds: 110 },
    { name: "Jane Doe", numCorrect: 2, totalSeconds: 30 },
  ],
};

const adultsLeaderboard: LeaderboardProps = {
  title: "ADULTS",
  leaderboard: [
    { name: "John Doe", numCorrect: 5, totalSeconds: 201 },
    { name: "Jane Doe", numCorrect: 5, totalSeconds: 248 },
    { name: "John Smith", numCorrect: 5, totalSeconds: 290 },
    { name: "John Doe", numCorrect: 4, totalSeconds: 170 },
    { name: "Jane Doe", numCorrect: 3, totalSeconds: 35 },
  ],
};

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
  const [type, setType] = useState("kid");

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
            title={kidsLeaderboard.title}
            leaderboard={kidsLeaderboard.leaderboard}
          />
        </div>
        <div className="adults-leaderboard">
          <Leaderboard
            title={adultsLeaderboard.title}
            leaderboard={adultsLeaderboard.leaderboard}
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
        <button onClick={start} disabled={!name || !type} >
          Start Game
        </button>
      </div>
    </div>
  );
}

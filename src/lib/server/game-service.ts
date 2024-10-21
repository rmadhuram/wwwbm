import path from "path";
import fs from "fs";
import { INITIAL_LEADERBOARD, LeaderBoards } from "@/lib/model";

const leaderboardPath = path.join(process.cwd(), "data", "leaderboard.json");

export function fetchLeaderBoard(): LeaderBoards {
  try {
    const data = fs.readFileSync(leaderboardPath, "utf-8");
    return JSON.parse(data) as LeaderBoards;
  } catch (error) {
    return INITIAL_LEADERBOARD;
  }
}

export function saveLeaderBoard(leaderboard: LeaderBoards) {
  fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2));
}

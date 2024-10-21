import path from "path";
import fs from "fs";
import { Game, INITIAL_LEADERBOARD, LeaderBoards } from "@/lib/model";

const leaderboardPath = path.join(process.cwd(), "data", "leaderboard.json");

export function fetchLeaderBoards(): LeaderBoards {
  try {
    const data = fs.readFileSync(leaderboardPath, "utf-8");
    return JSON.parse(data) as LeaderBoards;
  } catch (error) {
    return INITIAL_LEADERBOARD;
  }
}

export function saveLeaderBoards(leaderboard: LeaderBoards) {
  fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2));
}

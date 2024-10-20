import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { INITIAL_LEADERBOARD, LeaderBoards } from "@/lib/model";

const leaderboardPath = path.join(process.cwd(), "data", "leaderboard.json");
console.log(leaderboardPath);

function fetchLeaderBoard(): LeaderBoards {
  try {
    const data = fs.readFileSync(leaderboardPath, "utf-8");
    return JSON.parse(data) as LeaderBoards;
  } catch (error) {
    return INITIAL_LEADERBOARD;
  }
}

function saveLeaderBoard(leaderboard: LeaderBoards) {
  console.log("in save");
  fs.writeFileSync(leaderboardPath, JSON.stringify(leaderboard, null, 2));
}

export async function GET(request: Request) {
  try {
    const leaderboard = fetchLeaderBoard();
    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.log("Error updating: ", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const { name, score, time, level } = await request.json();

  const leaderboard = fetchLeaderBoard();

  if (!(level in leaderboard)) {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const updatedLeaderboard = {
    ...leaderboard,
    [level]: [
      { name, score, time },
      ...leaderboard[level as keyof LeaderBoards].slice(0, 4),
    ].sort((a, b) => b.score - a.score || a.time - b.time),
  };

  saveLeaderBoard(updatedLeaderboard);
  return NextResponse.json(leaderboard, { status: 200 });
}

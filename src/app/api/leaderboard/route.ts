import { NextResponse } from "next/server";
import { LeaderBoards } from "@/lib/model";
import { fetchLeaderBoards, saveLeaderBoards } from "@/lib/server/game-service";

export async function GET(request: Request) {
  try {
    const leaderboard = fetchLeaderBoards();
    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.log("Error updating: ", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const leaderboards = await request.json();
  saveLeaderBoards(leaderboards);
  return NextResponse.json(leaderboards, { status: 200 });
}

/*
export async function POST1(request: Request) {
  const { name, completedLevels, time, level } = await request.json();

  const leaderboard = fetchLeaderBoards();
  console.log(typeof leaderboard, typeof level);

  if (!(level in leaderboard)) {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const updatedLeaderboard = {
    ...leaderboard,
    [level]: [
      { name, completedLevels, time },
      ...leaderboard[level as keyof LeaderBoards].slice(0, 4),
    ].sort((a, b) => b.completedLevels - a.completedLevels || a.time - b.time), //Highest Score and Lowest time incase of tie
  };

  saveLeaderBoard(updatedLeaderboard);
  return NextResponse.json(leaderboard, { status: 200 });
}

*/
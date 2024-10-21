import { NextResponse } from "next/server";
import { LeaderBoards } from "@/lib/model";
import { fetchLeaderBoard, saveLeaderBoard } from "@/lib/server/game-service";

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
  const { name, completedLevels, time, level } = await request.json();

  const leaderboard = fetchLeaderBoard();
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

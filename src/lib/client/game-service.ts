import { GameState, LeaderBoards } from "../model";
import { v4 as uuidv4 } from "uuid";
import { getQuestions } from "./question-service";

let currentGame: GameState | null = null;

export function startGame(name: string, type: "kid" | "adult") {
  const questions = getQuestions(type);
  const game: GameState = {
    id: uuidv4(),
    playerName: name,
    playerLevel: type,
    questions: questions,
    gameLevel: 1,
    maxCompletedLevel: 0,
    totalHighResTime: 0,
  };

  currentGame = game;
}

/**
 * Clone the current game and promote to the next level
 */
export function promoteNextLevel(timeTaken: number, highResTime: number): GameState {
  if (!currentGame) {
    throw new Error("No game started");
  }
  const game = JSON.parse(JSON.stringify(currentGame));
  game.gameLevel++;
  game.totalTime += timeTaken;
  game.totalHighResTime += highResTime;
  currentGame = game;
  return game;
}

export function getGame() {
  return currentGame;
}

export function endGame() {
  currentGame = null;
}

/**
 * Add to leaderboard in-place.
 * @param leaderboards 
 * @param gameState 
 */
export function addToLeaderBoard(leaderboards: LeaderBoards, gameState: GameState) {
  let leaderBoard = leaderboards[gameState.playerLevel];
  leaderBoard.push({
    name: gameState.playerName,
    completedLevels: gameState.maxCompletedLevel,
    time: gameState.totalHighResTime,
  });

  leaderBoard.sort((a, b) => {
    if (a.name === "---") return 1;
    if (b.name === "---") return -1;

    if (a.completedLevels > b.completedLevels) return -1;
    if (a.completedLevels < b.completedLevels) return 1;

    return a.time - b.time;
  });

  leaderboards[gameState.playerLevel] = leaderBoard.slice(0, 5);
}

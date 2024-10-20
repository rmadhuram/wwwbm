import { Game } from "../model";
import { v4 as uuidv4 } from "uuid";
import { getQuestions } from "./question-service";

let currentGame: Game | null = null;

export function startGame(name: string, type: "kid" | "adult") {
  const questions = getQuestions(type);
  const game: Game = {
    id: uuidv4(),
    playerName: name,
    playerLevel: type,
    questions: questions,
    gameLevel: 1,
    maxCompletedLevel: 0,
    totalTime: 0,
    totalHighResTime: 0,
  };

  currentGame = game;
}

/**
 * Clone the current game and promote to the next level
 */
export function promoteNextLevel(timeTaken: number, highResTime: number): Game {
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

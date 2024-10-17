import { Game } from "./model";
import { v4 as uuidv4 } from 'uuid';

let currentGame: Game | null = null;

export function startGame(name: string, type: 'kid' | 'adult') {
  const game: Game = {
    id: uuidv4(),
    playerName: name,
    playerLevel: type,
    questions: [],
    gameLevel: 0,
    maxCompletedLevel: 0,
    totalTime: 0,
  }

  currentGame = game;
}

export function getGame() {
  return currentGame;
}

export function endGame() {
  currentGame = null;
}


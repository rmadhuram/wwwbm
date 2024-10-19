import { Game } from "../model";
import { v4 as uuidv4 } from 'uuid';
import { getQuestions } from './question-service';

let currentGame: Game | null = null;

export function startGame(name: string, type: 'kid' | 'adult') {
  const questions = getQuestions(type);
  const game: Game = {
    id: uuidv4(),
    playerName: name,
    playerLevel: type,
    questions: questions,
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


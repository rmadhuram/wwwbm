export type Question = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  reference?: string;
  fact?: string;
}

export type Game = {
  id: string;
  playerName: string;
  playerLevel: 'kid' | 'adult';
  gameLevel: number;
  questions: Question[];
  maxCompletedLevel: number;
  totalTime: number;
  totalHighResTime: number;
}

export type QuestionBase = {
  kidsQuestions: Question[][];
  adultQuestions: Question[][];
}

export type LeaderBoardEntry = {
  name: string;
  score: number;
  time: number; // high res time in ms
}

export type LeaderBoard = LeaderBoardEntry[];

export type LeaderBoards = {
  kid: LeaderBoard;
  adult: LeaderBoard;
}


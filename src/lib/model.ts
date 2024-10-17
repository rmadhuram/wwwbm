export type Question = {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export type Game = {
  id: string;
  playerName: string;
  playerLevel: 'kid' | 'adult';
  gameLevel: number;
  questions: Question[];
  maxCompletedLevel: number;
  totalTime: number;
}


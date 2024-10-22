export type Question = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  reference?: string;
  fact?: string;
};

export type GameState = {
  id: string;
  playerName: string;
  playerLevel: "kid" | "adult";
  gameLevel: number;
  questions: Question[];
  maxCompletedLevel: number;
  totalHighResTime: number;
};

export type QuestionBase = {
  kidsQuestions: Question[][];
  adultQuestions: Question[][];
};

export type LeaderBoardEntry = {
  name: string;
  completedLevels: number;
  time: number; // high res time in ms
  level?: "kid" | "adult";
};

export type LeaderBoards = {
  kid: LeaderBoardEntry[];
  adult: LeaderBoardEntry[];
};

export const INITIAL_LEADERBOARD: LeaderBoards = {
  kid: [
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
  ],
  adult: [
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
    { name: "---", completedLevels: 0, time: 0 },
  ],
};

export type AnswerState = 'correct' | 'wrong' | 'timeout' | null;

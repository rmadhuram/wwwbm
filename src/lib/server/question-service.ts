import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { QuestionBase } from '../model';

dotenv.config();

const dataDir = process.env.DATA_DIR || './data';

async function loadQuestions(fileName: string) {
  const filePath = path.join(dataDir, fileName);
  console.log(`Loading questions from ${filePath}`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}


// Generic Fisher-Yates Shuffle Function
function fisherYatesShuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Function to sort questions by level
function sortQuestionsByLevel(questions: QuestionBase): QuestionBase {
  // Sort kids' questions by levels
  if (questions.kidsQuestions && questions.kidsQuestions.length) {
    questions.kidsQuestions = questions.kidsQuestions.map(levelQuestions => {
      return levelQuestions.sort((a, b) => a.level - b.level); 
    });
  }

  // Sort adult questions by levels
  if (questions.adultQuestions && questions.adultQuestions.length) {
    questions.adultQuestions = questions.adultQuestions.map(levelQuestions => {
      return levelQuestions.sort((a, b) => a.level - b.level); 
    });
  }

  return questions;
}

function shuffleQuestions(questions: QuestionBase): QuestionBase {
  // Shuffle kids' questions
  if (questions.kidsQuestions && questions.kidsQuestions.length) {
    questions.kidsQuestions = questions.kidsQuestions.map(levelQuestions => {
      return fisherYatesShuffle(levelQuestions);
    });
  }

  // Shuffle adult questions
  if (questions.adultQuestions && questions.adultQuestions.length) {
    questions.adultQuestions = questions.adultQuestions.map(levelQuestions => {
      return fisherYatesShuffle(levelQuestions);
    });
  }

  return questions;
}

export async function getQuestions(): Promise<QuestionBase> {
  // Check if data dir exists
  if (!fs.existsSync(dataDir)) {
    throw new Error(`Data directory ${dataDir} does not exist`);
  }
  
  let kidsQuestions = await loadQuestions('q-kids.json');
  let adultQuestions = await loadQuestions('q-adults.json');
  let questions = { kidsQuestions, adultQuestions };

  // Sort questions by level
  questions = sortQuestionsByLevel(questions);

  // Shuffle questions after sorting
  questions = shuffleQuestions(questions);

  console.log(`Loaded ${kidsQuestions.length} kids questions and ${adultQuestions.length} adult questions`);
  return questions;
}

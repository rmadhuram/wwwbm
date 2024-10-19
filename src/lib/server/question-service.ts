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

function shuffleQuestions(questions: QuestionBase): QuestionBase {
  // TODO: shuffle questions
  return questions;
}

export async function getQuestions(): Promise<QuestionBase> {
  // check if data dir exists
  if (!fs.existsSync(dataDir)) {
    throw new Error(`Data directory ${dataDir} does not exist`);
  }
  let kidsQuestions = await loadQuestions('q-kids.json');
  let adultQuestions = await loadQuestions('q-adults.json');
  let questions = { kidsQuestions, adultQuestions };
  questions = shuffleQuestions(questions);

  console.log(`Loaded ${kidsQuestions.length} kids questions and ${adultQuestions.length} adult questions`);
  return questions;
}


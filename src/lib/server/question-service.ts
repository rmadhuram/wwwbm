import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { Question, QuestionBase } from "../model";
import csv from "csv-parser";

dotenv.config();

const dataDir = process.env.DATA_DIR || "./data";

// async function loadQuestions(fileName: string) {
//   const filePath = path.join(dataDir, fileName);
//   console.log(`Loading questions from ${filePath}`);
//   const fileContents = fs.readFileSync(filePath, 'utf8');

//   return JSON.parse(fileContents);
// }

// function shuffleQuestions(questions: QuestionBase): QuestionBase {
//   // TODO: shuffle questions
//   return questions;
// }

// export async function getQuestions(): Promise<QuestionBase> {
//   // check if data dir exists
//   if (!fs.existsSync(dataDir)) {
//     throw new Error(`Data directory ${dataDir} does not exist`);
//   }
//   let kidsQuestions = await loadQuestions('q-kids.json');
//   let adultQuestions = await loadQuestions('q-adults.json');
//   let questions = { kidsQuestions, adultQuestions };
//   questions = shuffleQuestions(questions);

//   console.log(`Loaded ${kidsQuestions.length} kids questions and ${adultQuestions.length} adult questions`);
//   return questions;
// }

function shuffleOptions(options: string[], correctAnswer: string) {
  const shuffledOptions = options
    .map((option) => ({ option, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ option }) => option);

  const correctAnswerIndex = shuffledOptions.indexOf(correctAnswer);

  return {
    shuffledOptions,
    correctAnswerIndex,
  };
}

async function loadQuestions(fileName: string) {
  const filePath = path.join(dataDir, fileName);
  console.log(`Loading questions from ${filePath}`);

  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const options = [row.option0, row.option1, row.option2, row.option3];

        const { shuffledOptions, correctAnswerIndex } = shuffleOptions(
          options,
          row.option0
        );

        results.push({
          question: row.question,
          options: shuffledOptions,
          correct: correctAnswerIndex,
          reference: row.reference,
          fact: row.fact,
        });
      })
      .on("end", () => resolve([results]))
      .on("error", (error) => reject(error));
  });
}

export async function loadQuestionsFromCSV(): Promise<any> {
  if (!fs.existsSync(dataDir)) {
    throw new Error(`Data directory ${dataDir} does not exist`);
  }

  try {
    const kidsQuestions = await loadQuestions("q-kids.csv");
    const adultQuestions = await loadQuestions("q_adults.csv");

    let questions = { kidsQuestions, adultQuestions };
    return questions;
  } catch (error) {
    console.log(`Error loading ques`);
    throw error;
  }
}

import { Question, QuestionBase } from "../model";

let questionBase: QuestionBase;
let questionPointers = {
  kid: [0, 0, 0, 0, 0],
  adult: [0, 0, 0, 0, 0]
}

export function setQuestions(qs: QuestionBase) {
  questionBase = qs;
}

export function getQuestions(level: 'kid' | 'adult'): Question[] {
  let qb = null;
  console.log(`level: ${level}`, questionBase)
  switch (level) {
    case 'kid':
      qb = questionBase.kidsQuestions;
      break;
    case 'adult':
      qb = questionBase.adultQuestions;
      break;
  }

  console.log(`level: ${level}`, qb)
  let questions = []
  for (let i = 0; i < 5; i++) {
    let question = qb[i][questionPointers[level][i]]; 
    questionPointers[level][i]++;
    if (questionPointers[level][i] >= qb[i].length) {
      questionPointers[level][i] = 0;
    }
    questions.push(question);
  }
  console.log(questions);

  return questions;
}


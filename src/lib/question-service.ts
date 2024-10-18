import { Question } from "./model";

let questions: Question[] = [
  {
    id: "1",
    question: "Q1: What gift did the wise men NOT bring to baby Jesus?",
    answers: [
      "Gold",
      "Frankincense",
      "Myrrh",
      "Silver"
    ],
    correctAnswer: 3
  },
  {
    id: "2",
    question: "Q2: What is the capital of France?",
    answers: [
      "Paris",
      "London",
      "Berlin",
      "Madrid"
    ],
    correctAnswer: 0
  },
  {
    id: "3",
    question: "Q3: What is the capital of Germany?",
    answers: [
      "Paris",
      "London",
      "Berlin",
      "Madrid"
    ],
    correctAnswer: 2
  },
  {
    id: "4",  
    question: "Q4: What is the capital of Italy?",
    answers: [
      "Rome",
      "London",
      "Berlin",
      "Madrid"
    ],
    correctAnswer: 0
  },
  {
    id: "5",
    question: "Q5: What is the capital of Spain?",
    answers: [
      "Paris",
      "London",
      "Berlin",
      "Madrid"
    ],
    correctAnswer: 3
  }
];

export function getQuestions() {
  return questions;
}


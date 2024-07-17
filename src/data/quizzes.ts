import { Quiz } from "../types/quiz";

export const Quizzes: Array<Quiz> = [
  {
    id: 1,
    title: "Quiz #1",
    description: "The first quiz created",
    videoURL: "https://www.youtube.com/watch?v=gAWYROgu4JU",
    created: 0,
    modified: 0,
    questions: [
      {
        id: 1,
        text: "What is the powerhouse of the cell?",
        feedbackFalse: "Wrong! The correct answer is the mitochondria.",
        feedbackTrue: "Correct!",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            text: "Mitochondria",
          },
          {
            id: 2,
            text: "Diesel",
          },
        ],
      },
      {
        id: 2,
        text: "What is the powerhouse of the cell?",
        feedbackFalse: "Wrong! The correct answer is the mitochondria.",
        feedbackTrue: "Correct!",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            text: "Mitochondria",
          },
          {
            id: 2,
            text: "Diesel",
          },
        ],
      },
      {
        id: 3,
        text: "What is the powerhouse of the cell?",
        feedbackFalse: "Wrong! The correct answer is the mitochondria.",
        feedbackTrue: "Correct!",
        correctAnswerId: 1,
        answers: [
          {
            id: 1,
            text: "Mitochondria",
          },
          {
            id: 2,
            text: "Diesel",
          },
        ],
      },
    ],
  },
];

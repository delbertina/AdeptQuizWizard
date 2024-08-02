export interface Quiz {
  id: number;
  title: string;
  description: string;
  videoURL: string;
  created: number;
  modified: number;
  questions: Array<QuizQuestion>;
}

export interface QuizQuestion {
  id: number;
  text: string;
  correctAnswerId: number;
  answers: Array<QuizAnswer>;
  feedbackFalse: string;
  feedbackTrue: string;
}

export interface QuizAnswer {
  id: number;
  text: string;
}

export const NewQuiz = {
  id: 0,
  title: "New Quiz",
  description: "New Quiz Description",
  created: 0,
  modified: 0,
  questions: [],
  videoURL: "",
}

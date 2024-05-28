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

import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../shared/test-utils";
import { Quiz } from "../../types/quiz";
import HomePage from "./HomePage";
import { Score } from "../../types/score";
import { NO_SCORE_DISPLAY } from "../../shared/constants";

const quizTitle = "Test Quiz Title";
const quizDescription = "Test quiz description";
const quizQuestionText = "Question Text";
const quizQuestionCorrectAnswer = "Correct Answer";
const quizQuestionIncorrectAnswer = "Wrong Answer";
const quizQuestionCorrectFeedback = "That is correct!";
const quizQuestionIncorrectFeedback = "That is wrong!";
const testQuiz1: Quiz = {
  id: 1,
  title: quizTitle + "1",
  description: quizDescription,
  videoURL: "",
  created: 0,
  modified: 0,
  questions: [
    {
      id: 1,
      text: quizQuestionText,
      correctAnswerId: 1,
      feedbackTrue: quizQuestionCorrectFeedback,
      feedbackFalse: quizQuestionIncorrectFeedback,
      answers: [
        { id: 1, text: quizQuestionCorrectAnswer },
        { id: 2, text: quizQuestionIncorrectAnswer },
      ],
    },
  ],
};
const testQuiz2: Quiz = {
    id: 2,
    title: quizTitle + "2",
    description: quizDescription,
    videoURL: "",
    created: 0,
    modified: 1,
    questions: [
      {
        id: 1,
        text: quizQuestionText,
        correctAnswerId: 1,
        feedbackTrue: quizQuestionCorrectFeedback,
        feedbackFalse: quizQuestionIncorrectFeedback,
        answers: [
          { id: 1, text: quizQuestionCorrectAnswer },
          { id: 2, text: quizQuestionIncorrectAnswer },
        ],
      },
    ],
  };

  const testScore: Score = {
    id: 1,
    quizId: 2,
    result: 50,
    timestamp: 0
  }

test("renders multiple quizzes and correctly sorts", () => {
  renderWithProviders(
    <HomePage quizzes={[testQuiz1, testQuiz2]} scores={[testScore]} />,
    {
      preloadedState: {
        quiz: { quizzes: [testQuiz1, testQuiz2], nextIndex: 3, current: testQuiz1 },
      },
    }
  );
  const quizRow = screen.getByTestId("quiz-display-row");
  expect(quizRow).toBeInTheDocument();
  const quizCards = screen.getAllByTestId("quiz-card-header-title");
  expect(quizCards).toHaveLength(2);
  expect(quizCards[0]).toHaveTextContent(quizTitle + 2);
  const quizCardScores = screen.getAllByTestId("quiz-card-score");
  expect(quizCardScores).toHaveLength(2);
  expect(quizCardScores[1]).toHaveTextContent(NO_SCORE_DISPLAY);
});
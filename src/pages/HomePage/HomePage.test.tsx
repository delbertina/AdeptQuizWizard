import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../shared/test-utils";
import { Quiz } from "../../types/quiz";
import userEvent from "@testing-library/user-event";
import HomePage from "./HomePage";

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

test("renders multiple quizzes and correctly sorts", () => {
  renderWithProviders(
    <HomePage quizzes={[testQuiz1, testQuiz2]} scores={[]}
    onQuizClick={(quiz: Quiz) => {}}
    onQuizEditClick={(quiz: Quiz) => {}}
    onQuizScoreClick={(quiz: Quiz) => {}} />,
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
});
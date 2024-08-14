import { fireEvent, screen, waitFor } from "@testing-library/react";
import { NO_SCORE_DISPLAY } from "../../shared/constants";
import { renderWithProviders } from "../../shared/test-utils";
import QuizScoreDialog from "./QuizScoreDialog";
import { Quiz } from "../../types/quiz";

const quizTitle = "Test Quiz Title";
const quizQuestionText = "Question Text";
const quizQuestionCorrectAnswer = "Correct Answer";
const quizQuestionIncorrectAnswer = "Wrong Answer";
const quizQuestionCorrectFeedback = "That is correct!";
const quizQuestionIncorrectFeedback = "That is wrong!";
const testQuiz: Quiz = {
  id: 0,
  title: quizTitle,
  description: "",
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
    {
      id: 2,
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

test("renders no score percentage with no input", () => {
  renderWithProviders(
    <QuizScoreDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
        score: {scores: [], nextIndex: 1}
      },
    }
  );
  const scoreDisplay = screen.getByTestId("quiz-score-dialog-description");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreText = screen.getByText(NO_SCORE_DISPLAY, { exact: false });
  expect(scoreText).toBeInTheDocument();
});

test("escape button calls dialog close", async () => {
  const onClose = jest.fn();
  renderWithProviders(
    <QuizScoreDialog isDialogOpen={true} handleDialogClose={onClose} />
  );
  const dialogHeader = screen.getByTestId("quiz-score-dialog-header");
  fireEvent.keyDown(dialogHeader, {
    key: "Escape",
    keyCode: 27,
    which: 27,
  });
  await waitFor(() => {
    expect(onClose).toBeCalledTimes(1);
  });
});

test("close button calls dialog close", async () => {
  const onClose = jest.fn();
  renderWithProviders(
    <QuizScoreDialog isDialogOpen={true} handleDialogClose={onClose} />
  );
  const dialogCloseButton = screen.getByTestId("score-dialog-close-button");
  expect(dialogCloseButton).toBeInTheDocument();
  fireEvent.click(dialogCloseButton);
  await waitFor(() => {
    expect(onClose).toBeCalledTimes(1);
  });
});

test("renders average score percentage with scores in state", () => {
  renderWithProviders(
    <QuizScoreDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
        score: {
          scores: [
            { id: 0, result: 40, quizId: 0, timestamp: 0 },
            { id: 0, result: 60, quizId: 0, timestamp: 0 },
          ],
          nextIndex: 1,
        },
      },
    }
  );
  const scoreDisplay = screen.getByTestId("quiz-score-dialog-description");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreAvgText = screen.getByText("50.00%", { exact: false });
  expect(scoreAvgText).toBeInTheDocument();
  const score1Text = screen.getByText("40.00%", { exact: false });
  expect(score1Text).toBeInTheDocument();
  const score2Text = screen.getByText("60.00%", { exact: false });
  expect(score2Text).toBeInTheDocument();
});

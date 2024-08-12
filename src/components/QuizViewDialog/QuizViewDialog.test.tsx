import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuizViewDialog from "./QuizViewDialog";
import { renderWithProviders } from "../../shared/test-utils";
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
  ],
};

test("renders quiz title", () => {
  renderWithProviders(
    <QuizViewDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizTitleDisplay = screen.getByText(quizTitle, { exact: false });
  expect(quizTitleDisplay).toBeInTheDocument();
});

test("renders correct feedback when correct answer clicked", async () => {
  renderWithProviders(
    <QuizViewDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizCorrectAnswer = screen.getByText(quizQuestionCorrectAnswer, {
    exact: false,
  });
  expect(quizCorrectAnswer).toBeInTheDocument();
  fireEvent.click(quizCorrectAnswer);
  const checkAnswerButton = screen.getByText("Check Answer", { exact: false });
  await waitFor(() => {
    expect(checkAnswerButton).toBeEnabled();
  });
  fireEvent.click(checkAnswerButton);
  await waitFor(() => {
    expect(
      screen.getByText(quizQuestionCorrectFeedback, { exact: false })
    ).toBeInTheDocument();
  });
});

test("renders incorrect feedback when incorrect answer clicked", async () => {
  renderWithProviders(
    <QuizViewDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizIncorrectAnswer = screen.getByText(quizQuestionIncorrectAnswer, {
    exact: false,
  });
  expect(quizIncorrectAnswer).toBeInTheDocument();
  fireEvent.click(quizIncorrectAnswer);
  const checkAnswerButton = screen.getByText("Check Answer", { exact: false });
  await waitFor(() => {
    expect(checkAnswerButton).toBeEnabled();
  });
  fireEvent.click(checkAnswerButton);
  await waitFor(() => {
    expect(
      screen.getByText(quizQuestionIncorrectFeedback, { exact: false })
    ).toBeInTheDocument();
  });
});

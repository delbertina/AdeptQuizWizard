import { fireEvent, screen, waitFor } from "@testing-library/react";
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

test("close button calls dialog close", async () => {
  const onSubmit = jest.fn();
  renderWithProviders(
    <QuizViewDialog isDialogOpen={true} handleDialogClose={onSubmit} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizCloseButton = screen.getByTestId("quiz-view-dialog-close-button");
  expect(quizCloseButton).toBeInTheDocument();
  fireEvent.click(quizCloseButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
});

test("escape button calls dialog close", async () => {
  const onSubmit = jest.fn();
  renderWithProviders(
    <QuizViewDialog isDialogOpen={true} handleDialogClose={onSubmit} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizHeader = screen.getByTestId("quiz-view-dialog-header");
  fireEvent.keyDown(quizHeader, {
    key: "Escape",
    keyCode: 27,
    which: 27
  });
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
})

test("renders correct feedback when correct answer clicked", async () => {
  renderWithProviders(
    <QuizViewDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizCorrectAnswer = screen.getByTestId("quiz-view-content-question-item-0-0");
  expect(quizCorrectAnswer).toBeInTheDocument();
  fireEvent.click(quizCorrectAnswer);
  const checkAnswerButton = screen.getByTestId("quiz-view-content-question-check-button-0");
  expect(checkAnswerButton).toBeInTheDocument();
  await waitFor(() => {
    expect(checkAnswerButton).not.toBeDisabled();
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
  const quizIncorrectAnswer = screen.getByTestId("quiz-view-content-question-item-0-1");
  expect(quizIncorrectAnswer).toBeInTheDocument();
  fireEvent.click(quizIncorrectAnswer);
  const checkAnswerButton = screen.getByTestId("quiz-view-content-question-check-button-0");
  expect(checkAnswerButton).toBeInTheDocument();
  await waitFor(() => {
    expect(checkAnswerButton).not.toBeDisabled();
  });
  fireEvent.click(checkAnswerButton);
  await waitFor(() => {
    expect(
      screen.getByText(quizQuestionIncorrectFeedback, { exact: false })
    ).toBeInTheDocument();
  });
});

test("returns score on quiz completion", async () => {
  const onSubmit = jest.fn();
  renderWithProviders(
    <QuizViewDialog isDialogOpen={true} handleDialogClose={onSubmit} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizCorrectAnswer = screen.getByTestId("quiz-view-content-question-item-0-0");
  expect(quizCorrectAnswer).toBeInTheDocument();
  fireEvent.click(quizCorrectAnswer);
  const checkAnswerButton1 = screen.getByTestId("quiz-view-content-question-check-button-0");
  expect(checkAnswerButton1).toBeInTheDocument();
  await waitFor(() => {
    expect(checkAnswerButton1).not.toBeDisabled();
  });
  fireEvent.click(checkAnswerButton1);
  await waitFor(() => {
    expect(
      screen.getByTestId("quiz-view-content-question-check-alert-0")
    ).toHaveTextContent(quizQuestionCorrectFeedback);
  });

  const quizIncorrectAnswer = screen.getByTestId("quiz-view-content-question-item-1-1");
  expect(quizIncorrectAnswer).toBeInTheDocument();
  fireEvent.click(quizIncorrectAnswer);
  const checkAnswerButton2 = screen.getByTestId("quiz-view-content-question-check-button-1");
  await waitFor(() => {
    expect(checkAnswerButton2).not.toBeDisabled();
  });
  fireEvent.click(checkAnswerButton2);
  await waitFor(() => {
    expect(
      screen.getByTestId("quiz-view-content-question-check-alert-1")
    ).toHaveTextContent(quizQuestionIncorrectFeedback);
  });

  const submitButton = screen.getByTestId("quiz-view-actions-submit");
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeEnabled();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  })
});

import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../shared/test-utils";
import { Quiz } from "../../types/quiz";
import QuizEditDialog from "./QuizEditDialog";

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

test("renders data of input quiz", () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizTitleDisplay = screen.getByTestId("quiz-edit-dialog-quiz-title");
  expect(quizTitleDisplay).toHaveTextContent(quizTitle);
});

test("escape button calls dialog close", async () => {
  const onClose = jest.fn();
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} handleDialogClose={onClose} />
  );
  const dialogHeader = screen.getByTestId("quiz-edit-dialog-header");
  fireEvent.keyDown(dialogHeader, {
    key: "Escape",
    keyCode: 27,
    which: 27,
  });
  await waitFor(() => {
    expect(onClose).toBeCalledTimes(1);
  });
});

test("cancel button calls dialog close", async () => {
  const onClose = jest.fn();
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} handleDialogClose={onClose} />
  );
  const cancelButton = screen.getByTestId("quiz-edit-dialog-cancel-button");
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(onClose).toBeCalledTimes(1);
  });
});

test("clicking edit quiz title opens edit text dialog", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} handleDialogClose={() => {}} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizTitleEdit = screen.getByTestId(
    "quiz-edit-dialog-quiz-title-edit-button"
  );
  expect(quizTitleEdit).toBeInTheDocument();
  fireEvent.click(quizTitleEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });
});

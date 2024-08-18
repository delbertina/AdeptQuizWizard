import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../shared/test-utils";
import { Quiz } from "../../types/quiz";
import QuizEditDialog from "./QuizEditDialog";
import userEvent from "@testing-library/user-event";
import { QUIZEDITDIALOG_EDITANSWERTEXT_DIALOGFIELDLABEL, QUIZEDITDIALOG_EDITDESCRIPTION_DIALOGFIELDLABEL, QUIZEDITDIALOG_EDITFEEDBACK_DIALOGFIELDLABEL, QUIZEDITDIALOG_EDITQUESTIONTEXT_DIALOGFIELDLABEL, QUIZEDITDIALOG_EDITTITLE_DIALOGFIELDLABEL } from "../../shared/constants";

const quizTitle = "Test Quiz Title";
const quizDescription = "Test quiz description";
const quizQuestionText = "Question Text";
const quizQuestionCorrectAnswer = "Correct Answer";
const quizQuestionIncorrectAnswer = "Wrong Answer";
const quizQuestionCorrectFeedback = "That is correct!";
const quizQuestionIncorrectFeedback = "That is wrong!";
const testQuiz: Quiz = {
  id: 0,
  title: quizTitle,
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

test("renders data of input quiz", () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
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
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />
  );
  const dialogHeader = screen.getByTestId("quiz-edit-dialog-header");
  fireEvent.keyDown(dialogHeader, {
    key: "Escape",
    keyCode: 27,
    which: 27,
  });
  // await waitFor(() => {
  //   expect(onClose).toBeCalledTimes(1);
  // });
});

test("cancel button calls dialog close", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />
  );
  const cancelButton = screen.getByTestId("quiz-edit-dialog-cancel-button");
  fireEvent.click(cancelButton);
  // await waitFor(() => {
  //   expect(onClose).toBeCalledTimes(1);
  // });
});

test("submit button for edit quiz calls dialog close", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [{...testQuiz, id: 1}], nextIndex: 1, current: {...testQuiz, id: 1} },
      },
    }
  );
  const submitButton = screen.getByTestId("quiz-edit-dialog-submit-button");
  await waitFor(() => {
    expect(submitButton).toBeEnabled();
  });
  fireEvent.click(submitButton);
  // await waitFor(() => {
  //   expect(onClose).toBeCalledTimes(1);
  // });
});

test("submit button for new quiz calls dialog close", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const submitButton = screen.getByTestId("quiz-edit-dialog-submit-button");
  await waitFor(() => {
    expect(submitButton).toBeEnabled();
  });
  fireEvent.click(submitButton);
  // await waitFor(() => {
  //   expect(onClose).toBeCalledTimes(1);
  // });
});

test("submit button for existing quiz calls dialog close", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: {...testQuiz, id: 1} },
      },
    }
  );
  const submitButton = screen.getByTestId("quiz-edit-dialog-submit-button");
  await waitFor(() => {
    expect(submitButton).toBeEnabled();
  });
  fireEvent.click(submitButton);
  // await waitFor(() => {
  //   expect(onClose).toBeCalledTimes(1);
  // });
});

test("clicking edit quiz title opens edit text dialog", async () => {
  const newTitle = "New Quiz Title";
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
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
  // Click cancel and reopen
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });

  fireEvent.click(quizTitleEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  const textField = screen.getByLabelText(QUIZEDITDIALOG_EDITTITLE_DIALOGFIELDLABEL, {exact:false});
  await userEvent.type(textField, newTitle);
  expect(textField).toHaveValue(quizTitle + newTitle);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });
  const quizTitleElm = screen.getByTestId("quiz-edit-dialog-quiz-title");
  expect(quizTitleElm).toBeInTheDocument();
  expect(quizTitleElm).toHaveTextContent(quizTitle + newTitle);
});

test("clicking edit quiz description opens edit text dialog", async () => {
  const newDescription = "New Description";
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizDescriptionEdit = screen.getByTestId(
    "quiz-edit-dialog-quiz-description-edit-button"
  );
  expect(quizDescriptionEdit).toBeInTheDocument();
  fireEvent.click(quizDescriptionEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });

  fireEvent.click(quizDescriptionEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  const textField = screen.getByLabelText(QUIZEDITDIALOG_EDITDESCRIPTION_DIALOGFIELDLABEL, {exact:false});
  await userEvent.type(textField, newDescription);
  expect(textField).toHaveValue(quizDescription + newDescription);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });
  const quizDesc = screen.getByTestId("quiz-edit-dialog-quiz-description");
  expect(quizDesc).toBeInTheDocument();
  expect(quizDesc).toHaveTextContent(quizDescription + newDescription);
});

test("clicking edit quiz question text opens edit text dialog", async () => {
  const newQuestionText = "New Question Text";
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizQuestionEdit = screen.getByTestId(
    "quiz-edit-dialog-content-question-edit-button-0"
  );
  expect(quizQuestionEdit).toBeInTheDocument();
  fireEvent.click(quizQuestionEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  // Click cancel and reopen
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });

  fireEvent.click(quizQuestionEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  const textField = screen.getByLabelText(QUIZEDITDIALOG_EDITQUESTIONTEXT_DIALOGFIELDLABEL, {exact:false});
  await userEvent.type(textField, newQuestionText);
  expect(textField).toHaveValue(quizQuestionText + newQuestionText);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });
  const quizQuestText = screen.getByTestId("quiz-edit-dialog-content-question-text-0");
  expect(quizQuestText).toBeInTheDocument();
  expect(quizQuestText).toHaveTextContent(quizQuestionText + newQuestionText);
});

test("clicking edit quiz question answer text opens edit text dialog", async () => {
  const newAnswerText = "New Answer Text";
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizQuestionAnswerEdit = screen.getByTestId(
    "quiz-edit-dialog-content-question-answer-edit-button-0-0"
  );
  expect(quizQuestionAnswerEdit).toBeInTheDocument();
  fireEvent.click(quizQuestionAnswerEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  // Click cancel and reopen
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });

  fireEvent.click(quizQuestionAnswerEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  const textField = screen.getByLabelText(QUIZEDITDIALOG_EDITANSWERTEXT_DIALOGFIELDLABEL, {exact:false});
  await userEvent.type(textField, newAnswerText);
  expect(textField).toHaveValue(quizQuestionCorrectAnswer + newAnswerText);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });
  const quizAnswerText = screen.getByTestId("quiz-edit-dialog-content-question-answer-text-0-0");
  expect(quizAnswerText).toBeInTheDocument();
  expect(quizAnswerText).toHaveTextContent(quizQuestionCorrectAnswer + newAnswerText);
});

test("clicking edit quiz question correct feedback text opens edit text dialog", async () => {
  const newCorrectFeedback = "New Correct Feedback";
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizQuestionCorrectFeedbackEdit = screen.getByTestId(
    "quiz-edit-dialog-content-question-feedback-true-button-0"
  );
  expect(quizQuestionCorrectFeedbackEdit).toBeInTheDocument();
  fireEvent.click(quizQuestionCorrectFeedbackEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  // Click cancel and reopen
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });

  fireEvent.click(quizQuestionCorrectFeedbackEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  const textField = screen.getByLabelText(QUIZEDITDIALOG_EDITFEEDBACK_DIALOGFIELDLABEL, {exact:false});
  await userEvent.type(textField, newCorrectFeedback);
  expect(textField).toHaveValue(quizQuestionCorrectFeedback + newCorrectFeedback);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });
  const quizCorrectFeedback = screen.getByTestId("quiz-edit-dialog-content-question-feedback-true-0");
  expect(quizCorrectFeedback).toBeInTheDocument();
  expect(quizCorrectFeedback).toHaveTextContent(quizQuestionCorrectFeedback + newCorrectFeedback);
});

test("clicking edit quiz question incorrect feedback text opens edit text dialog", async () => {
  const newIncorrectFeedback = "New Incorrect Feedback";
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizQuestionIncorrectFeedbackEdit = screen.getByTestId(
    "quiz-edit-dialog-content-question-feedback-false-button-0"
  );
  expect(quizQuestionIncorrectFeedbackEdit).toBeInTheDocument();
  fireEvent.click(quizQuestionIncorrectFeedbackEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });

  // Click cancel and reopen
  const cancelButton = screen.getByTestId("cancel-button");
  expect(cancelButton).toBeInTheDocument();
  fireEvent.click(cancelButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });

  fireEvent.click(quizQuestionIncorrectFeedbackEdit);
  await waitFor(() => {
    expect(screen.getByTestId("edit-text-dialog-header")).toBeInTheDocument();
  });


  const textField = screen.getByLabelText(QUIZEDITDIALOG_EDITFEEDBACK_DIALOGFIELDLABEL, {exact:false});
  await userEvent.type(textField, newIncorrectFeedback);
  expect(textField).toHaveValue(quizQuestionIncorrectFeedback + newIncorrectFeedback);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.queryByTestId("edit-text-dialog-header")).not.toBeInTheDocument();
  });
  const quizIncorrectFeedback = screen.getByTestId("quiz-edit-dialog-content-question-feedback-false-0");
  expect(quizIncorrectFeedback).toBeInTheDocument();
  expect(quizIncorrectFeedback).toHaveTextContent(quizQuestionIncorrectFeedback + newIncorrectFeedback);
});

test("clicking quiz question unselected answer toggles it as correct answer", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizQuestionAnswerUnselected = screen.getByTestId(
    "quiz-edit-dialog-content-question-answer-unselected-0-1"
  );
  expect(quizQuestionAnswerUnselected).toBeInTheDocument();
  fireEvent.click(quizQuestionAnswerUnselected);
  await waitFor(() => {
    expect(
      screen.getByTestId(
        "quiz-edit-dialog-content-question-answer-selected-0-1"
      )
    ).toBeInTheDocument();
  });
});

test("clicking add question adds a question to the quiz", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  // question 2 doesnt exist
  expect(
    screen.queryByTestId("quiz-edit-dialog-content-question-text-1")
  ).not.toBeInTheDocument();
  const quizAddQuestionButton = screen.getByTestId(
    "quiz-edit-dialog-question-add-button"
  );
  expect(quizAddQuestionButton).toBeInTheDocument();
  fireEvent.click(quizAddQuestionButton);
  await waitFor(() => {
    // question 2 exists after clicking button
    expect(
      screen.getByTestId("quiz-edit-dialog-content-question-text-1")
    ).toBeInTheDocument();
  });
});

test("clicking delete question removes the only question and disables submit", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true}/>,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  // submit is enabled because there's at least 1 question
  expect(
    screen.getByTestId("quiz-edit-dialog-submit-button")
  ).not.toBeDisabled();
  const quizDeleteQuestionButton = screen.getByTestId(
    "quiz-edit-dialog-content-question-delete-button-0"
  );
  expect(quizDeleteQuestionButton).toBeInTheDocument();
  fireEvent.click(quizDeleteQuestionButton);
  await waitFor(() => {
    expect(
      screen.queryByTestId("quiz-edit-dialog-content-question-text-0")
    ).not.toBeInTheDocument();
  });
  expect(screen.getByTestId("quiz-edit-dialog-submit-button")).toBeDisabled();
});

test("clicking delete answer removes the answer", async () => {
  renderWithProviders(
    <QuizEditDialog isDialogOpen={true} />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: testQuiz },
      },
    }
  );
  const quizAnswerText = screen.getByTestId(
    "quiz-edit-dialog-content-question-answer-text-0-1"
  );
  expect(quizAnswerText).toBeInTheDocument();
  const quizDeleteAnswerButton = screen.getByTestId(
    "quiz-edit-dialog-content-question-answer-delete-button-0-1"
  );
  expect(quizDeleteAnswerButton).toBeInTheDocument();
  fireEvent.click(quizDeleteAnswerButton);
  await waitFor(() => {
    expect(
      screen.queryByTestId("quiz-edit-dialog-content-question-answer-text-0-1")
    ).not.toBeInTheDocument();
  });

  const quizAnswerAddButton = screen.getByTestId("quiz-edit-dialog-content-question-add-answer-button-0");
  expect(quizAnswerAddButton).toBeInTheDocument();
  fireEvent.click(quizAnswerAddButton);
  await waitFor(() => {
    expect(
      screen.getByTestId("quiz-edit-dialog-content-question-answer-text-0-1")
    ).toBeInTheDocument();
  });
});

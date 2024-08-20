import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './shared/test-utils';
import { NewQuiz } from './types/quiz';
import { DIALOG_NAME } from './types/dialog';

test('renders title text', () => {
  renderWithProviders(<App />);
  const titleElement = screen.getByText("Adept Quiz Wizard");
  expect(titleElement).toBeInTheDocument();
});

test('renders edit quiz dialog when new quiz button clicked', async () => {
  renderWithProviders(<App />);
  const addQuizButton = screen.getByTestId("app-add-new-quiz-button");
  fireEvent.click(addQuizButton);
  await waitFor(() => {
    expect(screen.getByTestId("quiz-edit-dialog-header")).toBeInTheDocument();
  })
  const cancelEditButton = screen.getByTestId("quiz-edit-dialog-cancel-button");
  fireEvent.click(cancelEditButton);
  await waitFor(() => {
    expect(screen.queryByTestId("quiz-edit-dialog-header")).not.toBeInTheDocument();
  })
});

test('renders view quiz', () => {
  renderWithProviders(<App />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: NewQuiz },
        dialog: {open: DIALOG_NAME.QUIZ_VIEW}
      },
    }
  );
  const quizViewHeader = screen.getByTestId("quiz-view-dialog-header");
  expect(quizViewHeader).toBeInTheDocument();
});

test('renders view score', () => {
  renderWithProviders(<App />,
    {
      preloadedState: {
        quiz: { quizzes: [], nextIndex: 1, current: NewQuiz },
        dialog: {open: DIALOG_NAME.SCORE_VIEW}
      },
    }
  );
  const scoreViewHeader = screen.getByTestId("quiz-score-dialog-header");
  expect(scoreViewHeader).toBeInTheDocument();
});

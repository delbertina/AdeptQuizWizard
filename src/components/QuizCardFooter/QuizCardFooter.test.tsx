import { fireEvent, screen, waitFor } from "@testing-library/react";
import QuizCardFooter from "./QuizCardFooter";
import { NO_SCORE_DISPLAY } from "../../shared/constants";
import { renderWithProviders } from "../../shared/test-utils";

test("renders no score percentage with no input", () => {
  renderWithProviders(<QuizCardFooter scores={[]} onClick={() => {}} />);
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreText = screen.getByText(NO_SCORE_DISPLAY, { exact: false });
  expect(scoreText).toBeInTheDocument();
});

test("renders input score with only one input score", () => {
  renderWithProviders(
    <QuizCardFooter
      scores={[{ id: 0, result: 50, quizId: 0, timestamp: 0 }]}
      onClick={() => {}}
    />
  );
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreText = screen.getByText("50.00%", { exact: false });
  expect(scoreText).toBeInTheDocument();
});

test("renders average score with multiple input scores", () => {
  renderWithProviders(
    <QuizCardFooter
      scores={[
        { id: 0, result: 40, quizId: 0, timestamp: 0 },
        { id: 0, result: 60, quizId: 0, timestamp: 0 },
      ]}
      onClick={() => {}}
    />
  );
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreText = screen.getByText("50.00%", { exact: false });
  expect(scoreText).toBeInTheDocument();
});

test("handles click event", async () => {
  const onSubmit = jest.fn();
  renderWithProviders(
    <QuizCardFooter scores={[]} onClick={() => onSubmit()} />
  );
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  fireEvent.click(scoreDisplay);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
});

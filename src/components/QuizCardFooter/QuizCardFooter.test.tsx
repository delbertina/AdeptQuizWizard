import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import QuizCardFooter from "./QuizCardFooter";
import { NO_SCORE_DISPLAY } from "../../shared/constants";

test("renders no score percentage with no input", () => {
  render(
    <Provider store={store}>
      <QuizCardFooter scores={[]} onClick={() => {}} />
    </Provider>
  );
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreText = screen.getByText(NO_SCORE_DISPLAY, { exact: false });
  expect(scoreText).toBeInTheDocument();
});

test("renders input score with only one input score", () => {
  render(
    <Provider store={store}>
      <QuizCardFooter
        scores={[{ id: 0, result: 50, quizId: 0, timestamp: 0 }]}
        onClick={() => {}}
      />
    </Provider>
  );
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreText = screen.getByText("50.00%", { exact: false });
  expect(scoreText).toBeInTheDocument();
});

test("renders average score with multiple input scores", () => {
  render(
    <Provider store={store}>
      <QuizCardFooter
        scores={[
          { id: 0, result: 40, quizId: 0, timestamp: 0 },
          { id: 0, result: 60, quizId: 0, timestamp: 0 },
        ]}
        onClick={() => {}}
      />
    </Provider>
  );
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  const scoreText = screen.getByText("50.00%", { exact: false });
  expect(scoreText).toBeInTheDocument();
});

test("handles click event", async () => {
  const onSubmit = jest.fn();
  render(
    <Provider store={store}>
      <QuizCardFooter
        scores={[
        ]}
        onClick={() => onSubmit()}
      />
    </Provider>
  );
  const scoreDisplay = screen.getByTestId("quiz-card-score");
  expect(scoreDisplay).toBeInTheDocument();
  fireEvent.click(scoreDisplay);
  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(1);
  });
});

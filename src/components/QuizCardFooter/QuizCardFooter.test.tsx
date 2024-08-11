import { render, screen } from "@testing-library/react";
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
  const scoreText = screen.getByText(NO_SCORE_DISPLAY, {exact: false});
  expect(scoreText).toBeInTheDocument();
});
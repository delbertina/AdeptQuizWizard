import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import QuizCard from "./QuizCard";

test("renders no score percentage with no input", () => {
  const quizTitle = "Test Quiz Title";
  render(
    <Provider store={store}>
      <QuizCard
        quiz={{
          id: 0,
          title: quizTitle,
          description: "",
          videoURL: "",
          created: 0,
          modified: 0,
          questions: [],
        }}
        scores={[]}
        onClick={() => {}}
        onEditClick={() => {}}
        onScoreClick={() => {}}
      />
    </Provider>
  );
  const cardDisplay = screen.getByTestId("quiz-card");
  expect(cardDisplay).toBeInTheDocument();
  const cardHeader = screen.getByText(quizTitle, { exact: false });
  expect(cardHeader).toBeInTheDocument();
});

test("handles click events one at a time", async () => {
    const onClick = jest.fn();
    const onEditClick = jest.fn();
    const onScoreClick = jest.fn();
    render(
      <Provider store={store}>
        <QuizCard
          quiz={{
            id: 0,
            title: "",
            description: "",
            videoURL: "",
            created: 0,
            modified: 0,
            questions: [],
          }}
          scores={[]}
          onClick={() => onClick()}
          onEditClick={() => onEditClick()}
          onScoreClick={() => onScoreClick()}
        />
      </Provider>
    );
    // Click on card = onClick not edit or score
    const cardMain = screen.getByTestId("quiz-card");
    expect(cardMain).toBeInTheDocument();
    fireEvent.click(cardMain);
    await waitFor(() => {
        expect(onClick).toBeCalledTimes(1);
    });
    expect(onEditClick).toBeCalledTimes(0);
    expect(onScoreClick).toBeCalledTimes(0);
    // Click on header = onClick not edit or score
    const cardHeader = screen.getByTestId("quiz-card-header");
    fireEvent.click(cardHeader);
    await waitFor(() => {
        expect(onClick).toBeCalledTimes(2);
    });
    expect(onEditClick).toBeCalledTimes(0);
    expect(onScoreClick).toBeCalledTimes(0);
    // Click on edit button = onEdit not click or score
    const cardEditButton = screen.getByTestId("quiz-card-edit-button");
    fireEvent.click(cardEditButton);
    await waitFor(() => {
        expect(onEditClick).toBeCalledTimes(1);
    });
    expect(onClick).toBeCalledTimes(2);
    expect(onScoreClick).toBeCalledTimes(0);
    // Click on content = onClick not edit or score
    const cardContent = screen.getByTestId("quiz-card-content");
    fireEvent.click(cardContent);
    await waitFor(() => {
        expect(onClick).toBeCalledTimes(3);
    });
    expect(onEditClick).toBeCalledTimes(1);
    expect(onScoreClick).toBeCalledTimes(0);
    // Click on footer = onScore not click or edit
    const cardFooter = screen.getByTestId("quiz-card-footer");
    fireEvent.click(cardFooter);
    await waitFor(() => {
        expect(onScoreClick).toBeCalledTimes(1);
    });
    expect(onClick).toBeCalledTimes(3);
    expect(onEditClick).toBeCalledTimes(1);
  });
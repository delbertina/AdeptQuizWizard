import QuizCard from "../../components/QuizCard/QuizCard";
import { Quiz } from "../../types/quiz";
import { Score } from "../../types/score";
import "./HomePage.scss";

export interface HomePageProps {
  quizzes: Quiz[];
  scores: Score[];
  onQuizClick: (quiz: Quiz) => void;
  onQuizEditClick: (quiz: Quiz) => void;
}

const average = (array: number[]) =>
  array.reduce((a, b) => a + b, 0) / array.length;

function HomePage(props: HomePageProps) {
  return (
    <div className="row quiz-display-row">
      {props.quizzes
        .sort((a, b) => b.modified - a.modified)
        .map((quiz, index) => (
          <QuizCard
            key={index}
            title={quiz.title}
            description={quiz.description}
            score={average(
              props.scores
                .filter((score) => score.quizId === quiz.id)
                // Maybe add filter to only scores after the last edit of the quiz
                .map((score) => score.result) ?? []
            )}
            onClick={() => props.onQuizClick(quiz)}
            onEditClick={() => props.onQuizEditClick(quiz)}
          ></QuizCard>
        ))}
    </div>
  );
}

export default HomePage;

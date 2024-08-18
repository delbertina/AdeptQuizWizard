import QuizCard from "../../components/QuizCard/QuizCard";
import { Quiz } from "../../types/quiz";
import { Score } from "../../types/score";
import "./HomePage.scss";

export interface HomePageProps {
  quizzes: Quiz[];
  scores: Score[];
}

function HomePage(props: HomePageProps) {
  return (
    <div className="row quiz-display-row" data-testid="quiz-display-row">
      {props.quizzes.slice()
        .sort((a, b) => b.modified - a.modified)
        .map((quiz, index) => (
          <QuizCard
            key={index}
            quiz={quiz}
            scores={props.scores.filter((score) => score.quizId === quiz.id)}
          ></QuizCard>
        ))}
    </div>
  );
}

export default HomePage;

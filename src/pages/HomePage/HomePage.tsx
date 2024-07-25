import QuizCard from "../../components/QuizCard/QuizCard";
import { Quiz } from "../../types/quiz";
import "./HomePage.scss";

export interface HomePageProps {
    quizzes: Quiz[]
    onQuizClick: (quiz: Quiz) => void;
    onQuizEditClick: (quiz: Quiz) => void;
}

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
                score="94%"
                onClick={() => props.onQuizClick(quiz)}
                onEditClick={() => props.onQuizEditClick(quiz)}
              ></QuizCard>
            ))}
        </div>
    )
}

export default HomePage;
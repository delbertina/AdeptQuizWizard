import { Edit } from "@mui/icons-material";
import "./QuizCard.scss";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Score } from "../../types/score";
import QuizCardFooter from "../QuizCardFooter/QuizCardFooter";
import { Quiz } from "../../types/quiz";
import { useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../store/quizSlice";
import { setDialog } from "../../store/dialogSlice";
import { DIALOG_NAME } from "../../types/dialog";

export interface QuizCardProps {
  quiz: Quiz;
  scores: Score[];
}

function QuizCard(props: QuizCardProps) {
  const dispatch = useDispatch();

  const handleCardClick = (): void => {
    dispatch(setCurrentQuiz(props.quiz));
    dispatch(setDialog(DIALOG_NAME.QUIZ_VIEW));
  }
  
  const handleEditClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    dispatch(setCurrentQuiz(props.quiz));
    dispatch(setDialog(DIALOG_NAME.QUIZ_EDIT));
  };

  const handleFooterClick = (): void => {
    dispatch(setCurrentQuiz(props.quiz));
    dispatch(setDialog(DIALOG_NAME.SCORE_VIEW));
  }

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="quiz-card"
        data-testid="quiz-card"
      >
        <CardHeader
          className="quiz-card-header"
          data-testid="quiz-card-header"
          title={
            <Typography
              className="quiz-card-header-title"
              data-testid="quiz-card-header-title"
              variant="h6"
              component="h2"
            >
              {props.quiz.title}
            </Typography>
          }
          action={
            <IconButton
              aria-label="edit"
              data-testid="quiz-card-edit-button"
              onClick={(e: React.MouseEvent) => handleEditClick(e)}
            >
              <Edit />
            </IconButton>
          }
        ></CardHeader>
        <CardContent
          className="quiz-card-content"
          data-testid="quiz-card-content"
        >
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
            gutterBottom
            className="quiz-card-description"
            data-testid="quiz-card-description"
            variant="body1"
            component="div"
          >
            {props.quiz.description}
          </Typography>
          <QuizCardFooter scores={props.scores} onClick={handleFooterClick} />
        </CardContent>
      </Card>
    </>
  );
}

export default QuizCard;

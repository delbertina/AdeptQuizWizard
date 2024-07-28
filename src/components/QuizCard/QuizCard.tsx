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

export interface QuizCardProps {
  quiz: Quiz;
  scores: Score[];
  onClick: () => void;
  onEditClick: () => void;
}

function QuizCard(props: QuizCardProps) {
  const handleEditClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    props.onEditClick();
  };

  return (
    <>
      <Card onClick={() => props.onClick()} className="quiz-card">
        <CardHeader
          className="quiz-card-header"
          title={
            <Typography
              className="quiz-card-header-title"
              variant="h6"
              component="h2"
            >
              {props.quiz.title}
            </Typography>
          }
          action={
            <IconButton
              aria-label="edit"
              onClick={(e: React.MouseEvent) => handleEditClick(e)}
            >
              <Edit />
            </IconButton>
          }
        ></CardHeader>
        <CardContent className="quiz-card-content">
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
            variant="body1"
            component="div"
          >
            {props.quiz.description}
          </Typography>
          <QuizCardFooter scores={props.scores}/>
        </CardContent>
      </Card>
    </>
  );
}

export default QuizCard;

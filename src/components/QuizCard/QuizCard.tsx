import { Edit } from "@mui/icons-material";
import "./QuizCard.scss";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";

export interface QuizCardProps {
  title: string;
  description: string;
  score?: string;
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
          title={props.title}
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
            id="quiz-card-description"
            variant="body1"
            component="div"
          >
            {props.description}
          </Typography>
          <Typography
            sx={{ fontWeight: "bold" }}
            id="quiz-card-score"
            variant="body1"
            component="div"
          >
            {"Last Score: " + (props.score ? props.score : "< None >")}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default QuizCard;

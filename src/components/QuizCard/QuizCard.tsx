import { Edit } from "@mui/icons-material";
import "./QuizCard.scss";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";

export interface QuizCardProps {
  title: string;
  onClick: () => void;
}

function QuizCard(props: QuizCardProps) {
  return (
    <>
      <Card onClick={() => props.onClick()} className="quiz-card">
        <CardHeader
          className="quiz-card-header"
          title={props.title}
          action={
            <IconButton aria-label="edit">
              <Edit />
            </IconButton>
          }
        ></CardHeader>
        <CardContent className="quiz-card-content"></CardContent>
      </Card>
    </>
  );
}

export default QuizCard;

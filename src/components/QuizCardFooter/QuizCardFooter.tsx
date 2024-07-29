import { Typography } from "@mui/material";
import { Score } from "../../types/score";
import average from "../../shared/helper";
import './QuizCardFooter.scss';

export interface QuizCardFooterProps {
    scores: Score[];
    onClick: () => void;
}

function QuizCardFooter(props: QuizCardFooterProps) {

    const handleClick = (e: React.MouseEvent): void => {
      e.stopPropagation();
      props.onClick();
    }

    return (
        <div onClick={(e: React.MouseEvent) => handleClick(e)}>
            <Typography
            sx={{ fontWeight: "bold" }}
            className="quiz-card-score"
            variant="body1"
            component="div"
          >
            {"Avg Score: " + (props.scores.length ? Math.ceil(average(
              props.scores
                // Maybe add filter to only scores after the last edit of the quiz
                .map((score) => score.result) ?? []
            )) + "%" : "<None>")}
          </Typography>
        </div>
    )
}

export default QuizCardFooter;
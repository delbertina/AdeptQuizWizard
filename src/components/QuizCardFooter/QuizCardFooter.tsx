import { Typography } from "@mui/material";
import { Score } from "../../types/score";
import { average, formatScore } from "../../shared/helper";
import "./QuizCardFooter.scss";
import { NO_SCORE_DISPLAY } from "../../shared/constants";

export interface QuizCardFooterProps {
  scores: Score[];
  onClick: () => void;
}

function QuizCardFooter(props: QuizCardFooterProps) {
  const handleClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    props.onClick();
  };

  return (
    <div onClick={(e: React.MouseEvent) => handleClick(e)}>
      <Typography
        sx={{ fontWeight: "bold" }}
        className="quiz-card-score"
        data-testid="quiz-card-score"
        variant="body1"
        component="div"
      >
        {"Avg Score: " +
          (props.scores.length
            ? formatScore(
                Math.round(
                  average(
                    props.scores
                      // Maybe add filter to only scores after the last edit of the quiz
                      .map((score) => score.result) ?? []
                  )
                )
              ) + "%"
            : NO_SCORE_DISPLAY)}
      </Typography>
    </div>
  );
}

export default QuizCardFooter;

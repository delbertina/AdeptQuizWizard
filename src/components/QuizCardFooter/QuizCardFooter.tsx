import { Typography } from "@mui/material";
import { Score } from "../../types/score";
import average from "../../shared/helper";

export interface QuizCardFooterProps {
    scores: Score[]
}

function QuizCardFooter(props: QuizCardFooterProps) {

    return (
        <div>
            <Typography
            sx={{ fontWeight: "bold" }}
            className="quiz-card-score"
            variant="body1"
            component="div"
          >
            {"Avg Score: " + (props.scores ? Math.ceil(average(
              props.scores
                // Maybe add filter to only scores after the last edit of the quiz
                .map((score) => score.result) ?? []
            )) + "%" : "<None>")}
          </Typography>
        </div>
    )
}

export default QuizCardFooter;
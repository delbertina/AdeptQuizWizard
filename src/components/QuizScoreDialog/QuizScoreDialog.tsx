import "./QuizScoreDialog.scss";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Quiz } from "../../types/quiz";
import { Score } from "../../types/score";
import average from "../../shared/helper";

export interface QuizScoreDialogProps {
  isDialogOpen: boolean;
  quiz: Quiz;
  scores: Score[];
  handleDialogClose: () => void;
}

function QuizScoreDialog(props: QuizScoreDialogProps) {
  return (
    <>
      <Dialog
        open={props.isDialogOpen}
        onClose={() => props.handleDialogClose()}
        fullWidth={true}
        maxWidth={"sm"}
        scroll="paper"
        aria-labelledby="quiz-score-dialog-title"
        aria-describedby="quiz-score-dialog-description"
      >
        {/* header toolbar */}
        <DialogTitle id="quiz-score-dialog-header">
          <div id="quiz-score-dialog-title-column">
            <Typography
              gutterBottom
              id="quiz-score-dialog-title"
              variant="h5"
              component="div"
            >
              {props.quiz.title + " Scores"}
            </Typography>
            <Typography
              gutterBottom
              id="quiz-score-dialog-description"
              variant="body1"
              component="div"
            >
              {"Avg Score: " +
                (props.scores.length
                  ? Math.ceil(
                      average(
                        props.scores
                          // Maybe add filter to only scores after the last edit of the quiz
                          .map((score) => score.result) ?? []
                      )
                    ) + "%"
                  : "<None>")}
            </Typography>
          </div>
          <div>
            <IconButton
              aria-label="close score dialog"
              color="error"
              size="large"
              onClick={() => props.handleDialogClose()}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers={true} id="quiz-score-dialog-content">
          {/* display quiz scores */}
          {props.scores
            .sort((s1, s2) => (s1.timestamp > s2.timestamp ? 1 : -1))
            .map((score, i) => (
              <div
                key={i}
                className={
                  "quiz-score-dialog-content-row " +
                  (score.timestamp < props.quiz.modified
                    ? "quiz-score-dialog-content-row-old"
                    : "")
                }
              >
                <div className="quiz-score-dialog-content-row-timestamp">
                  {new Date(score.timestamp).toUTCString()}
                </div>
                <div className="quiz-score-dialog-content-row-result">
                  {score.result + "%"}
                </div>
              </div>
            ))}
          {/* footer close & submit */}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default QuizScoreDialog;

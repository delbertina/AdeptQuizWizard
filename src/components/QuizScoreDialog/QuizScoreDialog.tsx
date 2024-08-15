import "./QuizScoreDialog.scss";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  IconButton,
} from "@mui/material";
import { average, formatScore } from "../../shared/helper";
import { useSelector } from "react-redux";
import { selectCurrentQuiz } from "../../store/quizSlice";
import { selectScores } from "../../store/scoreSlice";
import { NO_SCORE_DISPLAY } from "../../shared/constants";

export interface QuizScoreDialogProps {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
}

function QuizScoreDialog(props: QuizScoreDialogProps) {
  const quiz = useSelector(selectCurrentQuiz);
  const scores = useSelector(selectScores);

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
        <DialogTitle id="quiz-score-dialog-header" data-testid="quiz-score-dialog-header">
          <div id="quiz-score-dialog-title-column">
            <Typography
              gutterBottom
              id="quiz-score-dialog-title"
              variant="h5"
              component="div"
            >
              {quiz.title + " Scores"}
            </Typography>
            <Typography
              gutterBottom
              id="quiz-score-dialog-description"
              data-testid="quiz-score-dialog-description"
              variant="body1"
              component="div"
            >
              {"Avg Score: " +
                (scores.length
                  ? formatScore(
                      average(
                        scores
                          // Maybe add filter to only scores after the last edit of the quiz
                          .map((score) => score.result)
                      )
                    ) + "%"
                  : NO_SCORE_DISPLAY)}
            </Typography>
          </div>
          <div>
            <IconButton
              aria-label="close score dialog"
              data-testid="score-dialog-close-button"
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
          {scores
            .filter((score) => score.quizId === quiz.id)
            .sort((s1, s2) => (s1.timestamp > s2.timestamp ? 1 : -1))
            .map((score, i) => (
              <div
                key={i}
                data-testid={"quiz-score-dialog-content-row-" + i}
                className={
                  "quiz-score-dialog-content-row " +
                  (score.timestamp < quiz.modified
                    ? "quiz-score-dialog-content-row-old"
                    : "")
                }
              >
                <div className="quiz-score-dialog-content-row-timestamp">
                  {new Date(score.timestamp).toUTCString()}
                </div>
                <div className="quiz-score-dialog-content-row-result">
                  {formatScore(score.result) + "%"}
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

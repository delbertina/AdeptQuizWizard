import "./QuizViewDialog.scss";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogContent,
  DialogActions,
} from "@mui/material";

export interface QuizViewDialogProps {
  isDialogOpen: boolean;
  handleDialogClose: (id?: number) => void;
}

function QuizViewDialog(props: QuizViewDialogProps) {
  return (
    <>
      <Dialog
        open={props.isDialogOpen}
        onClose={() => props.handleDialogClose()}
        fullWidth={true}
        maxWidth={"md"}
        aria-labelledby="quiz-view-dialog-title"
        aria-describedby="quiz-view-dialog-description"
      >
        {/* header toolbar */}
        <DialogTitle id="quiz-view-dialog-header">
          <div id="quiz-view-dialog-title-column">
            <Typography
              gutterBottom
              id="quiz-view-dialog-title"
              variant="h5"
              component="div"
            >
              Quiz
              {/* Put quiz name here */}
            </Typography>
            <Typography
              gutterBottom
              id="quiz-view-dialog-description"
              variant="body1"
              component="div"
            >
              View quiz
              {/* Put quiz description here */}
            </Typography>
          </div>
          <div>
            <Button
              aria-label="close quiz"
              color="primary"
              size="large"
              variant="contained"
              onClick={() => props.handleDialogClose()}
              endIcon={<Close />}
            >
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers={true} id="quiz-view-dialog-content">
          {/* list of existing questions */}
          <div>
            <div></div>
          </div>
          {/* footer close & submit */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => console.log("previous clicked")}>
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={() => console.log("next clicked")}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QuizViewDialog;

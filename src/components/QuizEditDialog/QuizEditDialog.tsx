import "./QuizEditDialog.scss";
import { Delete } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogContent,
  DialogActions,
} from "@mui/material";

export interface QuizEditDialogProps {
  isDialogOpen: boolean;
  handleDialogClose: (id?: number) => void;
}

function QuizEditDialog(props: QuizEditDialogProps) {

  return (
    <>
      <Dialog
        open={props.isDialogOpen}
        onClose={() => props.handleDialogClose()}
        fullWidth={true}
        maxWidth={"md"}
        aria-labelledby="quiz-edit-dialog-title"
        aria-describedby="quiz-edit-dialog-description"
      >
        {/* header toolbar */}
        <DialogTitle id="quiz-edit-dialog-header">
          <div id="quiz-edit-dialog-title-column">
            <Typography
              gutterBottom
              id="quiz-edit-dialog-title"
              variant="h5"
              component="div"
            >
              Edit Quiz
            </Typography>
            <Typography
              gutterBottom
              id="quiz-edit-dialog-description"
              variant="body1"
              component="div"
            >
              Add, edit, and remove quiz questions.
            </Typography>
          </div>
          <div>
            <Button
              aria-label="delete quiz"
              color="primary"
              size="large"
              variant="contained"
              onClick={() => console.log("delete quiz clicked")}
              endIcon={<Delete />}
            >
              New
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers={true} id="quiz-edit-dialog-content">
          {/* list of existing questions */}
          <div>
            <div>
            </div>
          </div>
          {/* footer close & submit */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleDialogClose()}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() =>
              props.handleDialogClose()
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QuizEditDialog;
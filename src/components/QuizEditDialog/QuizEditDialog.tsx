import "./QuizEditDialog.scss";
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  CircleOutlined,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import EditTextDialog from "../EditTextDialog/EditTextDialog";

export interface QuizEditDialogProps {
  isDialogOpen: boolean;
  handleDialogClose: (id?: number) => void;
}

function QuizEditDialog(props: QuizEditDialogProps) {
  const [isEditTextDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleEditTextDialogOpen = (): void => {
    console.log("edit text dialog open");
    setIsEditDialogOpen(true);
  }

  const handleEditTextDialogClose = (edited?: string): void => {
    console.log("edit text dialog close: ", edited);
    setIsEditDialogOpen(false);
  }

  return (
    <>
      <Dialog
        open={props.isDialogOpen}
        onClose={() => props.handleDialogClose()}
        fullWidth={true}
        maxWidth={"md"}
        scroll="paper"
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
            <IconButton
              aria-label="delete quiz"
              color="error"
              onClick={() => console.log("delete quiz clicked")}
            >
              <Delete />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers={true} id="quiz-edit-dialog-content">
          {/* Name and description */}
          <div className="quiz-edit-dialog-quiz-title row">
            <Typography
              gutterBottom
              id="quiz-edit-dialog-quiz-title"
              variant="h5"
              component="div"
            >
              Quiz Name
            </Typography>
            <IconButton aria-label="edit-text" color="warning" onClick={() => handleEditTextDialogOpen()}>
              <Edit />
            </IconButton>
          </div>
          <div className="quiz-edit-dialog-quiz-description row">
            <Typography
              gutterBottom
              id="quiz-edit-dialog-quiz-description"
              variant="body1"
              component="div"
            >
              Quiz description and a bunch of other information
            </Typography>
            <IconButton aria-label="edit-text" color="warning" onClick={() => handleEditTextDialogOpen()}>
              <Edit />
            </IconButton>
          </div>
          <Divider />
          {/* list of existing questions */}
          <div className="quiz-edit-dialog-content-list">
            <div className="quiz-edit-dialog-content-question">
              <div className="quiz-edit-dialog-content-question-text row">
                <div className="quiz-edit-dialog-content-question-text-start-actions">
                  <IconButton>
                    <ArrowUpward />
                  </IconButton>
                  <IconButton>
                    <ArrowDownward />
                  </IconButton>
                </div>
                <Typography
                  gutterBottom
                  id="quiz-edit-dialog-content-question-text"
                  variant="h6"
                  component="div"
                >
                  Question Text
                </Typography>
                <div className="quiz-edit-dialog-content-question-text-end-actions">
                  <IconButton color="success">
                    <Add />
                  </IconButton>
                  <IconButton aria-label="edit-text" color="warning">
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete question"
                    color="error"
                    onClick={() => console.log("delete question clicked")}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
              <div className="quiz-edit-dialog-content-question-answers">
                <div className="quiz-edit-dialog-content-question-answer-row row">
                  <div className="quiz-edit-dialog-content-question-answer-row-start-actions">
                    <IconButton>
                      <CircleOutlined />
                      {/* <Circle /> */}
                    </IconButton>
                  </div>
                  <Typography
                    className="quiz-edit-dialog-content-question-answer-row-text"
                    variant="body1"
                    component="div"
                  >
                    Answer text
                  </Typography>
                  <div className="quiz-edit-dialog-content-question-answer-row-end-actions">
                    <IconButton aria-label="edit-text" color="warning">
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete question"
                      color="error"
                      onClick={() => console.log("delete question clicked")}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* footer close & submit */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleDialogClose()}>Cancel</Button>
          <Button variant="contained" onClick={() => props.handleDialogClose()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <EditTextDialog
        isDialogOpen={isEditTextDialogOpen}
        dialogTitle="Edit Text Title"
        dialogDescription="Edit this text to what you want"
        dialogFieldLabel="Text Value"
        dialogFieldValue="starting value"
        handleDialogClose={(edited?: string) => handleEditTextDialogClose(edited)}
      />
    </>
  );
}

export default QuizEditDialog;

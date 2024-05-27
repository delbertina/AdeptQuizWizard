import "./QuizViewDialog.scss";
import { Circle, CircleOutlined, Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Alert,
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
        scroll="paper"
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
            <IconButton
              aria-label="close quiz"
              color="error"
              size="large"
              onClick={() => props.handleDialogClose()}
            >
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers={true} id="quiz-view-dialog-content">
          {/* display current question */}
          <div>
            <div className="quiz-view-content-title-wrapper">
              <Typography
                gutterBottom
                id="quiz-view-dialog-title-question-text"
                variant="h6"
                component="div"
              >
                {"#1 :: " + "What is the something?"}
              </Typography>
            </div>
            <div className="quiz-view-content-questions-wrapper">
              <List>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleOutlined />
                    </ListItemIcon>
                    <ListItemText primary="a) Answer Text" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <Circle />
                    </ListItemIcon>
                    <ListItemText primary="b) Answer Text" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <CircleOutlined />
                    </ListItemIcon>
                    <ListItemText primary="c) Answer Text" />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
            <div className="quiz-view-content-questions-check row">
              <Button variant="contained">Check Answer</Button>
              <Alert severity="success">This is a success Alert.</Alert>
              {/* <Alert severity="error">This is an error Alert.</Alert> */}
            </div>
          </div>
          {/* footer close & submit */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => console.log("submit clicked")}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QuizViewDialog;

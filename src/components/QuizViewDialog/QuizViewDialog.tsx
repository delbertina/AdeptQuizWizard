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
import { Quiz } from "../../types/quiz";
import { Score } from "../../types/score";
import { useEffect, useState } from "react";

export interface QuizViewDialogProps {
  isDialogOpen: boolean;
  quiz: Quiz;
  handleDialogClose: (score?: Score) => void;
}

function QuizViewDialog(props: QuizViewDialogProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number>>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<Array<number>>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const handleQuizSubmit = (): void => {
    const correctAns = props.quiz.questions.filter((question, index) => question.correctAnswerId === checkedAnswers[index]).length;
    const totalAns = props.quiz.questions.length;
    const timestamp = Date.now().valueOf();
    const scoreStr = Math.ceil((correctAns/totalAns)*100)  + "%";
    props.handleDialogClose({
      quizId: props.quiz.id,
      result: scoreStr,
      timestamp: timestamp
    })
  }

  const handleAnswerSelect = (questionId: number, answerId: number): void => {
    console.log("handle answer select: ", questionId, answerId);
    let tempAnswers = selectedAnswers;
    tempAnswers[questionId] = answerId;
    setSelectedAnswers([...tempAnswers]);
  };

  const handleAnswerCheck = (questionId: number): void => {
    console.log("handle answer check: " + questionId, checkedAnswers);
    let tempAnswers = checkedAnswers;
    tempAnswers[questionId] = selectedAnswers[questionId];
    setCheckedAnswers([...tempAnswers]);
    setIsAllChecked(checkedAnswers.indexOf(-1) === -1);
  }

  useEffect(() => {
    setSelectedAnswers(Array(props.quiz.questions.length).fill(-1));
    setCheckedAnswers(Array(props.quiz.questions.length).fill(-1));
  }, [props.quiz]);

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
              {props.quiz.title}
            </Typography>
            <Typography
              gutterBottom
              id="quiz-view-dialog-description"
              variant="body1"
              component="div"
            >
              {props.quiz.description}
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
          {props.quiz.questions.map((question, qIndex) => (
            <div key={qIndex}>
              <div className="quiz-view-content-title-wrapper">
                <Typography
                  gutterBottom
                  id="quiz-view-dialog-title-question-text"
                  variant="h6"
                  component="div"
                >
                  {"#" + (qIndex + 1) + " :: " + question.text}
                </Typography>
              </div>
              <div className="quiz-view-content-questions-wrapper">
                <List>
                  {question.answers.map((answer, aIndex) => (
                    <ListItem
                      key={aIndex}
                    >
                      <ListItemButton onClick={() => handleAnswerSelect(qIndex, answer.id)} disabled={checkedAnswers.length > qIndex && checkedAnswers[qIndex] > -1} >
                        <ListItemIcon>
                          {selectedAnswers.length > qIndex &&
                            selectedAnswers[qIndex] === answer.id && <Circle />}
                          {selectedAnswers.length > qIndex &&
                            selectedAnswers[qIndex] !== answer.id && (
                              <CircleOutlined />
                            )}
                        </ListItemIcon>
                        <ListItemText primary={answer.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className="quiz-view-content-questions-check row">
                <Button
                  variant="contained"
                  onClick={() => handleAnswerCheck(qIndex)}
                  disabled={
                    ((selectedAnswers.length > qIndex &&
                    selectedAnswers[qIndex] === -1)
                    || (checkedAnswers.length > qIndex && checkedAnswers[qIndex] >= 0))
                  }
                >
                  Check Answer
                </Button>
                {(checkedAnswers.length > qIndex && checkedAnswers[qIndex] >= 0) && (
                  <>
                  {checkedAnswers[qIndex] === question.correctAnswerId && (
                  <Alert severity="success">{question.feedbackTrue}</Alert>
                  )}
                  {checkedAnswers[qIndex] !== question.correctAnswerId && (
                  <Alert severity="error">{question.feedbackFalse}</Alert>
                  )}
                  </>
                )}
              </div>
            </div>
          ))}
          {/* footer close & submit */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleQuizSubmit()}
            disabled={!isAllChecked}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default QuizViewDialog;

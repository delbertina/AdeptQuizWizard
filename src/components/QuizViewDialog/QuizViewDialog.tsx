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
import { useEffect, useState } from "react";
import { selectCurrentQuiz } from "../../store/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { addScore } from "../../store/scoreSlice";

export interface QuizViewDialogProps {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
}

function QuizViewDialog(props: QuizViewDialogProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number>>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<Array<number>>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const quiz = useSelector(selectCurrentQuiz);
  const dispatch = useDispatch();

  const handleQuizSubmit = (): void => {
    const correctAns = quiz.questions.filter(
      (question, index) => question.correctAnswerId === checkedAnswers[index]
    ).length;
    const totalAns = quiz.questions.length;
    const timestamp = Date.now().valueOf();
    const scoreNum = (correctAns / totalAns) * 100;
    const newScore = {
      id: 0,
      quizId: quiz.id,
      result: scoreNum,
      timestamp: timestamp,
    };
    dispatch(addScore(newScore));
    props.handleDialogClose();
  };

  const handleAnswerSelect = (questionId: number, answerId: number): void => {
    let tempAnswers = selectedAnswers;
    tempAnswers[questionId] = answerId;
    setSelectedAnswers([...tempAnswers]);
  };

  const handleAnswerCheck = (questionId: number): void => {
    let tempAnswers = checkedAnswers;
    tempAnswers[questionId] = selectedAnswers[questionId];
    setCheckedAnswers([...tempAnswers]);
    setIsAllChecked(checkedAnswers.indexOf(-1) === -1);
  };

  useEffect(() => {
    setSelectedAnswers(Array(quiz.questions.length).fill(-1));
    setCheckedAnswers(Array(quiz.questions.length).fill(-1));
  }, [quiz]);

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
              {quiz.title}
            </Typography>
            <Typography
              gutterBottom
              id="quiz-view-dialog-description"
              variant="body1"
              component="div"
            >
              {quiz.description}
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
          {quiz.questions.map((question, qIndex) => (
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
                    <ListItem key={aIndex}>
                      <ListItemButton
                        onClick={() => handleAnswerSelect(qIndex, answer.id)}
                        disabled={
                          checkedAnswers.length > qIndex &&
                          checkedAnswers[qIndex] > -1
                        }
                      >
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
                {checkedAnswers[qIndex] === -1 && (
                  <Button
                    variant="contained"
                    onClick={() => handleAnswerCheck(qIndex)}
                    disabled={
                      (selectedAnswers.length > qIndex &&
                        selectedAnswers[qIndex] === -1) ||
                      (checkedAnswers.length > qIndex &&
                        checkedAnswers[qIndex] >= 0)
                    }
                  >
                    Check Answer
                  </Button>
                )}
                {checkedAnswers.length > qIndex &&
                  checkedAnswers[qIndex] >= 0 && (
                    <>
                      {checkedAnswers[qIndex] === question.correctAnswerId && (
                        <Alert
                          className="quiz-view-content-questions-check-alert"
                          severity="success"
                        >
                          {question.feedbackTrue}
                        </Alert>
                      )}
                      {checkedAnswers[qIndex] !== question.correctAnswerId && (
                        <Alert
                          className="quiz-view-content-questions-check-alert"
                          severity="error"
                        >
                          {question.feedbackFalse}
                        </Alert>
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

import "./QuizEditDialog.scss";
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Circle,
  CircleOutlined,
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
import { useEffect, useState } from "react";
import EditTextDialog from "../EditTextDialog/EditTextDialog";
import { Quiz } from "../../types/quiz";

export interface QuizEditDialogProps {
  isDialogOpen: boolean;
  quiz: Quiz;
  handleDialogClose: (quiz?: Quiz) => void;
}

function QuizEditDialog(props: QuizEditDialogProps) {
  const [isEditQuizTitleDialogOpen, setIsEditQuizTitleDialogOpen] = useState<boolean>(false);
  const [isEditQuizDescDialogOpen, setIsEditQuizDescDialogOpen] = useState<boolean>(false);
  const [isEditQuesTextDialogOpen, setIsEditQuesTextDialogOpen] = useState<boolean>(false);
  const [isEditAnsTextDialogOpen, setIsEditAnsTextDialogOpen] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | undefined>();
  const [editQIndex, setEditQIndex] = useState<number>(-1);
  const [editAIndex, setEditAIndex] = useState<number>(-1);

  const handleEditQuizTitleOpen = (): void => {
    setIsEditQuizTitleDialogOpen(true);
  }

  const handleEditQuizTitle = (edited?: string): void => {
    setIsEditQuizTitleDialogOpen(false);
    const tempQuiz = quiz;
    if(!!tempQuiz && !!edited) {
      tempQuiz.title = edited;
      setQuiz(tempQuiz);
    }
  };

  const handleEditQuizDescriptionOpen = (): void => {
    setIsEditQuizDescDialogOpen(true);
  };

  const handleEditQuizDescription = (edited?: string): void => {
    setIsEditQuizDescDialogOpen(false);
    const tempQuiz = quiz;
    if(!!tempQuiz && !!edited) {
      tempQuiz.description = edited;
      setQuiz(tempQuiz);
    }
  };

  const handleEditQuestionTextOpen = (qIndex: number): void => {
    setIsEditQuesTextDialogOpen(true);
    setEditQIndex(qIndex);
  }

  const handleEditQuestionText = (edited?: string): void => {
    setIsEditQuesTextDialogOpen(false);
    const tempQuiz = quiz;
    if(!!tempQuiz && !!edited) {
      tempQuiz.questions[editQIndex].text = edited;
      setQuiz(tempQuiz);
    }
    setEditQIndex(-1);
  };

  const handleEditAnswerTextOpen = (qIndex: number, aIndex: number): void => {
    setIsEditAnsTextDialogOpen(true);
    setEditQIndex(qIndex);
    setEditAIndex(aIndex);
  }

  const handleEditAnswerText = (edited?: string): void => {
    setIsEditAnsTextDialogOpen(false);
    const tempQuiz = quiz;
    if(!!tempQuiz && !!edited) {
      tempQuiz.questions[editQIndex].answers[editAIndex].text = edited;
      setQuiz(tempQuiz);
    }
    setEditQIndex(-1);
    setEditAIndex(-1);
  };

  const handleAddQuestion = (): void => {
    if (!quiz){
      return;
    }
    const tempQuiz = quiz;
    const maxIndex = Math.max(...tempQuiz.questions.map(question => question.id));
    const newQuestion = {id: maxIndex + 1, text: "New Question", answers: [], feedbackTrue: "Correct!", feedbackFalse: "Incorrect!", correctAnswerId: -1};
    tempQuiz.questions = [newQuestion, ...tempQuiz?.questions];
    setQuiz({...tempQuiz});
  }

  const handleAddAnswer = (qIndex: number): void => {
    if (!quiz){
      return;
    }
    const tempQuiz = quiz;
    const maxIndex = Math.max(...(tempQuiz?.questions[qIndex].answers.map(answer => answer.id))??[0]);
    tempQuiz?.questions[qIndex].answers.push({id: maxIndex + 1, text: "New Answer"});
    setQuiz({...tempQuiz});
  }

  const handleSelectCorrectAnswer = (qindex: number, aindex: number): void => {
    console.log("handle select correct ", qindex, aindex);
    if(!quiz) {
      return;
    }
    const tempQuiz = quiz;
    tempQuiz.questions[qindex].correctAnswerId = aindex;
    setQuiz(tempQuiz);
  }

  useEffect(() => {
    setQuiz(props.quiz);
  }, [props.quiz]);

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
              aria-label="add question"
              color="error"
              onClick={() => handleAddQuestion()}
            >
              <Add />
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
              {quiz?.title}
            </Typography>
            <IconButton
              aria-label="edit-text"
              color="warning"
              onClick={() => handleEditQuizTitleOpen()}
            >
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
              {quiz?.description}
            </Typography>
            <IconButton
              aria-label="edit-text"
              color="warning"
              onClick={() => handleEditQuizDescriptionOpen()}
            >
              <Edit />
            </IconButton>
          </div>
          <Divider />
          {/* list of existing questions */}
          <div className="quiz-edit-dialog-content-list">
            {quiz?.questions.map((question, qindex) => (
            <div className="quiz-edit-dialog-content-question" key={qindex}>
              <div className="quiz-edit-dialog-content-question-text row">
                <div className="quiz-edit-dialog-content-question-text-start-actions">
                  <IconButton disabled={true}>
                    <ArrowUpward />
                  </IconButton>
                  <IconButton disabled={true}>
                    <ArrowDownward />
                  </IconButton>
                </div>
                <Typography
                  gutterBottom
                  id="quiz-edit-dialog-content-question-text"
                  variant="h6"
                  component="div"
                >
                  {question.text}
                </Typography>
                <div className="quiz-edit-dialog-content-question-text-end-actions">
                  <IconButton color="success" onClick={() => handleAddAnswer(qindex)}>
                    <Add />
                  </IconButton>
                  <IconButton aria-label="edit-text" color="warning" onClick={() => handleEditQuestionTextOpen(qindex)}>
                    <Edit />
                  </IconButton>
                  {/* <IconButton
                    aria-label="delete question"
                    color="error"
                    disabled={true}
                    onClick={() => console.log("delete question clicked")}
                  >
                    <Delete />
                  </IconButton> */}
                </div>
              </div>
            
              <div className="quiz-edit-dialog-content-question-answers">
                {question.answers.map((answer, aindex) => (
                <div className="quiz-edit-dialog-content-question-answer-row row" key={aindex}>
                  <div className="quiz-edit-dialog-content-question-answer-row-start-actions">
                    <IconButton onClick={() => handleSelectCorrectAnswer(qindex, aindex)}>
                      {answer.id === question.correctAnswerId && (
                        <Circle />
                      )}
                      {answer.id !== question.correctAnswerId && (
                      <CircleOutlined />
                      )}
                    </IconButton>
                  </div>
                  <Typography
                    className="quiz-edit-dialog-content-question-answer-row-text"
                    variant="body1"
                    component="div"
                  >
                    {answer.text}
                  </Typography>
                  <div className="quiz-edit-dialog-content-question-answer-row-end-actions">
                    <IconButton aria-label="edit-text" color="warning" onClick={() => handleEditAnswerTextOpen(qindex, aindex)}>
                      <Edit />
                    </IconButton>
                    {/* <IconButton
                      aria-label="delete question"
                      color="error"
                      onClick={() => console.log("delete question clicked")}
                    >
                      <Delete />
                    </IconButton> */}
                  </div>
                </div>
                ))}
              </div>
            </div>
            ))}
          </div>
          {/* footer close & submit */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleDialogClose()}>Cancel</Button>
          <Button variant="contained" onClick={() => props.handleDialogClose(quiz)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Quiz Title */}
      <EditTextDialog
        isDialogOpen={isEditQuizTitleDialogOpen}
        dialogTitle="Edit Quiz Title"
        dialogDescription="Update the title of the quiz."
        dialogFieldLabel="Quiz Title"
        dialogFieldValue={quiz?.title ?? ""}
        handleDialogClose={(edited?: string) => handleEditQuizTitle(edited)}
      />
      {/* Edit Quiz Description */}
      <EditTextDialog
        isDialogOpen={isEditQuizDescDialogOpen}
        dialogTitle="Edit Quiz Description"
        dialogDescription="Describe what this quiz is about."
        dialogFieldLabel="Quiz Description"
        dialogFieldValue={quiz?.description ?? ""}
        handleDialogClose={(edited?: string) =>
          handleEditQuizDescription(edited)
        }
      />
      {/* Edit Question Text */}
      <EditTextDialog
        isDialogOpen={isEditQuesTextDialogOpen}
        dialogTitle="Edit Question Text"
        dialogDescription="What question do you want to ask the user?"
        dialogFieldLabel="Question"
        dialogFieldValue={
          !!quiz && quiz?.questions.length > editQIndex && editQIndex !== -1
            ? quiz.questions[editQIndex].text
            : ""
        }
        handleDialogClose={(edited?: string) => handleEditQuestionText(edited)}
      />
      {/* Edit Answer Text */}
      <EditTextDialog
        isDialogOpen={isEditAnsTextDialogOpen}
        dialogTitle="Edit Answer Text"
        dialogDescription="Update the question answer option."
        dialogFieldLabel="Answer"
        dialogFieldValue={
          !!quiz &&
          quiz.questions.length > editQIndex &&
          editQIndex !== -1 &&
          quiz.questions[editQIndex].answers.length > editAIndex &&
          editAIndex !== -1
            ? quiz.questions[editQIndex].answers[editAIndex].text
            : ""
        }
        handleDialogClose={(edited?: string) => handleEditAnswerText(edited)}
      />
    </>
  );
}

export default QuizEditDialog;

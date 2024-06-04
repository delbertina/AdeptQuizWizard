import "./QuizEditDialog.scss";
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Circle,
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
  Alert,
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
  const [isEditQuizTitleDialogOpen, setIsEditQuizTitleDialogOpen] =
    useState<boolean>(false);
  const [isEditQuizDescDialogOpen, setIsEditQuizDescDialogOpen] =
    useState<boolean>(false);
  const [isEditQuesTextDialogOpen, setIsEditQuesTextDialogOpen] =
    useState<boolean>(false);
  const [isEditAnsTextDialogOpen, setIsEditAnsTextDialogOpen] =
    useState<boolean>(false);
  const [
    isEditQuesFeedbackTextDialogOpen,
    setIsEditQuesFeedbackTextDialogOpen,
  ] = useState<boolean>(false);
  const [isEditCorrectFeedback, setIsEditCorrectFeedback] =
    useState<boolean>(true);
  const [quiz, setQuiz] = useState<Quiz | undefined>();
  const [editQIndex, setEditQIndex] = useState<number>(-1);
  const [editAIndex, setEditAIndex] = useState<number>(-1);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const handleEditQuizTitleOpen = (): void => {
    setIsEditQuizTitleDialogOpen(true);
  };

  const handleEditQuizTitle = (edited?: string): void => {
    setIsEditQuizTitleDialogOpen(false);
    const tempQuiz = quiz;
    if (!!tempQuiz && !!edited) {
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
    if (!!tempQuiz && !!edited) {
      tempQuiz.description = edited;
      setQuiz(tempQuiz);
    }
  };

  const handleEditQuestionTextOpen = (qIndex: number): void => {
    setIsEditQuesTextDialogOpen(true);
    setEditQIndex(qIndex);
  };

  const handleEditQuestionText = (edited?: string): void => {
    setIsEditQuesTextDialogOpen(false);
    const tempQuiz = quiz;
    if (!!tempQuiz && !!edited) {
      tempQuiz.questions[editQIndex].text = edited;
      setQuiz(tempQuiz);
    }
    setEditQIndex(-1);
  };

  const handleEditAnswerTextOpen = (qIndex: number, aIndex: number): void => {
    setIsEditAnsTextDialogOpen(true);
    setEditQIndex(qIndex);
    setEditAIndex(aIndex);
  };

  const handleEditAnswerText = (edited?: string): void => {
    setIsEditAnsTextDialogOpen(false);
    const tempQuiz = quiz;
    if (!!tempQuiz && !!edited) {
      tempQuiz.questions[editQIndex].answers[editAIndex].text = edited;
      setQuiz(tempQuiz);
    }
    setEditQIndex(-1);
    setEditAIndex(-1);
  };

  const handleEditFeedbackTextOpen = (
    isCorrect: boolean,
    qIndex: number
  ): void => {
    setEditQIndex(qIndex);
    setIsEditCorrectFeedback(isCorrect);
    setIsEditQuesFeedbackTextDialogOpen(true);
  };

  const handleEditFeedbackTextClose = (edited?: string): void => {
    const tempQuiz = quiz;
    if (!!edited && !!tempQuiz) {
      if (!!isEditCorrectFeedback) {
        tempQuiz.questions[editQIndex].feedbackTrue = edited;
      } else {
        tempQuiz.questions[editQIndex].feedbackFalse = edited;
      }
      setQuiz({ ...tempQuiz });
    }
    setEditQIndex(-1);
    setIsEditCorrectFeedback(true);
    setIsEditQuesFeedbackTextDialogOpen(false);
  };

  const handleAddQuestion = (): void => {
    if (!quiz) {
      return;
    }
    const tempQuiz = quiz;
    const maxIndex = Math.max(
      ...tempQuiz.questions.map((question) => question.id)
    );
    const newQuestion = {
      id: maxIndex + 1,
      text: "New Question",
      answers: [],
      feedbackTrue: "Correct!",
      feedbackFalse: "Incorrect!",
      correctAnswerId: -1,
    };
    tempQuiz.questions = [newQuestion, ...tempQuiz?.questions];
    setQuiz({ ...tempQuiz });
  };

  const handleDeleteQuestion = (qIndex: number): void => {
    if (!quiz) {
      return;
    }
    const tempQuiz = quiz;
    tempQuiz.questions = tempQuiz.questions.filter(
      (question) => question.id !== qIndex
    );
    setQuiz({ ...tempQuiz });
  };

  const handleAddAnswer = (qIndex: number): void => {
    if (!quiz) {
      return;
    }
    const tempQuiz = quiz;
    const maxIndex = Math.max(
      ...tempQuiz.questions[qIndex].answers.map((answer) => answer.id),
      0
    );
    tempQuiz?.questions[qIndex].answers.push({
      id: maxIndex + 1,
      text: "New Answer",
    });
    setQuiz({ ...tempQuiz });
  };

  const handleDeleteAnswer = (qIndex: number, aIndex: number): void => {
    if (!quiz) {
      return;
    }
    const tempQuiz = quiz;
    tempQuiz.questions[qIndex].answers = tempQuiz.questions[
      qIndex
    ].answers.filter((answer) => answer.id !== aIndex);
    setQuiz({ ...tempQuiz });
  };

  const handleSelectCorrectAnswer = (qindex: number, aindex: number): void => {
    if (!quiz) {
      return;
    }
    const tempQuiz = quiz;
    tempQuiz.questions[qindex].correctAnswerId = aindex;
    setQuiz({ ...tempQuiz });
  };

  useEffect(() => {
    setIsSubmitDisabled(
      !quiz ||
        quiz.questions.length === 0 ||
        quiz.questions.map((question) => question.answers.length).indexOf(0) !==
          -1 ||
        quiz.questions
          .map((question) => question.correctAnswerId)
          .indexOf(-1) !== -1
    );
  }, [quiz]);

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
          <div className="quiz-edit-dialog-content-list-header row">
            <Typography variant="h5" component="div">
              Questions
            </Typography>
            <IconButton
              aria-label="add question"
              color="success"
              onClick={() => handleAddQuestion()}
            >
              <Add />
            </IconButton>
          </div>
          <Divider />
          {/* list of existing questions */}
          <div className="quiz-edit-dialog-content-list">
            {quiz?.questions.map((question, qindex) => (
              <div className="quiz-edit-dialog-content-question" key={qindex}>
                <div className="quiz-edit-dialog-content-question-text row">
                  <div className="quiz-edit-dialog-content-question-start row">
                  <div className="quiz-edit-dialog-content-question-text-start-actions row">
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
                  </div>
                  <div className="quiz-edit-dialog-content-question-text-end-actions row">
                    <IconButton
                      color="success"
                      onClick={() => handleAddAnswer(qindex)}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      aria-label="edit-text"
                      color="warning"
                      onClick={() => handleEditQuestionTextOpen(qindex)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete question"
                      color="error"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
                <div className="quiz-edit-dialog-content-question-answers">
                  {question.answers.map((answer, aindex) => (
                    <div
                      className="quiz-edit-dialog-content-question-answer-row row"
                      key={aindex}
                    >
                      <div className="quiz-edit-dialog-content-question-answer-row-start-actions">
                        <IconButton
                          onClick={() =>
                            handleSelectCorrectAnswer(qindex, answer.id)
                          }
                        >
                          {answer.id ===
                            quiz.questions[qindex].correctAnswerId && (
                            <Circle />
                          )}
                          {answer.id !==
                            quiz.questions[qindex].correctAnswerId && (
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
                        <IconButton
                          aria-label="edit-text"
                          color="warning"
                          onClick={() =>
                            handleEditAnswerTextOpen(qindex, aindex)
                          }
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete question"
                          color="error"
                          onClick={() => handleDeleteAnswer(qindex, answer.id)}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="quiz-edit-dialog-content-question-feedback">
                  <div className="quiz-edit-dialog-content-question-feedback-row row">
                    <Alert
                      className="quiz-edit-dialog-feedback-alert"
                      severity="success"
                    >
                      {question.feedbackTrue}
                    </Alert>
                    <div>
                      <IconButton
                        aria-label="edit-correct-feedback"
                        color="warning"
                        onClick={() => handleEditFeedbackTextOpen(true, qindex)}
                      >
                        <Edit />
                      </IconButton>
                    </div>
                  </div>
                  <div className="quiz-edit-dialog-content-question-feedback-row row">
                    <Alert
                      className="quiz-edit-dialog-feedback-alert"
                      severity="error"
                    >
                      {question.feedbackFalse}
                    </Alert>
                    <div>
                      <IconButton
                        aria-label="edit-false-feedback"
                        color="warning"
                        onClick={() =>
                          handleEditFeedbackTextOpen(false, qindex)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* footer close & submit */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleDialogClose()}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => props.handleDialogClose(quiz)}
            disabled={isSubmitDisabled}
          >
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
      {/* Edit Question Feedback */}
      <EditTextDialog
        isDialogOpen={isEditQuesFeedbackTextDialogOpen}
        dialogTitle="Edit Question Feedback"
        dialogDescription={
          "What feedback should the user get when they answer " +
          (isEditCorrectFeedback ? "correctly" : "incorrectly") +
          "?"
        }
        dialogFieldLabel="Feedback"
        dialogFieldValue={
          !!quiz && quiz?.questions.length > editQIndex && editQIndex !== -1
            ? isEditCorrectFeedback
              ? quiz.questions[editQIndex].feedbackTrue
              : quiz.questions[editQIndex].feedbackFalse
            : ""
        }
        handleDialogClose={(edited?: string) =>
          handleEditFeedbackTextClose(edited)
        }
      />
    </>
  );
}

export default QuizEditDialog;

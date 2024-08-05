import "./App.scss";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import QuizEditDialog from "./components/QuizEditDialog/QuizEditDialog";
import QuizViewDialog from "./components/QuizViewDialog/QuizViewDialog";
import { NewQuiz, Quiz } from "./types/quiz";
import HomePage from "./pages/HomePage/HomePage";
import QuizScoreDialog from "./components/QuizScoreDialog/QuizScoreDialog";
import { useSelector, useDispatch } from "react-redux";
import { selectQuizzes, setCurrentQuiz } from "./store/quizSlice";
import { selectScores } from "./store/scoreSlice";
import { selectDialog, setDialog } from "./store/dialogSlice";
import { DIALOG_NAME } from "./types/dialog";

function App() {
  const quizzes = useSelector(selectQuizzes);
  const scores = useSelector(selectScores);
  const dialog = useSelector(selectDialog);
  const dispatch = useDispatch();

  const closeDialog = (): void => {
    dispatch(setDialog(null));
    dispatch(setCurrentQuiz(NewQuiz));
  };

  const handleDialogOpen = (quiz: Quiz, dialog: DIALOG_NAME): void => {
    dispatch(setDialog(dialog));
    dispatch(setCurrentQuiz(quiz));
  };

  const handleAddNewQuiz = (): void => {
    handleDialogOpen(NewQuiz, DIALOG_NAME.QUIZ_EDIT);
  };

  return (
    <div className="App">
      <div className="App-content">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Adept Quiz Wizard
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              onClick={() => handleAddNewQuiz()}
              color="inherit"
            >
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* {JSON.stringify(quizzes)} */}
        <HomePage
          quizzes={quizzes}
          scores={scores}
          onQuizClick={(quiz: Quiz) =>
            handleDialogOpen(quiz, DIALOG_NAME.QUIZ_VIEW)
          }
          onQuizEditClick={(quiz: Quiz) =>
            handleDialogOpen(quiz, DIALOG_NAME.QUIZ_EDIT)
          }
          onQuizScoreClick={(quiz: Quiz) =>
            handleDialogOpen(quiz, DIALOG_NAME.SCORE_VIEW)
          }
        />
      </div>
      {dialog ?? "null"}
      {!!dialog && (
        <>
          {dialog === DIALOG_NAME.QUIZ_EDIT && (
            <QuizEditDialog
              isDialogOpen={dialog === DIALOG_NAME.QUIZ_EDIT}
              handleDialogClose={() => closeDialog()}
            />
          )}
          {dialog === DIALOG_NAME.QUIZ_VIEW && (
            <QuizViewDialog
              isDialogOpen={dialog === DIALOG_NAME.QUIZ_VIEW}
              handleDialogClose={() => closeDialog()}
            />
          )}
          {dialog === DIALOG_NAME.SCORE_VIEW && (
            <>
              <QuizScoreDialog
                isDialogOpen={dialog === DIALOG_NAME.SCORE_VIEW}
                handleDialogClose={() => closeDialog()}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;

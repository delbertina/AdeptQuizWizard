import "./App.scss";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import QuizEditDialog from "./components/QuizEditDialog/QuizEditDialog";
import QuizViewDialog from "./components/QuizViewDialog/QuizViewDialog";
import { NewQuiz, Quiz } from "./types/quiz";
import { Score } from "./types/score";
import HomePage from "./pages/HomePage/HomePage";
import QuizScoreDialog from "./components/QuizScoreDialog/QuizScoreDialog";
import { useSelector, useDispatch } from "react-redux";
import { selectQuizzes, setCurrentQuiz, updateQuiz} from './store/quizSlice';
import { addScore,  selectScores } from "./store/scoreSlice";
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
  }

  const handleEditDialogOpen = (quiz: Quiz): void => {
    console.log("test")
    dispatch(setDialog(DIALOG_NAME.QUIZ_EDIT));
    dispatch(setCurrentQuiz(quiz));
  };

  const handleEditDialogClose = (newQuiz?: Quiz): void => {
    if (!!newQuiz) {
      dispatch(updateQuiz(newQuiz));
    }
    closeDialog();
  };

  const handleViewDialogOpen = (quiz: Quiz): void => {
    console.log("test")
    dispatch(setDialog(DIALOG_NAME.QUIZ_VIEW));
    dispatch(setCurrentQuiz(quiz));
  };

  const handleViewDialogClose = (score?: Score): void => {
    if (!!score) {
      dispatch(addScore(score));
    }
    closeDialog();
  };

  const handleScoreDialogOpen = (quiz: Quiz): void => {
    console.log("test")
    dispatch(setDialog(DIALOG_NAME.SCORE_VIEW));
    dispatch(setCurrentQuiz(quiz));
  };

  const handleScoreDialogClose = (): void => {
    closeDialog();
  };

  const handleAddNewQuiz = (): void => {
    handleEditDialogOpen(NewQuiz);
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
          onQuizClick={(quiz: Quiz) => handleViewDialogOpen(quiz)}
          onQuizEditClick={(quiz: Quiz) => handleEditDialogOpen(quiz)}
          onQuizScoreClick={(quiz: Quiz) => handleScoreDialogOpen(quiz)}
        />
      </div>
      {dialog ?? "null"}
      {!!dialog && (
        <>
          {dialog === DIALOG_NAME.QUIZ_EDIT && (
            <QuizEditDialog
              isDialogOpen={dialog === DIALOG_NAME.QUIZ_EDIT}
              handleDialogClose={(quiz?: Quiz) => handleEditDialogClose(quiz)}
            />
          )}
          {dialog === DIALOG_NAME.QUIZ_VIEW && (
            <QuizViewDialog
              isDialogOpen={dialog === DIALOG_NAME.QUIZ_VIEW}
              handleDialogClose={(score?: Score) =>
                handleViewDialogClose(score)
              }
            />
          )}
          {dialog === DIALOG_NAME.SCORE_VIEW && (
            <>
              <QuizScoreDialog
                isDialogOpen={dialog === DIALOG_NAME.SCORE_VIEW}
                handleDialogClose={() => handleScoreDialogClose()}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;

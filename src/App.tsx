import "./App.scss";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import QuizEditDialog from "./components/QuizEditDialog/QuizEditDialog";
import QuizViewDialog from "./components/QuizViewDialog/QuizViewDialog";
import { NewQuiz } from "./types/quiz";
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

  const handleAddNewQuiz = (): void => {
    dispatch(setDialog(DIALOG_NAME.QUIZ_EDIT));
    dispatch(setCurrentQuiz(NewQuiz));
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
              data-testid="app-add-new-quiz-button"
              aria-label="account of current user"
              onClick={() => handleAddNewQuiz()}
              color="inherit"
            >
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* {JSON.stringify(quizzes)} */}
        <HomePage quizzes={quizzes} scores={scores} />
      </div>
      {!!dialog && (
        <>
          {dialog === DIALOG_NAME.QUIZ_EDIT && <QuizEditDialog />}
          {dialog === DIALOG_NAME.QUIZ_VIEW && <QuizViewDialog />}
          {dialog === DIALOG_NAME.SCORE_VIEW && <QuizScoreDialog />}
        </>
      )}
    </div>
  );
}

export default App;

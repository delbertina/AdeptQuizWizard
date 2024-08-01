import { useState } from "react";
import "./App.scss";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import QuizEditDialog from "./components/QuizEditDialog/QuizEditDialog";
import QuizViewDialog from "./components/QuizViewDialog/QuizViewDialog";
import { Quiz } from "./types/quiz";
import { Quizzes } from "./data/quizzes";
import { Score } from "./types/score";
import HomePage from "./pages/HomePage/HomePage";
import { Scores } from "./data/scores";
import QuizScoreDialog from "./components/QuizScoreDialog/QuizScoreDialog";

function App() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [isScoreDialogOpen, setIsScoreDialogOpen] = useState<boolean>(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | undefined>();
  const [quizzes, setQuizzes] = useState<Array<Quiz>>(Quizzes);
  const [scores, setScores] = useState<Array<Score>>(Scores);

  const handleEditDialogOpen = (quiz: Quiz): void => {
    setIsEditDialogOpen(true);
    setCurrentQuiz(quiz);
  };

  const handleEditDialogClose = (newQuiz?: Quiz): void => {
    if (!!newQuiz) {
      const tempQuizzes = quizzes;
      const filteredQuizzes = tempQuizzes.filter(
        (quiz) => quiz.id !== newQuiz.id
      );
      setQuizzes([newQuiz, ...filteredQuizzes]);
    }
    setIsEditDialogOpen(false);
    setCurrentQuiz(undefined);
  };

  const handleViewDialogOpen = (quiz: Quiz): void => {
    setIsViewDialogOpen(true);
    setCurrentQuiz(quiz);
  };

  const handleViewDialogClose = (score?: Score): void => {
    setIsViewDialogOpen(false);
    setCurrentQuiz(undefined);

    if (!!score) {
      setScores([...scores, score]);
    }
  };

  const handleScoreDialogOpen = (quiz: Quiz): void => {
    setIsScoreDialogOpen(true);
    setCurrentQuiz(quiz);
  };

  const handleScoreDialogClose = (): void => {
    setIsScoreDialogOpen(false);
    setCurrentQuiz(undefined);
  };

  const handleAddNewQuiz = (): void => {
    const maxIndex = Math.max(...quizzes.map((quiz) => quiz.id));
    const newQuiz: Quiz = {
      id: maxIndex + 1,
      title: "New Quiz",
      description: "New Quiz Description",
      created: 0,
      modified: 0,
      questions: [],
      videoURL: "",
    };
    handleEditDialogOpen(newQuiz);
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
        <HomePage
          quizzes={quizzes}
          scores={scores}
          onQuizClick={(quiz: Quiz) => handleViewDialogOpen(quiz)}
          onQuizEditClick={(quiz: Quiz) => handleEditDialogOpen(quiz)}
          onQuizScoreClick={(quiz: Quiz) => handleScoreDialogOpen(quiz)}
        />
      </div>
      {!!currentQuiz && (
        <>
          {!!isEditDialogOpen && (
            <QuizEditDialog
              isDialogOpen={isEditDialogOpen}
              quiz={currentQuiz}
              handleDialogClose={(quiz?: Quiz) => handleEditDialogClose(quiz)}
            />
          )}
          {!!isViewDialogOpen && (
            <QuizViewDialog
              isDialogOpen={isViewDialogOpen}
              quiz={currentQuiz}
              handleDialogClose={(score?: Score) =>
                handleViewDialogClose(score)
              }
            />
          )}
          {!!isScoreDialogOpen && (
            <>
              <QuizScoreDialog
                isDialogOpen={isScoreDialogOpen}
                quiz={currentQuiz}
                scores={scores.filter(
                  (score) => score.quizId === currentQuiz.id
                )}
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

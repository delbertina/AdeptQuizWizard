import { useState } from "react";
import "./App.scss";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import QuizCard from "./components/QuizCard/QuizCard";
import QuizEditDialog from "./components/QuizEditDialog/QuizEditDialog";
import QuizViewDialog from "./components/QuizViewDialog/QuizViewDialog";
import { Quiz } from "./types/quiz";
import { Quizzes } from "./data/quizzes";
import { Score } from "./types/score";

function App() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | undefined>();
  const [quizzes, setQuizzes] = useState<Array<Quiz>>(Quizzes);

  const handleEditDialogOpen = (quiz: Quiz): void => {
    setIsEditDialogOpen(true);
    setCurrentQuiz(quiz);
  };

  const handleEditDialogClose = (newQuiz?: Quiz): void => {
    console.log("edit dialog close: ", newQuiz);
    if (!!newQuiz) {
      const tempQuizzes = quizzes;
      tempQuizzes.filter((quiz) => quiz.id === newQuiz.id);
      setQuizzes([newQuiz, ...tempQuizzes]);
    }
    setIsEditDialogOpen(false);
    setCurrentQuiz(undefined);
  };

  const handleViewDialogOpen = (quiz: Quiz): void => {
    setIsViewDialogOpen(true);
    setCurrentQuiz(quiz);
  };

  const handleViewDialogClose = (score?: Score): void => {
    console.log("edit dialog close: ", score);
    setIsViewDialogOpen(false);
    setCurrentQuiz(undefined);
  };

  const handleAddNewQuiz = (): void => {
    const maxIndex = Math.max(...quizzes.map(quiz => quiz.id));
    const newQuiz: Quiz = {
      id: maxIndex + 1,
      title: "New Quiz",
      description: "New Quiz Description",
      created: 0,
      modified: 0,
      questions: [],
      videoURL: ""
    };
    handleEditDialogOpen(newQuiz);
  }

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
        <div className="row quiz-display-row">
          {quizzes.sort((a,b) => b.modified - a.modified).map((quiz, index) => (
            <QuizCard
              key={index}
              title={quiz.title}
              description={quiz.description}
              score="94%"
              onClick={() => handleViewDialogOpen(quiz)}
              onEditClick={() => handleEditDialogOpen(quiz)}
            ></QuizCard>
          ))}
        </div>
      </div>
      {!!currentQuiz && (
<>
        <QuizEditDialog
        isDialogOpen={isEditDialogOpen}
        quiz={currentQuiz}
        handleDialogClose={(quiz?: Quiz) => handleEditDialogClose(quiz)}
        />
      <QuizViewDialog
      isDialogOpen={isViewDialogOpen}
      quiz={currentQuiz}
      handleDialogClose={(score?: Score) => handleViewDialogClose(score)}
      />
      </>
    )}
    </div>
  );
}

export default App;

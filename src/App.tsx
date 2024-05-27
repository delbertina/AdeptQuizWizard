import { useState } from "react";
import "./App.scss";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import QuizCard from "./components/QuizCard/QuizCard";
import QuizEditDialog from "./components/QuizEditDialog/QuizEditDialog";
import QuizViewDialog from "./components/QuizViewDialog/QuizViewDialog";

function App() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [currentQuiz, setCurrentQuiz] = useState<number>(0)
  const [quizzes, setQuizzes] = useState<Array<any>>([
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
  ]);

  const handleEditDialogOpen = (id: number): void => {
    setIsEditDialogOpen(true);
    setCurrentQuiz(id);
  }

  const handleEditDialogClose = (id?: number): void => {
    console.log("edit dialog close: ", id);
    setIsEditDialogOpen(false);
    setCurrentQuiz(0);
  }

  const handleViewDialogOpen = (id: number): void => {
    setIsViewDialogOpen(true);
    setCurrentQuiz(id);
  }

  const handleViewDialogClose = (id?: number): void => {
    console.log("edit dialog close: ", id);
    setIsViewDialogOpen(false);
    setCurrentQuiz(0);
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
              onClick={() => console.log("add button clicked")}
              color="inherit"
            >
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="row quiz-display-row">
          {quizzes.map((quiz, index) => (
            <QuizCard
              key={index}
              title={"super duper long quiz name"}
              description="something a long description of the quiz something a long description of the quiz something a long description of the quiz something a long description of the quiz"
              score="94%"
              onClick={() => handleViewDialogOpen(index)}
              onEditClick={() => handleEditDialogOpen(index)}
            ></QuizCard>
          ))}
        </div>
      </div>
      <QuizEditDialog
        isDialogOpen={isEditDialogOpen}
        handleDialogClose={(index?: number) => handleEditDialogClose(index)}
      />
      <QuizViewDialog
        isDialogOpen={isViewDialogOpen}
        handleDialogClose={(index?: number) => handleViewDialogClose(index)}
      />
    </div>
  );
}

export default App;

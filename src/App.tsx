import { useState } from "react";
import "./App.scss";
import { Add } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import QuizCard from "./components/QuizCard/QuizCard";

function App() {
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
              title={quiz}
              onClick={() => console.log("clicked quiz card: " + index)}
            ></QuizCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

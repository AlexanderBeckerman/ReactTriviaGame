import React, { useEffect, useState } from "react";
import StartScreen from "./components/start";
import Game from "./components/game";

// https://opentdb.com/api_config.php - api link

function App() {
  const [inGame, setInGame] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [numQuestions, setNumQuestions] = useState(6);

  function fetchData() {
    fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`)
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data.results);
      });
  }

  useEffect(() => {
    setCorrectAnswers(0);
  }, [quizData]);

  function revealAnswers(show) {
    setShowAnswers(show);
  }

  function playGame() {
    revealAnswers(false);
    fetchData();
    setInGame(true);
  }
  function showScore() {
    setCorrectAnswers((prevAns) => prevAns + 1);
  }
  function handleChange(event) {
    const { value } = event.target;
    setNumQuestions(value);
  }

  const home = () => setInGame(false);

  const quizElements = quizData.map((data, index) => {
    return (
      <Game
        key={index}
        question={data.question}
        answers={data.incorrect_answers}
        correct_answer={data.correct_answer}
        revealAnswers={showAnswers}
        showScore={showScore}
      />
    );
  });

  function renderSelect() {
    return (
      <div>
        <header>SELECT NUMBER OF QUESTIONS</header>
        <select
          className="number-select"
          id="numOfQuestions"
          value={numQuestions}
          name="numQuestions"
          onChange={handleChange}
        >
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
    );
  }

  return (
    <main>
      <div className="start-div">
        {!inGame && <StartScreen play={playGame} />}
        {!inGame && renderSelect()}
      </div>
      <div className="game-container">{inGame && quizElements}</div>
      {inGame && (
        <div className="check-answers-container">
          <button
            className="check-answers-btn"
            onClick={() => revealAnswers(true)}
          >
            CHECK ANSWERS
          </button>
          <button className="check-answers-btn" onClick={playGame}>
            NEW GAME
          </button>
          <button className="check-answers-btn" onClick={home}>
            HOME
          </button>
          {showAnswers && (
            <p>
              YOU GOT {correctAnswers}/{numQuestions} RIGHT!
            </p>
          )}
        </div>
      )}
    </main>
  );
}

export default App;

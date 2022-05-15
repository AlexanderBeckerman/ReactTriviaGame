import React from "react";

export default function Answers(props) {
  function determineColor() {
    if (props.isCorrect && props.revealAns) {
      return { backgroundColor: "green" };
    } else if (props.isChosen && props.isRight === -1 && props.revealAns) {
      return { backgroundColor: "red" };
    } else if (props.isChosen && !props.revealAns) {
      return { backgroundColor: "cyan" };
    } else return { backgroundColor: "white" };
  }

  function canAnswer() {
    return props.revealAns ? "" : props.chooseAnswer();
  }

  const styles = determineColor();
  return (
    <div>
      <button onClick={canAnswer} className="answer-btn" style={styles}>
        {props.answer}
      </button>
    </div>
  );
}

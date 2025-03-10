import { useReducer } from "react";
import { quizQuestions } from "../utils/data";
import "../index.css"; // Import the stylesheet
import Button from "../utils/Button";
import Title from "./Title";
import { motion } from "framer-motion";
import { defaultAnimation } from "../utils/animations.js";

const shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5);

const initialState = {
  questions: shuffledQuestions,
  status: "active",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
      };

    default:
      throw new Error("action unknow");
  }
}

function Quiz() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const currentQuestion = questions[index];
  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 0 && percentage < 50) emoji = "🎉";
  if (percentage === 0) emoji = "😭";

  return (
    <motion.div
      variants={defaultAnimation}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      id="quiz"
      className="text-textsize py-16 bg-bgcolor flex flex-col items-center justify-center px-6"
    >
      <Title title="Smart Quiz" />

      <div className="w-full hover:shadow-xl transition text-dark shadow-custom max-w-2xl h-fit bg-white p-5 sm:p-8 rounded-custom ">
        {status === "active" && (
          <section>
            {/* progress bar */}
            <div className="mb-6">
              <progress
                className="progress-bar w-full h-3 rounded-custom bg-grayOne/50"
                max={numQuestions}
                value={index + Number(answer !== null)}
              />
              <div className="mt-1 text-dark/70 text-sm flex justify-between">
                <p>
                  Question <span>{index + 1}</span> / {numQuestions}
                </p>
                <p>
                  Points: <span>{points}</span> / {maxPossiblePoints}
                </p>
              </div>
            </div>

            {/* current question */}
            <div className="mb-6">
              <h4 className="font-titles tracking-wide font-thin text-2xl">
                {currentQuestion.question}
              </h4>
            </div>

            {/* answer options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, optionIndex) => (
                <button
                  key={option}
                  onClick={() =>
                    dispatch({ type: "newAnswer", payload: optionIndex })
                  }
                  className={`w-full py-3 px-4 rounded-custom text-left border-2 ${
                    // highlight selected answer
                    optionIndex === answer
                      ? optionIndex === currentQuestion.correctOption
                        ? "bg-primary/10 border-primary/50" // correct selected answer
                        : "bg-alert/10 border-alert/30" // incorrect selected answer
                      : "bg-gray-50 border-grayOne"
                  } ${
                    // highlight correct answer when an incorrect answer is selected
                    answer !== null &&
                    optionIndex === currentQuestion.correctOption &&
                    optionIndex !== answer
                      ? "bg-primary/15 border-primary/80"
                      : ""
                  } ${
                    // dim non-selected options after answering
                    answer !== null && optionIndex !== answer
                      ? "opacity-60"
                      : ""
                  }`}
                  disabled={answer !== null} // disable buttons after answering
                >
                  {option}
                </button>
              ))}
            </div>

            {/* next/finish button */}
            <Button
              className="mt-6 py-2.5 w-full disabled:cursor-not-allowed disabled:!bg-gray-300 disabled:hover:bg-gray-300"
              disabled={answer === null}
              onClick={() =>
                dispatch({
                  type: index < numQuestions - 1 ? "nextQuestion" : "finish",
                })
              }
            >
              {index < numQuestions - 1 ? "Next" : "Finish"}
            </Button>
          </section>
        )}

        {/* finished State */}
        {status === "finished" && (
          <div className="text-center py-20">
            <p className="mb-4 text-xl">
              <span>{emoji}</span> You scored <span>{points} points</span> out
              of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>

            <p className="mb-6 text-xl">Highscore: {highscore} points</p>

            <Button
              onClick={() => dispatch({ type: "restart" })}
              className="w-48"
            >
              Restart Quiz
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Quiz;

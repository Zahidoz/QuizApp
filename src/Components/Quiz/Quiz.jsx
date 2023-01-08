import { React, useState, useEffect, useRef } from "react";
import "./Quiz.scss";
import data from "../../Data/api.json";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const optionCategory = useRef();

  const navigate = useNavigate();

  const [filteredArr, setFilteredArr] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState('');
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(0);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [questionsChoose, setquestionsChoose] = useState(true);
  const [checkedState, setCheckedState] = useState(Array(10).fill(-1));
  
  const categoryHandle = (e) => {
    setCategory(e.target.value);
      const filteredArray = data.filter(
        (api) => api.category === e.target.value
      );
      setFilteredArr(filteredArray);
     console.log(filteredArray);
  };

  const difficultyHandle = (e) => {
    setDifficulty(e.target.value);
    const newFilteredArray = filteredArr.filter(
      (api) => api.difficulty === e.target.value
    );
    setFilteredArr(newFilteredArray);
    console.log(newFilteredArray);
  };

  const variantChecked = (index) => {
    setCheckedState(
      checkedState.map((variant, i) => {
        if (i === current) {
          return index;
        } else {
          return variant;
        }
      })
    );
    // if(data[current].correctAnswer === index) {
    //   console.log("duz secdin");
    // } else {
    //   console.log("sehv secdin");
    // }
  };

  useEffect(() => {
    let inpts = document.querySelectorAll("input");
    for (var i = 0; i < inpts.length; i++) {
      inpts[i].checked = false;
    }
    if (checkedState[current] !== -1) {
      inpts[checkedState[current]].checked = true;
    }
    console.log(checkedState);
  }, [current]);

  const ComeBack = () => {
    setResult(0);
    setIsSubmitClicked(false);
    navigate("/");
  };
  const StartQuiz = () => {
    setquestionsChoose(false);
  };
  const onSubmitClicked = () => {
    let x = 0;
    for (let i = 0; i < 10; i++) {
      if (data[i].correct_answer === checkedState[i]) {
        setResult(++x);
      }
    }
    console.log(x);
    setCheckedState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    setIsSubmitClicked(true);
  };

  return (
    <div className="quiz-c">
      {questionsChoose && (
        <div>
          <h1>Please choose questions count and type</h1>
          <div className="choose-category-s">
            <select onChange={(e) => categoryHandle(e)} name="" id="">
              <option value="zero">Select Category</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Art">Art</option>
              <option value="Sports">Sports</option>
              <option value="Mythology">Mythology</option>
            </select>
            <select onChange={(e) => difficultyHandle(e)} name="" id="">
              <option value="">Select Difficulty</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <div className="btn-c">
            <button
              disabled={category === "" || difficulty === ""}
              onClick={StartQuiz}
            >
              Start
            </button>
          </div>
        </div>
      )}
      {!isSubmitClicked && !questionsChoose && (
        <>
          <h1>{filteredArr[current].question}</h1>

          <ul>
            <li>
              <input
                className="radioInpt"
                onClick={() => variantChecked(0)}
                id="square1"
                name="variant"
                type="radio"
              />
              <label htmlFor="square1">
                {filteredArr[current].incorrect_answers[0]}
              </label>
            </li>
            <li>
              <input
                className="radioInpt"
                onClick={() => variantChecked(1)}
                id="square2"
                name="variant"
                type="radio"
              />
              <label htmlFor="square2">
                {filteredArr[current].incorrect_answers[1]}
              </label>
            </li>
            <li>
              <input
                className="radioInpt"
                onClick={() => variantChecked(2)}
                id="square3"
                name="variant"
                type="radio"
              />
              <label htmlFor="square3">
                {filteredArr[current].incorrect_answers[2]}
              </label>
            </li>
            <li>
              <input
                className="radioInpt"
                onClick={() => variantChecked(3)}
                id="square4"
                name="variant"
                type="radio"
              />
              <label htmlFor="square4">
                {filteredArr[current].incorrect_answers[3]}
              </label>
            </li>
          </ul>
          <div className="btn-c">
            {current !== 0 && (
              <button onClick={() => setCurrent(current - 1)}>Previous</button>
            )}
            {current !== 9 && (
              <button onClick={() => setCurrent(current + 1)}>Next</button>
            )}
            {current === 9 && <button onClick={onSubmitClicked}>Submit</button>}
          </div>
        </>
      )}
      {isSubmitClicked && !questionsChoose && (
        <>
          <h2>
            Your score is: <span>{result}</span>
          </h2>
          <button id="backToHomeBtn" onClick={ComeBack}>
            Return to Home Page
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;

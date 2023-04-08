import React, { useMemo, useState, useEffect } from "react";
import Option from "./Option";

const QuizItem = ({ quiz, isSubmitAssignment, setUserAnswer }) => {
  //nesting quiz
  const { id, question, options } = quiz;

  //set useState
  const [selectOption, setSelectOption] = useState({});
  const [filterData, setFilterData] = useState([]);

  //selectedOptions
  const selectedOptions = useMemo(() => {
    return quiz?.options?.slice()?.map((dt) => {
      const { id } = dt;
      return {
        quizId: quiz.id,
        id,
        isCorrect: false,
      };
    });
  }, [quiz]);
  //--
  useEffect(() => {
    const filteredQuiz = selectedOptions?.map((dt) => {
      if (dt.quizId === selectOption.quizId && dt.id === selectOption.id) {
        dt.isCorrect = selectOption?.isSelect;
      }
      return dt;
    });
    setFilterData(filteredQuiz);
  }, [selectOption]);

  const finalResult = quiz?.options?.every((obj1) => {
    const matchingObj = filterData.find((obj2) => obj2.id === obj1.id);
    return matchingObj && matchingObj.isCorrect === obj1.isCorrect;
  });

  //set data
  useEffect(() => {
    setUserAnswer({ quizId: id, answer: finalResult });
  }, [finalResult]);

  return (
    <div className="quiz">
      <h4 className="question">{question}</h4>
      <form className="quizOptions">
        {options.map((op) => (
          <label key={op.id} htmlFor={`option${op.id}_q${id}`}  >
            <Option
              setSelectOption={setSelectOption}
              isSubmitAssignment={isSubmitAssignment}
              id={id}
              op={op}
            />
            {op.option}
          </label>
        ))}
      </form>
    </div>
  );
};

export default QuizItem;

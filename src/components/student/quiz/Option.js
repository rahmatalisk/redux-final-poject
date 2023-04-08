import React, { useEffect, useState } from "react";

const Option = ({ op, id, isSubmitAssignment, setSelectOption }) => {

  //set useState
  const [isChecked, setIsChecked] = useState(false);

  //set data
  useEffect(()=>{
    setSelectOption({id:op.id,quizId:id,isSelect:isChecked})
  },[isChecked])

  return (
    <input
      onChange={(e) => setIsChecked(e.target.checked)}
      type="checkbox"
      checked={isSubmitAssignment.id ? op?.isCorrect : isChecked}
      id={`option${op.id}_q${id}`}
    />
  );
};

export default Option;

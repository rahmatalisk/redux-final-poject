import React from "react";

const LeaderBoardItem = ({ assignment, rank }) => {
  //nesting object
  const { student_name, assignmentMark, quizMark, totalMark } =
    assignment || {};
  return (
    <tr className="border-b border-slate-600/50">
      <th className="table-th !text-center">{rank}</th>
      <th className="table-th !text-center">{student_name}</th>
      <th className="table-th !text-center">{quizMark}</th>
      <th className="table-th !text-center">{assignmentMark}</th>
      <th className="table-th !text-center">{totalMark}</th>
    </tr>
  );
};

export default LeaderBoardItem;

import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../../features/AssignmentMark/AssignmentMarkApi";
import { toast } from "react-toastify";

const AssignmentMarkItem = ({ assignmentMarkDetail }) => {
  //set useState
  const [inputMark, setInputMark] = useState(0);

  //get data and mutation
  const [editAssignmentMark, {}] = useEditAssignmentMarkMutation();

  //nesting object
  const {
    student_name,
    title,
    repo_link,
    createdAt,
    status,
    mark,
    id,
    assignment_id,
    student_id,
    totalMark,
  } = assignmentMarkDetail;

  //date convert
  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  // get formate date
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  //handle mark
  const handleMark = () => {
    if (totalMark + 1 > inputMark) {
      toast.success("Mark submitted successfully !");
      editAssignmentMark({
        id,
        data: {
          id,
          student_id,
          student_name,
          assignment_id,
          title,
          createdAt,
          totalMark,
          mark: Number(inputMark),
          repo_link,
          status: "published",
        },
      });
    } else {
      toast.error("মার্ক কখনো টোটাল মার্ক এর থেকে বেশি হতে পারে না  !");
    }

    setInputMark(0);
  };

  return (
    <tr>
      <td className="table-td">{title?.slice(0, 40)}</td>
      <td className="table-td">{formattedDate}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link?.slice(0, 30)}</td>
      <td className="table-td input-mark">
        {status === "pending" ? (
          <input
            max={totalMark}
            type="number"
            value={inputMark}
            onChange={(e) => setInputMark(e.target.value)}
          />
        ) : (
          <td className="table-td">{mark}</td>
        )}

        {status === "pending" && (
          <button onClick={handleMark}>
            {" "}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
};

export default AssignmentMarkItem;

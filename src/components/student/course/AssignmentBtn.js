import React, { useEffect } from "react";
import { useGetAssignmentsQuery } from "../../../features/assignment/AssignmentApi";
import { useGetUsersQuery } from "../../../features/user/UserApi";
import { useGetAssignmentMarkQuery } from "../../../features/AssignmentMark/AssignmentMarkApi";

const AssignmentBtn = ({ setAssignmentModalIsOpen, videoId }) => {
  //get data
  const { data } = useGetAssignmentsQuery();
  const { data: users } = useGetUsersQuery();
  const { data: assignmentMarks } = useGetAssignmentMarkQuery();

  //get data from storage
  const userInfo = JSON.parse(localStorage.getItem("auth"));

  //find user
  const user = users?.find((u) => u.email === userInfo?.user?.email);

  //filtering  by user id
  const filterByUserId =
    assignmentMarks?.filter((ld) => ld?.student_id === user?.id) || [];

  //finding assignment by video id
  const findingAssignment = data?.find((dt) => dt.video_id == videoId) || {};

  //checking submit assignment
  const isSubmitAssignment =
    filterByUserId?.find((ld) => ld?.assignment_id === findingAssignment?.id) ||
    {};

  //declare content
  let content = null;
  if (findingAssignment?.id) {
    content = "এসাইনমেন্ট জমা দিন";
  } else {
    content = " কোনো এসাইনমেন্ট নেই";
  }
  if (isSubmitAssignment?.id) {
    content = "এসাইনমেন্ট যা জমা দিয়েছেন";
  }

  return (
    <button
      className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      onClick={() => findingAssignment?.id && setAssignmentModalIsOpen(true)}
    >
      {content}
    </button>
  );
};

export default AssignmentBtn;

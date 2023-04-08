import React from "react";
import Header from "../../Shared/Header";

import LeaderBoardItem from "./LeaderBoardItem";
import { useGetUsersQuery } from "../../../features/user/UserApi";
import { useGetQuizMarkQuery } from "../../../features/quizMark/QuizMark";
import Loading from "../../Shared/Loading";
import { useGetAssignmentMarkQuery } from "../../../features/AssignmentMark/AssignmentMarkApi";
import { ToastContainer } from "react-toastify";

const LeaderBoard = () => {
  //get data
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarkQuery();
  const { data: quizMarks } = useGetQuizMarkQuery();

  const { data: users, isLoading: usersLoading } = useGetUsersQuery();

  //get data from storage
  const userInfo = JSON.parse(localStorage.getItem("auth"));

  //find user
  const user = users?.find((u) => u.email === userInfo?.user?.email);

  //get unique assignment
  const filterByStudentIdAssignmentMark = assignmentMarks
    ?.filter((a) => a.status === "published")
    ?.reduce((acc, curr) => {
      const existingIndex = acc.findIndex(
        (item) => item.student_id === curr.student_id
      );
      if (existingIndex === -1) {
        acc.push({
          student_id: curr.student_id,
          student_name: curr.student_name,
          assignmentMark: curr.mark,
        });
      } else {
        acc[existingIndex].assignmentMark += curr.mark;
      }
      return acc;
    }, []);

  //get unique quiz mark
  const filterByStudentIdQuizMark = quizMarks?.reduce((acc, curr) => {
    const existingIndex = acc.findIndex(
      (item) => item.student_id === curr.student_id
    );
    if (existingIndex === -1) {
      acc.push({
        student_id: curr.student_id,
        student_name: curr.student_name,
        quizMark: curr.mark,
      });
    } else {
      acc[existingIndex].quizMark += curr.mark;
    }
    return acc;
  }, []);

  //get all students
  const allStudents = users?.filter((u) => u?.role === "student");

  if (!user) {
    allStudents?.push(userInfo?.user);
  }
  // combine user and quiz
  const allUsersQuiz = [];
  allStudents?.map((dt) => {
    const findIngQuiz = filterByStudentIdQuizMark?.find(
      (d) => d?.student_id === dt.id
    );
    let quizMark = findIngQuiz?.quizMark;
    if (!quizMark) {
      quizMark = 0;
    }
    const updateData = {
      student_id: dt.id,
      student_name: dt.name,
      quizMark,
    };
    allUsersQuiz.push(updateData);
  });

  // combine assignment and quiz
  const combinedQuizAssignment = [];
  allUsersQuiz?.map((dt) => {
    const findIngQuiz = filterByStudentIdAssignmentMark?.find(
      (d) => d?.student_id === dt.student_id
    );
    let quizMark = dt?.quizMark;
    let assignmentMark = findIngQuiz?.assignmentMark;
    if (!quizMark) {
      quizMark = 0;
    }
    if (!assignmentMark) {
      assignmentMark = 0;
    }
    const updateData = {
      student_id: dt.student_id,
      student_name: dt.student_name,
      quizMark,
      assignmentMark,
      totalMark: assignmentMark + quizMark,
    };
    combinedQuizAssignment.push(updateData);
  });

  //sorted by total mark
  const sortedCombinedQuizAssignment = combinedQuizAssignment.sort((a, b) => {
    return b.totalMark - a.totalMark;
  });

  //handle rank
  let maxMark;
  let rankIng = 1;
  if (sortedCombinedQuizAssignment?.length > 0) {
    maxMark = sortedCombinedQuizAssignment[0]?.totalMark;
  }

  //final leader board data
  const finalLeaderBoardData = sortedCombinedQuizAssignment?.map((dt) => {
    if (dt?.totalMark === maxMark) {
      return {
        rank: rankIng,
        assignment: dt,
      };
    } else {
      rankIng = rankIng + 1;
      maxMark = dt?.totalMark;
      return {
        rank: rankIng,
        assignment: dt,
      };
    }
  });

  // user Mark
  const findUserMark =
    finalLeaderBoardData?.find(
      (dt) => dt?.assignment?.student_id === userInfo?.user?.id
    ) || {};

  //showingLeaderBoardData
  const showingLeaderBoardData = finalLeaderBoardData?.filter((dt) => {
    if (dt.rank > 20) {
      return false;
    } else {
      return true;
    }
  });
  // what i do
  let content = null;
  if (!isLoading && !isError && finalLeaderBoardData.length > 0) {
    content = showingLeaderBoardData
      ?.slice(0, 20)
      ?.map((dt, index) => (
        <LeaderBoardItem
          key={index}
          assignment={dt?.assignment}
          rank={dt?.rank}
        />
      ));
  }

  return (
    <>
      <Header />
      <ToastContainer/>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>

            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {findUserMark?.rank ? findUserMark?.rank : 0}
                  </td>
                  <td className="table-td text-center font-bold">
                    {user?.name}
                  </td>
                  <td className="table-td text-center font-bold">
                    {findUserMark?.assignment?.quizMark
                      ? findUserMark?.assignment?.quizMark
                      : 0}
                  </td>
                  <td className="table-td text-center font-bold">
                    {findUserMark?.assignment?.assignmentMark
                      ? findUserMark?.assignment?.assignmentMark
                      : 0}
                  </td>
                  <td className="table-td text-center font-bold">
                    {findUserMark?.assignment?.totalMark
                      ? findUserMark?.assignment?.totalMark
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {finalLeaderBoardData?.length !== 0 && (
            <div className="my-8">
              <h3 className="text-lg font-bold">Top 20 Result</h3>

              <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                <thead>
                  <tr className="border-b border-slate-600/50">
                    <th className="table-th !text-center">Rank</th>
                    <th className="table-th !text-center">Name</th>
                    <th className="table-th !text-center">Quiz Mark</th>
                    <th className="table-th !text-center">Assignment Mark</th>
                    <th className="table-th !text-center">Total</th>
                  </tr>
                </thead>

                <tbody>{content}</tbody>
              </table>
            </div>
          )}

          {!isLoading && !isError && finalLeaderBoardData.length === 0 && (
            <p className="text-center text-2xl">No data found...</p>
          )}
          {!isLoading && isError && (
            <p className="text-center text-2xl" style={{ color: "red" }}>
              There was an error...
            </p>
          )}
          {isLoading && usersLoading && <Loading />}
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;

import React, { useEffect, useState } from "react";
import QuizItem from "./QuizItem";
import { useGetQuizzesQuery } from "../../../features/quizess/QuizesApi";
import Loading from "../../Shared/Loading";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddQuizMarkMutation,
  useGetQuizMarkQuery,
} from "../../../features/quizMark/QuizMark";
import { useGetUsersQuery } from "../../../features/user/UserApi";
import { toast } from "react-toastify";

const Quiz = () => {
  //set useState
  const [userAnswer, setUserAnswer] = useState({});
  const [quizAnswers, setQuizAnswers] = useState([]);

  //get data and mutation
  const [addQuizMark, { isLoading: quizLoading }] = useAddQuizMarkMutation();
  const { data, isLoading } = useGetQuizzesQuery();
  const { data: quizMarks } = useGetQuizMarkQuery();
  const { data: users } = useGetUsersQuery();

  //get data from local storage
  const userInfo = JSON.parse(localStorage.getItem("auth"));
  const user = users?.find((u) => u.email === userInfo?.user?.email);

  //---
  const navigate = useNavigate();
  const { quizId } = useParams();

  //get quiz answer
  useEffect(() => {
    if (userAnswer?.quizId) {
      const findAns = quizAnswers.find((dt) => dt.quizId === userAnswer.quizId);

      if (findAns?.quizId) {
        const updatedQuizAnswers = quizAnswers.map((dt) => {
          if (dt.quizId === findAns.quizId) {
            return { ...dt, answer: userAnswer.answer };
          } else {
            return dt;
          }
        });
        setQuizAnswers(updatedQuizAnswers);
      } else {
        setQuizAnswers([...quizAnswers, userAnswer]);
      }
    }
  }, [userAnswer]);

  const isSubmitAssignment =
    quizMarks
      ?.filter((dt) => dt.video_id == quizId)
      ?.find((dt) => dt.student_id === user?.id) || {};

  //handle Loading
  if (isLoading) {
    return <Loading />;
  }
  //get all quizzes
  const quizzes = data?.filter((dt) => dt?.video_id == quizId);

  //find by quid id
  const quizName = data?.find((dt) => dt?.video_id == quizId);

  //handle submit
  const handleSubmit = () => {
    const correctQuiz = quizAnswers?.filter((dt) => dt.answer === true);

    //handle wrong quiz
    const wrongQuiz = quizzes?.length - correctQuiz?.length;

    const data = {
      student_id: user?.id,
      student_name: user?.name,
      video_id: quizName?.video_id,
      video_title: quizName?.video_title,
      totalQuiz: quizzes?.length,
      totalCorrect: correctQuiz?.length,
      totalWrong: wrongQuiz,
      totalMark: quizzes?.length * 5,
      mark: correctQuiz?.length * 5,
    };
    if (!isSubmitAssignment?.student_id) {
      if (!quizLoading) {
        addQuizMark(data);
      }

      toast.success("Quiz submit successfully...");
    }
    //navigate
    navigate("/leader-board");
  };

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Quizzes for "{quizName?.video_title}"
          </h1>
          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>
        <div className="space-y-8 ">
          {quizzes.map((dt) => (
            <QuizItem
              key={dt.id}
              quiz={dt}
              isSubmitAssignment={isSubmitAssignment}
              setUserAnswer={setUserAnswer}
            />
          ))}
        </div>

        <button
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          onClick={handleSubmit}
        >
          {isSubmitAssignment.id ? "Go To LeaderBoard" : "Submit"}
        </button>
      </div>
    </section>
  );
};

export default Quiz;

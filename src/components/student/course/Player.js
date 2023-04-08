import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../../features/video/VideoApi";
import AssignmentBtn from "./AssignmentBtn";
import { useGetUsersQuery } from "../../../features/user/UserApi";
import { useGetQuizMarkQuery } from "../../../features/quizMark/QuizMark";
import { useGetQuizzesQuery } from "../../../features/quizess/QuizesApi";
import Loading from "../../Shared/Loading";

const Player = ({
  setAssignmentModalIsOpen,
  setAssignmentDetailModalIsOpen,
  setErrorLoading,
}) => {
  //params
  const { videoId } = useParams();

  //get data
  const { data: users } = useGetUsersQuery();
  const { data: getQuizzes, isLoading: quizLoading } = useGetQuizzesQuery();
  const { data: quizMarks } = useGetQuizMarkQuery();
  const { data, isError, isLoading } = useGetVideoQuery(videoId);

  //get data from storage
  const userInfo = JSON.parse(localStorage.getItem("auth"));

  //find user
  const user = users?.find((u) => u.email === userInfo?.user?.email);

  //nesting data
  const { url, description, title, createdAt } = data || {};

  //convert date
  const date = new Date(createdAt);
  const monthName = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date?.getUTCFullYear();

  //handle loading

  useEffect(() => {
    if (isLoading || quizLoading) {
      setErrorLoading(<Loading />);
    }

    //handle error
    if (!isLoading && isError) {
      setErrorLoading(
        <p  className="text-3xl text-center">
          Not Found this video 
        </p>
      );
    }
    //handle data
    if (!isLoading && !isError && !data?.url) {
      setErrorLoading(<p className="text-3xl text-center">No data Found</p>);
    }
    //handle data
    if (!isLoading && !isError && data?.url) {
      setErrorLoading(false);
    }
  }, [isError, isLoading, quizLoading]);

  // about submit Assignment

  const isSubmitQuiz =
    quizMarks
      ?.filter((dt) => dt.video_id == videoId)
      ?.find((dt) => dt.student_id === user?.id) || {};

  //get all quizzes match video id
  const quizzes = getQuizzes?.filter((dt) => dt?.video_id == videoId);

  //declare content
  let content = null;
  if (quizzes?.length === 0) {
    content = " কোনো কুইজ নেই";
  } else {
    if (isSubmitQuiz?.id) {
      content = "কুইজ উত্তর দেখুন";
    } else {
      content = "কুইজে অংশগ্রহণ করুন";
    }
  }

  return (
    <>
      {!isLoading && !isError && data?.url && (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <iframe
            width="100%"
            className="aspect-video"
            src={url}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              {title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
              Uploaded on {day} {monthName} {year}
            </h2>

            <div className="flex gap-4">
              <AssignmentBtn
                videoId={videoId}
                setAssignmentModalIsOpen={setAssignmentModalIsOpen}
                setAssignmentDetailModalIsOpen={setAssignmentDetailModalIsOpen}
              />

              <Link
                to={quizzes?.length !== 0 && `/quiz/${videoId}`}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                {content}
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
              {description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;

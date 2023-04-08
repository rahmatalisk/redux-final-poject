import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAssignmentMarkQuery,
  usePostAssignmentMarkMutation,
} from "../../../features/AssignmentMark/AssignmentMarkApi";
import { useGetAssignmentsQuery } from "../../../features/assignment/AssignmentApi";
import { useGetUsersQuery } from "../../../features/user/UserApi";
import { toast } from "react-toastify";

const AssignmentModal = ({ setAssignmentModalIsOpen }) => {
  const [repoLink, setRepoLink] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  //get data and mutation
  const { data: assignmentMarks } = useGetAssignmentMarkQuery();
  const [postAssignmentMark, { isSuccess }] = usePostAssignmentMarkMutation();
  const { data } = useGetAssignmentsQuery();
  const { data: users } = useGetUsersQuery();
  const userInfo = JSON.parse(localStorage.getItem("auth"));
  const user = users?.find((u) => u.email === userInfo?.user?.email);

  //get params
  const { videoId } = useParams();

  //findingAssignmentById
  const findingAssignmentById =
    data?.find((dt) => dt.video_id == videoId) || {};
  const date = new Date();
  const isoDate = date.toISOString();

  // filtering  by user id
  const filterByUserId =
    assignmentMarks?.filter((ld) => ld?.student_id === user?.id) || [];

  //finding assignment by video id
  const findingAssignment = data?.find((dt) => dt.video_id == videoId) || {};

  //check submit assignment
  const isSubmitAssignment =
    filterByUserId?.find((ld) => ld?.assignment_id === findingAssignment?.id) ||
    {};

  //set data
  useEffect(() => {
    async function fetchData() {
      if (isSubmitAssignment?.repo_link) {
        const link = await isSubmitAssignment.repo_link;
        setRepoLink(link);
      }
    }
    fetchData();
  }, []);

  //set data

  useEffect(() => {
    if (isSubmitAssignment?.repo_link) {
      const date2 = new Date(isSubmitAssignment?.createdAt);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      setFormattedDate(new Intl.DateTimeFormat("en-US", options).format(date2));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitAssignment?.repo_link) {
      postAssignmentMark({
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: findingAssignmentById?.id,
        title: findingAssignmentById?.title,
        createdAt: isoDate,
        totalMark: findingAssignmentById?.totalMark,
        mark: 0,
        repo_link: repoLink,
        status: "pending",
      });
    }

    toast.success("Assignment submit successfully");

    setAssignmentModalIsOpen(false);
  };

  return (
    <div>
      <button
        className="closeBtn"
        onClick={() => setAssignmentModalIsOpen(false)}
      >
        <span className="close-icon">&times;</span>
      </button>
      <h2 className="mt-6 text-center text-2xl  text-slate-100">
        {isSubmitAssignment?.repo_link
          ? "এসাইনমেন্ট যা জমা দিয়েছেন"
          : "এসাইনমেন্ট জমা দিন"}
      </h2>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">গিটহাব রিপোসিটরি লিঙ্ক </label>
            <input
              name="repo"
              type="text"
              required
              disabled={isSubmitAssignment?.repo_link}
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Repo Link"
            />
          </div>
        </div>
        {isSubmitAssignment?.repo_link && (
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="repo">জমা দেওয়ার তারিখ </label>
              <input
                name="repo"
                type="text"
                required
                value={formattedDate}
                disabled
                className="login-input rounded-md mt-2"
                placeholder="Repo Link"
              />
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            {isSubmitAssignment?.repo_link ? "Close" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentModal;

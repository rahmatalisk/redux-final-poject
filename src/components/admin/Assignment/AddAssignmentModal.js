import React, { useState } from "react";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";
import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../../features/assignment/AssignmentApi";
import { toast } from "react-toastify";

const AddAssignmentModal = ({ setAddAssignmentModalIsOpen }) => {
  // set useState
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");

  //get data
  const { data: assignments } = useGetAssignmentsQuery();
  const [addAssignment, {}] = useAddAssignmentMutation();
  const { data: videos } = useGetVideosQuery();

  // without assignment all video
  const withOutAssignmentVideos = videos?.filter((dt) => {
    const findAssignmentVideo = assignments?.find(
      (as) => as?.video_id === dt?.id
    );
    if (findAssignmentVideo?.video_id) {
      return false;
    } else {
      return true;
    }
  });

  //find video which match video title
  const findVideo =
    withOutAssignmentVideos?.find((dt) => dt.title === videoTitle) || {};

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //add assignment
    if (findVideo?.id) {
      addAssignment({
        title: assignmentTitle,
        video_id: findVideo?.id,
        video_title: findVideo?.title,
        totalMark: totalMark,
      });
      toast.success("Assignment Added successfully");
    } else {
      toast.error("Assignment Added failed");
    }

    // close modal
    setAddAssignmentModalIsOpen(false);
  };
  return (
    <div>
      <button
        className="closeBtn"
        onClick={() => setAddAssignmentModalIsOpen(false)}
      >
        <span className="close-icon">&times;</span>
      </button>
      <h2 className="mt-6 text-center text-2xl  text-slate-100">
        এসাইনমেন্ট যোগ করুন
      </h2>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Assignment Title *</label>
            <input
              name="assignmentTitle"
              type="text"
              required
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="assignmentTitle"
            />
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Video title *</label>
            <select
              className="login-input rounded-md mt-2"
              onChange={(e) => setVideoTitle(e.target.value)}
              defaultValue={videoTitle}
            >
              <option>Select Video Title </option>
              {withOutAssignmentVideos?.map((dt) => (
                <option key={dt?.id} value={dt?.title}>
                  {dt?.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Assignment TotalMark *</label>
            <input
              name="Assignment TotalMark"
              type="number"
              required
              value={totalMark}
              onChange={(e) => setTotalMark(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Assignment TotalMark"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssignmentModal;

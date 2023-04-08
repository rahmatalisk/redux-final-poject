import React, { useEffect, useState } from "react";
import { useGetAssignmentQuery } from "../../../features/assignment/SingleAssignmentApi";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";
import Option from "../../Shared/Option";
import {
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../../features/assignment/AssignmentApi";
import { toast } from "react-toastify";

const EditAssignmentModal = ({
  setEditAssignmentModalIsOpen,
  editAssignmentModalIsOpen,
}) => {
  //set useState
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");

  //get data from state
  const { data: videos } = useGetVideosQuery();
  const { data: assignment } = useGetAssignmentQuery(editAssignmentModalIsOpen);
  const [editAssignment, {}] = useEditAssignmentMutation();
  const { data: assignments } = useGetAssignmentsQuery();

  //nesting assignment
  const { title, totalMark: mark, video_title } = assignment || {};

  // find match video with video title
  const findVideo = videos?.find((dt) => dt.title === videoTitle) || {};

  //set data
  useEffect(() => {
    if (assignment?.title) {
      setAssignmentTitle(title);
      setVideoTitle(video_title);

      setTotalMark(mark);
    }
  }, [assignment]);

  //without assignment all videos
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
  // push find video
  withOutAssignmentVideos?.push(findVideo);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: editAssignmentModalIsOpen,
      title: assignmentTitle,
      video_id: findVideo?.id,
      video_title: findVideo?.title,
      totalMark: totalMark,
    };
    //edit

    if(findVideo?.id){
      editAssignment({
        id: editAssignmentModalIsOpen,
        data,
      });
      toast.success("Assignment Edit successfully")
    }else{
      toast.error("Assignment Edit failed")
    }
    
    //close modal
    setEditAssignmentModalIsOpen(false);
  };
  return (
    <div>
      <button
        className="closeBtn"
        onClick={() => setEditAssignmentModalIsOpen(false)}
      >
        <span className="close-icon">&times;</span>
      </button>
      <h2 className="mt-6 text-center text-2xl  text-slate-100">
        এসাইনমেন্ট সম্পাদনা করুন
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
              <option>Select Video Title</option>
              {withOutAssignmentVideos?.map((dt) => (
                <Option findVideo={findVideo} key={dt?.id} op={dt} />
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

export default EditAssignmentModal;

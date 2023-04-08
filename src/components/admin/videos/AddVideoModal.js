import React, { useState } from "react";
import { useAddVideoMutation } from "../../../features/videos/VideosApi";
import { toast } from "react-toastify";

const AddVideoModal = ({ setAddVideoModalIsOpen }) => {
  //set useState
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoViews, setVideoViews] = useState("");

  //get new date
  const date = new Date();
  const isoString = date.toISOString();

  //get data from state
  const [addVideo, {}] = useAddVideoMutation();

  //handle submit
  const handleSubmit = () => {

    if(videoTitle){
      toast.success("Video added successfully")
      addVideo({
        title: videoTitle,
        description: videoDescription,
        url: videoUrl,
        views: videoViews,
        duration: videoDuration,
        createdAt: isoString,
      });
    }else{
      toast.error("Video added failed")
    }
    
    //close modal
    setAddVideoModalIsOpen(false);
  };

  return (
    <div>
      <button
        className="closeBtn"
        onClick={() => setAddVideoModalIsOpen(false)}
      >
        <span className="close-icon">&times;</span>
      </button>
      <h2 className="mt-6 text-center text-2xl  text-slate-100">
        ভিডিও যোগ করুন
      </h2>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Video Title *</label>
            <input
              name="VideoTitle"
              type="text"
              required
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Video Title"
            />
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Video Url *</label>
            <input
              name="Video Url"
              type="text"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Video Url"
            />
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Video Description *</label>
            <input
              name="Video Description"
              type="text"
              required
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Video Description"
            />
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Views *</label>
            <input
              name="Views"
              type="text"
              required
              value={videoViews}
              onChange={(e) => setVideoViews(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Views"
            />
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Duration *</label>
            <input
              name="Duration"
              type="text"
              required
              value={videoDuration}
              onChange={(e) => setVideoDuration(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Duration"
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

export default AddVideoModal;

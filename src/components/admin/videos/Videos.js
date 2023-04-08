import React, { useEffect, useState } from "react";
import AdminHeader from "../../Shared/AdminHeader";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";
import Loading from "../../Shared/Loading";
import VideoItem from "./VideoItem";
import AddVideoModal from "./AddVideoModal";
import EditVideoModal from "./EditVideoModal";
import { ToastContainer } from "react-toastify";

const Videos = () => {
  //set useState
  const [addVideoModalIsOpen, setAddVideoModalIsOpen] = useState(false);
  const [editVideoModalIsOpen, setEditVideoModalIsOpen] = useState(false);

  //set document title
  useEffect(() => {
    document.title = "Admin-Videos";
  }, []);

  //get data
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  //handle loading
  if (isLoading) {
    return <Loading />;
  }

  //declare content
  let content = null;

 

  //handle error
  if (!isLoading && isError) {
    content = <p style={{ color: "red" }} className="text-2xl text-center">There Was an Error</p>;
  }

   //handle no data found
   if (!isLoading && !isError && videos?.length === 0) {
    content = <p className="text-3xl text-center">No data found... PLease Add</p>;
  }

  //handle data found
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos?.map((vd) => (
      <VideoItem
        setEditVideoModalIsOpen={setEditVideoModalIsOpen}
        key={vd.id}
        video={vd}
      />
    ));
  }

  return (
    <>
      <AdminHeader />

      <ToastContainer />
      {editVideoModalIsOpen && (
        <div className="modal ">
          <div className="modal-content video-modal">
            <EditVideoModal
              editVideoModalIsOpen={editVideoModalIsOpen}
              setEditVideoModalIsOpen={setEditVideoModalIsOpen}
            />
          </div>
        </div>
      )}

      {addVideoModalIsOpen && (
        <div className="modal ">
          <div className="modal-content video-modal">
            <AddVideoModal setAddVideoModalIsOpen={setAddVideoModalIsOpen} />
          </div>
        </div>
      )}
      {!addVideoModalIsOpen && !editVideoModalIsOpen && (
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
              <div className="w-full flex">
                <button
                  className="btn ml-auto"
                  onClick={() => setAddVideoModalIsOpen(true)}
                >
                  Add Video
                </button>
              </div>

              {videos?.length > 0 && (
                <div className="overflow-x-auto mt-4">
                  <table className="divide-y-1 text-base divide-gray-600 w-full">
                    <thead>
                      <tr>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Description</th>
                        <th className="table-th">Action</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-600/50">
                      {content}
                    </tbody>
                  </table>
                </div>
              )}

              {videos?.length === 0 && <div>{content}</div>}

              {!isLoading && isError && content}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Videos;

import React, { useState } from "react";
import Header from "../../Shared/Header";
import SideVideos from "./SideVideos";
import Player from "./Player";
import AssignmentModal from "./AssignmentModal";
import { ToastContainer } from "react-toastify";

const CoursePlayer = ({ isQuizSubmit }) => {
  //declare useState
  const [assignmentModalIsOpen, setAssignmentModalIsOpen] = useState(false);
  const [errorLoading, setErrorLoading] = useState("");

  return (
    <>
      <Header />

      <ToastContainer />
      {assignmentModalIsOpen && (
        <div className="modal ">
          <div className="modal-content assignment-modal">
            <AssignmentModal
              isQuizSubmit={isQuizSubmit}
              setAssignmentModalIsOpen={setAssignmentModalIsOpen}
            />
          </div>
        </div>
      )}

      {errorLoading}

      {!assignmentModalIsOpen && (
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
              <Player
                setAssignmentModalIsOpen={setAssignmentModalIsOpen}
                setErrorLoading={setErrorLoading}
              />
              {!errorLoading && <SideVideos />}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CoursePlayer;

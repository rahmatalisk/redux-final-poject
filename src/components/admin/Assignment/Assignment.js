import React, { useEffect, useState } from "react";
import AdminHeader from "../../Shared/AdminHeader";
import AssignmentItem from "./AssignmentItem";
import EditAssignmentModal from "./EditAssignmentModal";
import { useGetAssignmentsQuery } from "../../../features/assignment/AssignmentApi";
import Loading from "../../Shared/Loading";
import AddAssignmentModal from "./AddAssignmentModal";
import { ToastContainer } from "react-toastify";

const Assignment = () => {
  // set useState
  const [editAssignmentModalIsOpen, setEditAssignmentModalIsOpen] =
    useState(false);
  const [addAssignmentModalIsOpen, setAddAssignmentModalIsOpen] =
    useState(false);

  //get data
  const { data: assignments, isError, isLoading } = useGetAssignmentsQuery();

  // set document title
  useEffect(() => {
    document.title = "Admin-Assignment";
  }, []);

  // handle loading
  if (isLoading) {
    return <Loading />;
  }
  // declare content
  let content = null;

  //handle error
  if (!isLoading && isError) {
    content = (
      <p style={{ color: "red" }} className="text-2xl text-center">
        There Was an Error
      </p>
    );
  }

  // handle no data found
  if (!isLoading && !isError && assignments?.length === 0) {
    content = (
      <p className="text-3xl text-center">No data found... PLease Add</p>
    );
  }
  //handle data found
  if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments?.map((dt) => (
      <AssignmentItem
        key={dt?.id}
        assignmentDetail={dt}
        setEditAssignmentModalIsOpen={setEditAssignmentModalIsOpen}
        editAssignmentModalIsOpen={editAssignmentModalIsOpen}
      />
    ));
  }
  return (
    <>
      <AdminHeader />
      <ToastContainer />

      {editAssignmentModalIsOpen && (
        <div className="modal ">
          <div className="modal-content video-modal">
            <EditAssignmentModal
              setEditAssignmentModalIsOpen={setEditAssignmentModalIsOpen}
              editAssignmentModalIsOpen={editAssignmentModalIsOpen}
            />
          </div>
        </div>
      )}
      {addAssignmentModalIsOpen && (
        <div className="modal ">
          <div className="modal-content video-modal">
            <AddAssignmentModal
              setAddAssignmentModalIsOpen={setAddAssignmentModalIsOpen}
              addAssignmentModalIsOpen={addAssignmentModalIsOpen}
            />
          </div>
        </div>
      )}
      {!editAssignmentModalIsOpen && !addAssignmentModalIsOpen && (
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
              <div className="w-full flex">
                <button
                  className="btn ml-auto"
                  onClick={() => setAddAssignmentModalIsOpen(true)}
                >
                  Add Assignment
                </button>
              </div>
              <div className="overflow-x-auto mt-4">
                {assignments?.length > 0 && (
                  <table className="divide-y-1 text-base divide-gray-600 w-full">
                    <thead>
                      <tr>
                        <th className="table-th">Title</th>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Mark</th>
                        <th className="table-th">Action</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-600/50">
                      {content}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {assignments?.length === 0 && <div>{content}</div>}

          {!isLoading && isError && content}
        </section>
      )}
    </>
  );
};

export default Assignment;

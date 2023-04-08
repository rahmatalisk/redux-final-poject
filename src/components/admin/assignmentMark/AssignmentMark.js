import React, { useEffect } from "react";
import AdminHeader from "../../Shared/AdminHeader";
import AssignmentMarkItem from "./AssignmentMarkItem";
import { useGetAssignmentMarkQuery } from "../../../features/AssignmentMark/AssignmentMarkApi";
import Loading from "../../Shared/Loading";
import { ToastContainer } from "react-toastify";

const AssignmentMark = () => {
  // get data
  const {
    data: assignmentMarks,
    isError,
    isLoading,
  } = useGetAssignmentMarkQuery();

  //set document title
  useEffect(() => {
    document.title = "Admin-AssignmentMark";
  }, []);

  //handle loading
  if (isLoading) {
    return <Loading />;
  }

  //declare content
  let content = null;

  //handle error
  if (!isLoading && isError) {
    content = <p style={{ color: "red" }} className="text-center text-3xl mt-6">There was an error</p>;
  }

  //handle not found data
  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <>
    <p className="text-center text-3xl mt-6">No Data found</p>
    </>;
  }
  // handle found data
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = assignmentMarks?.map((dt) => (
      <AssignmentMarkItem key={dt.id} assignmentMarkDetail={dt} />
    ));
  }
  return (
    <>
      <AdminHeader />
      <ToastContainer />

      {
        (assignmentMarks?.length > 0 ) ?<section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{assignmentMarks?.length}</span>
              </li>
              <li>
                Pending{" "}
                <span>
                  {
                    assignmentMarks?.filter((dt) => dt.status === "pending")
                      ?.length
                  }
                </span>
              </li>
              <li>
                Mark Sent{" "}
                <span>
                  {
                    assignmentMarks?.filter((dt) => dt.status === "published")
                      ?.length
                  }
                </span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section> : content
      }
      
    </>
  );
};

export default AssignmentMark;

import React, { useEffect, useState } from "react";
import AdminHeader from "../../Shared/AdminHeader";
import AddQuizModal from "./AddQuizModal";
import { useGetQuizzesQuery } from "../../../features/quizess/QuizesApi";
import Loading from "../../Shared/Loading";
import QuizItem from "./QuizItem";
import EditQuizModal from "./EditQuiz";
import { ToastContainer } from "react-toastify";

const Quizzes = () => {
  //set document title
  useEffect(() => {
    document.title = "Admin-Quizzes";
  }, []);

  //set useState
  const [addQuizModalIsOpen, setAddQuizModalIsOpen] = useState(false);
  const [editQuizModalIsOpen, setEditQuizModalIsOpen] = useState(false);

  //get data
  const { data: quizzes, isError, isLoading } = useGetQuizzesQuery();

  //handle loading
  if (isLoading) {
    return <Loading />;
  }

  //declare content
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
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = (
      <p className="text-3xl text-center">No data found... PLease Add</p>
    );
  }

  //handle data found
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes?.map((dt) => (
      <QuizItem
        key={dt.id}
        quizDetail={dt}
        setEditQuizModalIsOpen={setEditQuizModalIsOpen}
      />
    ));
  }

  return (
    <>
      <AdminHeader />
      <ToastContainer />
      {addQuizModalIsOpen && (
        <div className="modal ">
          <div className="modal-content video-modal">
            <AddQuizModal
              addQuizModalIsOpen={addQuizModalIsOpen}
              setAddQuizModalIsOpen={setAddQuizModalIsOpen}
            />
          </div>
        </div>
      )}
      {editQuizModalIsOpen && (
        <div className="modal ">
          <div className="modal-content video-modal">
            <EditQuizModal
              editQuizModalIsOpen={editQuizModalIsOpen}
              setEditQuizModalIsOpen={setEditQuizModalIsOpen}
            />
          </div>
        </div>
      )}

      {!addQuizModalIsOpen && !editQuizModalIsOpen && (
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
              <div className="w-full flex">
                <button
                  className="btn ml-auto"
                  onClick={() => setAddQuizModalIsOpen(true)}
                >
                  Add Quiz
                </button>
              </div>
              <div className="overflow-x-auto mt-4">
                {quizzes?.length > 0 && (
                  <table className="divide-y-1 text-base divide-gray-600 w-full">
                    <thead>
                      <tr>
                        <th className="table-th">Question</th>
                        <th className="table-th">Video</th>
                        <th className="table-th justify-center">Action</th>
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

          {quizzes?.length === 0 && <div>{content}</div>}

          {!isLoading && isError && content}
        </section>
      )}
    </>
  );
};

export default Quizzes;

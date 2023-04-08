import React, { useState } from "react";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";
import { useAddQuizMutation } from "../../../features/quizess/QuizesApi";
import { ToastContainer, toast } from "react-toastify";

const AddQuizModal = ({ setAddQuizModalIsOpen }) => {
  //set UseState
  const [select1, setIsSelect1] = useState(false);
  const [option1, setOption1] = useState("");
  const [select2, setIsSelect2] = useState(false);
  const [option2, setOption2] = useState("");
  const [select3, setIsSelect3] = useState(false);
  const [option3, setOption3] = useState("");
  const [select4, setIsSelect4] = useState(false);
  const [option4, setOption4] = useState("");
  const [question, setQuestion] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  //get data and mutation
  const { data: videos } = useGetVideosQuery();
  const [addQuiz, {}] = useAddQuizMutation();

  //find video which match video title
  const findVideo = videos?.find((dt) => dt.title === videoTitle) || {};

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddQuizModalIsOpen(false);

    if (findVideo?.id) {
      toast.success("Quiz Added successfully !");
      addQuiz({
        question: question,
        video_id: findVideo?.id,
        video_title: findVideo?.title,
        options: [
          {
            id: 1,
            option: option1,
            isCorrect: select1,
          },
          {
            id: 2,
            option: option2,
            isCorrect: select2,
          },
          {
            id: 3,
            option: option3,
            isCorrect: select3,
          },
          {
            id: 4,
            option: option4,
            isCorrect: select4,
          },
        ],
      });
    } else {
      toast.error("Quiz Added failed !");
    }
  };

  return (
    <div>
      <button className="closeBtn" onClick={() => setAddQuizModalIsOpen(false)}>
        <span className="close-icon">&times;</span>
      </button>
      <h2 className="mt-6 text-center text-2xl  text-slate-100">
        কুইজ যোগ করুন
      </h2>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Question *</label>
            <input
              name="Question"
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="login-input rounded-md mt-2"
              placeholder="Question"
            />
          </div>
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <label htmlFor="repo">Video title *</label>
          <select
            className="login-input rounded-md mt-2"
            onChange={(e) => setVideoTitle(e.target.value)}
            defaultValue={videoTitle}
          >
            <option>Select Video Title</option>
            {videos?.map((dt) => (
              <option key={dt?.id} value={dt?.title}>
                {dt?.title}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Option & Is Correct 1*</label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={() => setIsSelect1(!select1)}
                checked={select1}
              />
              <input
                name="Option 1"
                type="text"
                required
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="login-input rounded-md mt-2"
                placeholder="Option 1"
              />
            </div>
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Option & Is Correct 2 *</label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={() => setIsSelect2(!select2)}
                checked={select2}
              />
              <input
                name="Option 2"
                type="text"
                required
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="login-input rounded-md mt-2"
                placeholder="Option 2"
              />
            </div>
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Option & Is Correct 3 *</label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={() => setIsSelect3(!select3)}
                checked={select3}
              />
              <input
                name="Option 3"
                type="text"
                required
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                className="login-input rounded-md mt-2"
                placeholder="Option 3"
              />
            </div>
          </div>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="repo">Option & Is Correct 4 *</label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                onChange={() => setIsSelect4(!select4)}
                checked={select4}
              />
              <input
                name="Option 4"
                type="text"
                required
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                className="login-input rounded-md mt-2"
                placeholder="Option 4"
              />
            </div>
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

export default AddQuizModal;

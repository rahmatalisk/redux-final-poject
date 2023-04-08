import React, { useEffect, useState } from "react";
import {
  useEditQuizMutation,
  useGetQuizzesQuery,
} from "../../../features/quizess/QuizesApi";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";
import Option from "../../Shared/Option";
import { toast } from "react-toastify";

const EditQuizModal = ({ setEditQuizModalIsOpen, editQuizModalIsOpen }) => {
  //set useState
  const [select1, setIsSelect1] = useState(false);
  const [option1, setOption1] = useState(",.");
  const [select2, setIsSelect2] = useState(false);
  const [option2, setOption2] = useState("");
  const [select3, setIsSelect3] = useState(false);
  const [option3, setOption3] = useState("");
  const [select4, setIsSelect4] = useState(false);
  const [option4, setOption4] = useState("");
  const [question, setQuestion] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  //get data
  const { data: quizzes } = useGetQuizzesQuery();
  const { data: videos } = useGetVideosQuery();
  const [editQuiz, {}] = useEditQuizMutation();

  //find quiz
  const findQuiz = quizzes?.find((dt) => dt.id === editQuizModalIsOpen) || {};
  const { id, video_id, video_title, options, question: qs } = findQuiz || {};

  // set data
  useEffect(() => {
    setQuestion(qs);
    setVideoTitle(video_title);
    if (options?.length > 0) {
      setIsSelect1(options[0]?.isCorrect);
      setOption1(options[0]?.option);
    }
    if (options?.length > 1) {
      setIsSelect2(options[1]?.isCorrect);
      setOption2(options[1]?.option);
    }
    if (options?.length > 2) {
      setIsSelect3(options[2]?.isCorrect);
      setOption3(options[2]?.option);
    }
    if (options?.length > 3) {
      setIsSelect4(options[3]?.isCorrect);
      setOption4(options[3]?.option);
    }
  }, [findQuiz]);

  //find video
  const findVideo = videos?.find((dt) => dt.title === videoTitle) || {};

  //handle edit
  const handleSubmit = (e) => {
    e.preventDefault();
    //close modal
    setEditQuizModalIsOpen(false);

    const data = {
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
    };

    if (video_id) {
      editQuiz({
        id,
        data,
      });
      toast.success("Quiz Edit successfully !");
    } else {
      toast.error("Quiz Edit failed !");
    }
  };

  return (
    <div>
      <button
        className="closeBtn"
        onClick={() => setEditQuizModalIsOpen(false)}
      >
        <span className="close-icon">&times;</span>
      </button>
      <h2 className="mt-6 text-center text-2xl  text-slate-100">
        কুইজ সম্পাদনা করুন
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
            <option>Select Video Title </option>
            {videos?.map((dt) => (
              <Option findVideo={findVideo} key={dt?.id} op={dt} />
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

export default EditQuizModal;

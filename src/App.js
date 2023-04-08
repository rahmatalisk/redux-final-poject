import React, { useState } from "react";
import "./style/output.css"
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/student/login/Login"
import Register from "./components/student/register/Register"
import CoursePlayer from "./components/student/course/CoursePlayer"
import LeaderBoard from "./components/student/leaderboard/LeaderBoard"
import Quiz from "./components/student/quiz/Quiz"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin/AdminLogin";
import DashBoard from "./components/admin/dashboard/DashBoard";
import Quizzes from "./components/admin/quizzes/Quizzes";
import Videos from "./components/admin/videos/Videos";
import Assignment from "./components/admin/Assignment/Assignment";
import AssignmentMark from "./components/admin/assignmentMark/AssignmentMark";
function App() {
  const [isQuizSubmit,setIsQuizSubmit]= useState({})
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/quizzes" element={<Quizzes />} />
        <Route path="/admin/videos" element={<Videos />} />
        <Route path="/admin/assignment-mark" element={<AssignmentMark />} />
        <Route path="/admin/assignment" element={<Assignment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course-player/video/:videoId" element={<CoursePlayer isQuizSubmit={isQuizSubmit} />} />
        <Route path="/leader-board" element={<LeaderBoard />} />
        <Route path="/quiz/:quizId" element={<Quiz setIsQuizSubmit={setIsQuizSubmit} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

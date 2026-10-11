import { useContext } from 'react';
import { Navigate, Route, Routes, useMatch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext.jsx';
import Navbar from './components/student/Navbar.jsx';
import Home from './pages/student/Home.jsx';
import CourseDetails from './pages/student/CourseDetails.jsx';
import CoursesList from './pages/student/CoursesList.jsx';
import MyEnrollments from './pages/student/MyEnrollments.jsx';
import Player from './pages/student/Player.jsx';
import Loading from './components/student/Loading.jsx';
import Dashboard from './pages/educator/Dashboard.jsx';
import AddCourse from './pages/educator/AddCourse.jsx';
import MyCourses from './pages/educator/MyCourses.jsx';
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx';
import Educator from './pages/educator/Educator.jsx';

const App = () => {
  const { isEducator } = useContext(AppContext);
  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <ToastContainer position="top-right" autoClose={2500} />
      {!isEducatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={isEducator ? <Educator /> : <Navigate to="/" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

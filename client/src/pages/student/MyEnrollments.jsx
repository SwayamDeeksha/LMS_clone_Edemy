import { useContext } from 'react';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import { AppContext } from '../../context/AppContext';

const MyEnrollments = () => {
  const { enrolledCourses, navigate, calculateCourseDuration, calculateNoOfLectures, getCourseProgress } = useContext(AppContext);
  return <>
    <div className="md:px-36 px-8 pt-10 min-h-[60vh]">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>
      {enrolledCourses.length ? <div className="overflow-x-auto"><table className="w-full border mt-10"><thead className="text-gray-900 border-b text-sm text-left"><tr><th className="px-4 py-3">Course</th><th className="px-4 py-3">Duration</th><th className="px-4 py-3">Completed</th><th className="px-4 py-3">Status</th></tr></thead><tbody>{enrolledCourses.map((course) => { const completed = getCourseProgress(course._id).lectureCompleted.length; const total = calculateNoOfLectures(course); const percent = total ? (completed * 100) / total : 0; return <tr key={course._id} className="border-b"><td className="px-4 py-3 flex items-center gap-3"><img src={course.courseThumbnail} alt="" className="w-24" /><div className="flex-1"><p>{course.courseTitle}</p><Line className="mt-2" strokeWidth={3} percent={percent} /></div></td><td className="px-4 py-3 max-sm:hidden">{calculateCourseDuration(course)}</td><td className="px-4 py-3 max-sm:hidden">{completed} / {total} Lectures</td><td className="px-4 py-3"><button onClick={() => navigate(`/player/${course._id}`)} className="px-4 py-2 bg-blue-600 text-white">{percent === 100 ? 'Completed' : 'On Going'}</button></td></tr>; })}</tbody></table></div> : <div className="py-20 text-center text-gray-500">You haven't enrolled in any courses yet. <button onClick={() => navigate('/course-list')} className="text-blue-600 underline">Browse courses</button></div>}
    </div>
    <Footer />
  </>;
};
export default MyEnrollments;

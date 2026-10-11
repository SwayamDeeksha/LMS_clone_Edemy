import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const StudentsEnrolled = () => {
  const { enrolledCourses } = useContext(AppContext);
  return <div className="min-h-[70vh] p-4 md:p-8"><div className="max-w-4xl border rounded overflow-hidden"><table className="w-full text-sm"><thead className="border-b"><tr><th className="px-4 py-3 text-left">#</th><th className="px-4 py-3 text-left">Student Name</th><th className="px-4 py-3 text-left">Course Title</th><th className="px-4 py-3 text-left">Date</th></tr></thead><tbody>{enrolledCourses.length ? enrolledCourses.map((course, index) => <tr key={course._id} className="border-b"><td className="px-4 py-3">{index + 1}</td><td className="px-4 py-3">Demo Student</td><td className="px-4 py-3">{course.courseTitle}</td><td className="px-4 py-3">{new Date().toLocaleDateString()}</td></tr>) : <tr><td colSpan="4" className="px-4 py-10 text-center text-gray-500">No students enrolled yet.</td></tr>}</tbody></table></div></div>;
};
export default StudentsEnrolled;

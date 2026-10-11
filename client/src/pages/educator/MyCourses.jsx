import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MyCourses = () => {
  const { allCourses, currency } = useContext(AppContext);
  const courses = allCourses.filter((course) => course.educator?._id === 'demo-user');
  return <div className="min-h-[70vh] p-4 md:p-8"><h2 className="pb-4 text-lg font-medium">My Courses</h2><div className="overflow-x-auto rounded-md bg-white border"><table className="w-full"><thead className="border-b text-sm text-left"><tr><th className="px-4 py-3">All Courses</th><th className="px-4 py-3">Earnings</th><th className="px-4 py-3">Students</th><th className="px-4 py-3">Published On</th></tr></thead><tbody className="text-sm text-gray-500">{courses.length ? courses.map((course) => <tr key={course._id} className="border-b"><td className="px-4 py-3 flex items-center gap-3"><img src={course.courseThumbnail} alt="" className="w-16" /><span>{course.courseTitle}</span></td><td className="px-4 py-3">{currency}{Math.floor((course.enrolledStudents?.length || 0) * (course.coursePrice - (course.discount * course.coursePrice) / 100))}</td><td className="px-4 py-3">{course.enrolledStudents?.length || 0}</td><td className="px-4 py-3">{new Date(course.createdAt).toLocaleDateString()}</td></tr>) : <tr><td colSpan="4" className="px-4 py-10 text-center">No courses created yet. Use Add Course.</td></tr>}</tbody></table></div></div>;
};
export default MyCourses;

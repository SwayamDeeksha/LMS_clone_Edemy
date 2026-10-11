import { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { allCourses, enrolledCourses, currency } = useContext(AppContext);
  const educatorCourses = useMemo(() => allCourses.filter((course) => course.educator?._id === 'demo-user'), [allCourses]);
  const courses = educatorCourses.length ? educatorCourses : allCourses;
  const students = courses.reduce((total, course) => total + (course.enrolledStudents?.length || 0), 0);
  const earnings = courses.reduce((total, course) => total + (course.enrolledStudents?.length || 0) * (course.coursePrice - (course.discount * course.coursePrice) / 100), 0);
  return <div className="min-h-[70vh] p-4 md:p-8">
    <h2 className="pb-6 text-xl font-medium">Educator Dashboard</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl">
      <div className="flex items-center gap-4 border p-5 rounded"><img src={assets.patients_icon} className="w-10" alt="" /><div><p className="text-2xl font-medium">{students}</p><p className="text-gray-500">Total Enrolments</p></div></div>
      <div className="flex items-center gap-4 border p-5 rounded"><img src={assets.appointments_icon} className="w-10" alt="" /><div><p className="text-2xl font-medium">{courses.length}</p><p className="text-gray-500">Total Courses</p></div></div>
      <div className="flex items-center gap-4 border p-5 rounded"><img src={assets.earning_icon} className="w-10" alt="" /><div><p className="text-2xl font-medium">{currency}{Math.floor(earnings)}</p><p className="text-gray-500">Total Earnings</p></div></div>
    </div>
    <div className="mt-10 max-w-4xl"><h2 className="pb-4 text-lg font-medium">Latest Enrolments</h2><div className="border rounded overflow-hidden"><table className="w-full text-sm"><thead className="border-b"><tr><th className="px-4 py-3 text-left">#</th><th className="px-4 py-3 text-left">Student Name</th><th className="px-4 py-3 text-left">Course Title</th></tr></thead><tbody><tr><td className="px-4 py-3">1</td><td className="px-4 py-3">Demo Student</td><td className="px-4 py-3">{enrolledCourses[0]?.courseTitle || 'No recent enrolments'}</td></tr></tbody></table></div></div>
  </div>;
};
export default Dashboard;

import { useContext, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/student/Footer';
import CourseCard from '../../components/student/CourseCard';
import SearchBar from '../../components/student/SearchBar';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const CoursesList = () => {
  const { input } = useParams();
  const { allCourses } = useContext(AppContext);
  const filteredCourses = useMemo(() => {
    if (!input) return allCourses;
    return allCourses.filter((course) => course.courseTitle.toLowerCase().includes(input.toLowerCase()));
  }, [allCourses, input]);

  return <>
    <div className="relative md:px-36 px-8 pt-20 text-left">
      <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
          <p className="text-gray-500"><Link to="/" className="text-blue-600">Home</Link> / Course List</p>
        </div>
        <SearchBar data={input || ''} />
      </div>
      {input && <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600"><p>{input}</p><Link to="/course-list"><img className="cursor-pointer" src={assets.cross_icon} alt="Clear" /></Link></div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-4 px-2 md:p-0">
        {filteredCourses.map((course) => <CourseCard key={course._id} course={course} />)}
      </div>
      {!filteredCourses.length && <p className="text-gray-500 pb-20">No courses found.</p>}
    </div>
    <Footer />
  </>;
};
export default CoursesList;

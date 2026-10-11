import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);
  const rating = calculateRating(course);
  const price = course.coursePrice - (course.discount * course.coursePrice) / 100;
  return (
    <Link onClick={() => window.scrollTo(0, 0)} to={`/course/${course._id}`} className="border border-gray-200 pb-6 overflow-hidden rounded-lg bg-white hover:-translate-y-1 transition-transform">
      <img className="w-full aspect-video object-cover" src={course.courseThumbnail} alt={course.courseTitle} />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold line-clamp-2">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator?.name || 'GreatStack'}</p>
        <div className="flex items-center space-x-2">
          <p>{rating}</p>
          <div className="flex">{Array.from({ length: 5 }, (_, i) => <img key={i} className="w-3.5 h-3.5" src={i < rating ? assets.star : assets.star_blank} alt="" />)}</div>
          <p className="text-gray-500">({course.courseRatings?.length || 0})</p>
        </div>
        <p className="text-base font-semibold text-gray-800">{currency}{price.toFixed(2)}</p>
      </div>
    </Link>
  );
};
export default CourseCard;

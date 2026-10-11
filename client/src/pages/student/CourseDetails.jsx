import { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const getVideoId = (url = '') => url.split('v=')[1]?.split('&')[0] || url.split('/').pop();

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, currency, userData, enrollCourse, enrolledCourses, calculateChapterTime, calculateCourseDuration, calculateRating, calculateNoOfLectures, navigate } = useContext(AppContext);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const courseData = useMemo(() => allCourses.find((course) => course._id === id), [allCourses, id]);
  if (!courseData) return <Loading />;

  const isAlreadyEnrolled = enrolledCourses.some((course) => course._id === id);
  const price = courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100;

  const handleEnroll = () => {
    if (enrollCourse(id)) navigate('/my-enrollments');
  };

  return <>
    <div className="relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left">
      <div className="absolute top-0 left-0 w-full h-96 -z-0 bg-gradient-to-b from-cyan-100/70" />
      <div className="max-w-2xl z-10 text-gray-500">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800">{courseData.courseTitle}</h1>
        <p className="pt-4 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 260) }} />
        <div className="flex items-center gap-2 pt-3 pb-1 text-sm">
          <p>{calculateRating(courseData)}</p>
          <div className="flex">{Array.from({ length: 5 }, (_, i) => <img key={i} src={i < calculateRating(courseData) ? assets.star : assets.star_blank} alt="" className="w-3.5 h-3.5" />)}</div>
          <p className="text-blue-600">({courseData.courseRatings.length} {courseData.courseRatings.length === 1 ? 'rating' : 'ratings'})</p>
          <p>{courseData.enrolledStudents.length} students</p>
        </div>
        <p className="text-sm">Course by <span className="text-blue-600 underline">{courseData.educator.name}</span></p>

        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData.courseContent.map((chapter, index) => (
              <div key={chapter.chapterId} className="border border-gray-300 bg-white mb-2 rounded">
                <button className="w-full flex items-center justify-between px-4 py-3 text-left" onClick={() => setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }))}>
                  <span className="flex items-center gap-2"><img src={assets.down_arrow_icon} alt="" className={`transition-transform ${openSections[index] ? 'rotate-180' : ''}`} /><span className="font-medium text-sm md:text-base">{chapter.chapterTitle}</span></span>
                  <span className="text-sm">{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</span>
                </button>
                {openSections[index] && <ul className="px-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300">
                  {chapter.chapterContent.map((lecture, i) => <li key={lecture.lectureId} className="flex items-center gap-2 py-2">
                    <img src={assets.play_icon} alt="" className="w-4 h-4" />
                    <div className="flex items-center justify-between w-full text-xs md:text-sm">
                      <p>{i + 1}. {lecture.lectureTitle}</p>
                      <div className="flex gap-3"><button disabled={!lecture.isPreviewFree} onClick={() => setPlayerData({ videoId: getVideoId(lecture.lectureUrl) })} className={lecture.isPreviewFree ? 'text-blue-500' : 'text-gray-400'}>{lecture.isPreviewFree ? 'Preview' : 'Locked'}</button><p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p></div>
                    </div>
                  </li>)}
                </ul>}
              </div>
            ))}
          </div>
        </div>

        <div className="py-16 text-sm md:text-base">
          <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
          <div className="rich-text pt-3" dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} />
        </div>
      </div>

      <div className="w-full md:max-w-[420px] z-10 shadow-lg rounded overflow-hidden bg-white sticky top-5">
        {playerData ? <YouTube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName="w-full aspect-video" /> : <img src={courseData.courseThumbnail} alt={courseData.courseTitle} className="w-full" />}
        <div className="p-5">
          <p className="text-red-500"><span className="font-medium">5 days</span> left at this price!</p>
          <div className="flex gap-3 items-center pt-2"><p className="text-gray-800 text-3xl font-semibold">{currency}{price.toFixed(2)}</p><p className="text-gray-500 line-through">{currency}{courseData.coursePrice}</p><p className="text-gray-500">{courseData.discount}% off</p></div>
          <div className="flex items-center text-sm gap-4 pt-4 text-gray-500"><span>⭐ {calculateRating(courseData)}</span><span>{calculateCourseDuration(courseData)}</span><span>{calculateNoOfLectures(courseData)} lessons</span></div>
          <button onClick={handleEnroll} className="mt-6 w-full py-3 rounded bg-blue-600 text-white font-medium">{isAlreadyEnrolled ? 'Go to My Enrollments' : 'Enroll Now'}</button>
          <div className="pt-6"><p className="text-xl font-medium text-gray-800">What's in the course?</p><ul className="ml-4 pt-2 text-sm list-disc text-gray-500"><li>Lifetime access with free updates.</li><li>Step-by-step, hands-on project guidance.</li><li>Downloadable resources and source code.</li><li>Quizzes to test your knowledge.</li><li>Certificate of completion.</li></ul></div>
        </div>
      </div>
    </div>
    <Footer />
  </>;
};
export default CourseDetails;

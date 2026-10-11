import { useContext, useMemo, useState } from 'react';
import YouTube from 'react-youtube';
import humanizeDuration from 'humanize-duration';
import { useParams } from 'react-router-dom';
import Rating from '../../components/student/Rating';
import Footer from '../../components/student/Footer';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Player = () => {
  const { courseId } = useParams();
  const { enrolledCourses, calculateChapterTime, getCourseProgress, markLectureComplete, rateCourse, calculateRating } = useContext(AppContext);
  const courseData = useMemo(() => enrolledCourses.find((course) => course._id === courseId), [enrolledCourses, courseId]);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  if (!courseData) return <Loading />;
  const progressData = getCourseProgress(courseId);
  const currentRating = calculateRating(courseData);
  return <>
    <div className="p-4 sm:p-10 grid md:grid-cols-2 gap-10 md:px-36">
      <div className="text-gray-800">
        <h1 className="text-2xl font-semibold">{courseData.courseTitle}</h1>
        <h2 className="text-xl font-semibold mt-8">Course Structure</h2>
        <div className="pt-5">{courseData.courseContent.map((chapter, index) => <div key={chapter.chapterId} className="border border-gray-300 bg-white mb-2 rounded"><button className="w-full flex items-center justify-between px-4 py-3 text-left" onClick={() => setOpenSections((p) => ({ ...p, [index]: !p[index] }))}><span className="flex items-center gap-2"><img src={assets.down_arrow_icon} alt="" className={`transition-transform ${openSections[index] ? 'rotate-180' : ''}`} />{chapter.chapterTitle}</span><span className="text-sm">{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</span></button>{openSections[index] && <ul className="px-4 py-2 border-t">{chapter.chapterContent.map((lecture, i) => { const completed = progressData.lectureCompleted.includes(lecture.lectureId); return <li key={lecture.lectureId} className="flex items-center gap-2 py-2"><img src={completed ? assets.blue_tick_icon : assets.play_icon} alt="" className="w-4 h-4" /><div className="flex justify-between w-full text-sm"><p>{i + 1}. {lecture.lectureTitle}</p><div className="flex gap-3"><button onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })} className="text-blue-500">Watch</button><span>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</span></div></div></li>; })}</ul>}</div>)}</div>
        <div className="flex items-center gap-3 py-3 mt-10"><h2 className="text-xl font-bold">Rate this Course:</h2><Rating initialRating={currentRating} onRate={(rating) => rateCourse(courseId, rating)} /></div>
      </div>
      <div className="md:mt-10">{playerData ? <div><YouTube iframeClassName="w-full aspect-video" videoId={playerData.lectureUrl.split('v=')[1]?.split('&')[0] || playerData.lectureUrl.split('/').pop()} /><div className="flex justify-between items-center mt-2"><p className="text-lg">{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p><button onClick={() => markLectureComplete(courseId, playerData.lectureId)} className="text-blue-600">{progressData.lectureCompleted.includes(playerData.lectureId) ? 'Completed' : 'Mark Complete'}</button></div></div> : <img src={courseData.courseThumbnail} alt={courseData.courseTitle} className="w-full" />}</div>
    </div>
    <Footer />
  </>;
};
export default Player;

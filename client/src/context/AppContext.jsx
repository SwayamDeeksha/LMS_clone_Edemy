import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import { toast } from 'react-toastify';
import { mockCourses } from '../assets/mockData';

export const AppContext = createContext(null);

const COURSES_KEY = 'edemy-courses-v2';
const USER_KEY = 'edemy-user-v2';
const ENROLLED_KEY = 'edemy-enrolled-v2';
const PROGRESS_KEY = 'edemy-progress-v2';
const ROLE_KEY = 'edemy-role-v2';

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = '$';
  const [allCourses, setAllCourses] = useState(() => readStorage(COURSES_KEY, mockCourses));
  const [userData, setUserData] = useState(() => readStorage(USER_KEY, null));
  const [isEducator, setIsEducator] = useState(() => localStorage.getItem(ROLE_KEY) === 'educator');
  const [enrolledIds, setEnrolledIds] = useState(() => readStorage(ENROLLED_KEY, []));
  const [progress, setProgress] = useState(() => readStorage(PROGRESS_KEY, {}));
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => localStorage.setItem(COURSES_KEY, JSON.stringify(allCourses)), [allCourses]);
  useEffect(() => localStorage.setItem(ENROLLED_KEY, JSON.stringify(enrolledIds)), [enrolledIds]);
  useEffect(() => localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)), [progress]);
  useEffect(() => {
    if (userData) localStorage.setItem(USER_KEY, JSON.stringify(userData));
    else localStorage.removeItem(USER_KEY);
  }, [userData]);

  const enrolledCourses = useMemo(
    () => allCourses.filter((course) => enrolledIds.includes(course._id)),
    [allCourses, enrolledIds]
  );

  const loginDemo = useCallback(() => {
    const demoUser = { _id: 'demo-user', name: 'Demo Student', email: 'student@edemy.local', enrolledCourses: enrolledIds };
    setUserData(demoUser);
    setShowLogin(false);
    toast.success('Signed in as Demo Student');
  }, [enrolledIds]);

  const logoutDemo = useCallback(() => {
    setUserData(null);
    setIsEducator(false);
    localStorage.removeItem(ROLE_KEY);
    navigate('/');
  }, [navigate]);

  const becomeEducator = useCallback(() => {
    if (!userData) {
      setShowLogin(true);
      toast.info('Sign in first to become an educator');
      return;
    }
    setIsEducator((current) => {
      const next = !current;
      localStorage.setItem(ROLE_KEY, next ? 'educator' : 'student');
      return next;
    });
  }, [userData]);

  const enrollCourse = useCallback((courseId) => {
    if (!userData) {
      setShowLogin(true);
      toast.info('Sign in to enroll in a course');
      return false;
    }
    if (enrolledIds.includes(courseId)) {
      toast.info('Already enrolled');
      return true;
    }
    setEnrolledIds((ids) => [...ids, courseId]);
    setUserData((user) => ({ ...user, enrolledCourses: [...(user?.enrolledCourses || []), courseId] }));
    toast.success('Course enrolled successfully');
    return true;
  }, [enrolledIds, userData]);

  const addCourse = useCallback((course) => {
    const newCourse = {
      ...course,
      _id: crypto.randomUUID(),
      educator: { _id: 'demo-user', name: userData?.name || 'Demo Educator' },
      courseRatings: [],
      enrolledStudents: [],
      createdAt: new Date().toISOString(),
      isPublished: true,
    };
    setAllCourses((courses) => [newCourse, ...courses]);
    toast.success('Course added successfully');
    return newCourse;
  }, [userData]);

  const calculateChapterTime = useCallback((chapter) => {
    const time = chapter.chapterContent.reduce((total, lecture) => total + Number(lecture.lectureDuration || 0), 0);
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
  }, []);

  const calculateCourseDuration = useCallback((course) => {
    const time = course.courseContent.reduce(
      (total, chapter) => total + chapter.chapterContent.reduce((chapterTotal, lecture) => chapterTotal + Number(lecture.lectureDuration || 0), 0),
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
  }, []);

  const calculateRating = useCallback((course) => {
    if (!course.courseRatings?.length) return 0;
    return Math.round(course.courseRatings.reduce((sum, item) => sum + Number(item.rating || 0), 0) / course.courseRatings.length);
  }, []);

  const calculateNoOfLectures = useCallback((course) =>
    course.courseContent.reduce((total, chapter) => total + chapter.chapterContent.length, 0), []);

  const getCourseProgress = useCallback((courseId) => progress[courseId] || { lectureCompleted: [] }, [progress]);

  const markLectureComplete = useCallback((courseId, lectureId) => {
    setProgress((current) => {
      const existing = current[courseId] || { lectureCompleted: [] };
      if (existing.lectureCompleted.includes(lectureId)) return current;
      return { ...current, [courseId]: { lectureCompleted: [...existing.lectureCompleted, lectureId] } };
    });
    toast.success('Lecture marked as complete');
  }, []);

  const rateCourse = useCallback((courseId, rating) => {
    setAllCourses((courses) => courses.map((course) => {
      if (course._id !== courseId) return course;
      const ratings = course.courseRatings || [];
      const withoutMine = ratings.filter((item) => item.userId !== userData?._id);
      return { ...course, courseRatings: [...withoutMine, { userId: userData?._id || 'demo-user', rating }] };
    }));
    toast.success('Rating saved');
  }, [userData]);

  const value = {
    showLogin, setShowLogin,
    currency, navigate,
    userData, setUserData, loginDemo, logoutDemo,
    isEducator, setIsEducator, becomeEducator,
    allCourses, fetchAllCourses: () => {}, enrolledCourses,
    enrollCourse, addCourse,
    calculateChapterTime, calculateCourseDuration, calculateRating, calculateNoOfLectures,
    getCourseProgress, markLectureComplete, rateCourse,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

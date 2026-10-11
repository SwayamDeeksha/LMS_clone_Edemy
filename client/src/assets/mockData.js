import { assets } from './assets';

const lecture = (id, title, duration, preview = false) => ({
  lectureId: id,
  lectureTitle: title,
  lectureDuration: duration,
  lectureUrl: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
  isPreviewFree: preview,
  lectureOrder: Number(id.replace(/\D/g, '')) || 1,
});

const chapter = (id, title, lectures) => ({
  chapterId: id,
  chapterOrder: Number(id.replace(/\D/g, '')) || 1,
  chapterTitle: title,
  chapterContent: lectures,
});

const makeCourse = ({ id, title, description, thumbnail, price, discount, ratings, chapters }) => ({
  _id: id,
  courseTitle: title,
  courseDescription: description,
  courseThumbnail: thumbnail,
  coursePrice: price,
  isPublished: true,
  discount,
  courseContent: chapters,
  educator: { _id: 'greatstack', name: 'GreatStack' },
  courseRatings: ratings.map((rating, index) => ({ userId: `review-${id}-${index}`, rating })),
  enrolledStudents: [],
  createdAt: new Date('2026-01-15').toISOString(),
});

export const mockCourses = [
  makeCourse({
    id: 'course-1',
    title: 'Introduction to JavaScript',
    description: '<h2>Learn the Basics of JavaScript</h2><p>Build a strong foundation in JavaScript with practical examples covering syntax, variables, functions, arrays, objects, and modern web development.</p><ul><li>Understand JavaScript fundamentals</li><li>Write interactive web code</li><li>Build a foundation for advanced development</li></ul>',
    thumbnail: assets.course_1_thumbnail,
    price: 49.99, discount: 20, ratings: [4, 4],
    chapters: [
      chapter('ch1', 'Getting Started with JavaScript', [lecture('l1', 'What is JavaScript?', 10, true), lecture('l2', 'Variables and Data Types', 15)]),
      chapter('ch2', 'Functions and Objects', [lecture('l3', 'Functions', 18, true), lecture('l4', 'Objects and Arrays', 20)]),
    ],
  }),
  makeCourse({
    id: 'course-2', title: 'Advanced Python Programming',
    description: '<h2>Deep Dive into Python Programming</h2><p>Take your Python skills further with advanced programming concepts, clean code practices, object-oriented programming, and useful standard-library techniques.</p>',
    thumbnail: assets.course_2_thumbnail, price: 79.99, discount: 15, ratings: [4,4,4,4,4],
    chapters: [chapter('ch1', 'Advanced Data Structures', [lecture('l1', 'Lists, Tuples and Sets', 16, true), lecture('l2', 'Dictionaries', 18)]), chapter('ch2', 'Object-Oriented Programming', [lecture('l3', 'Classes and Objects', 20, true), lecture('l4', 'Inheritance', 22)])],
  }),
  makeCourse({
    id: 'course-3', title: 'Cloud Computing Essentials',
    description: '<h2>Understand Cloud Computing</h2><p>Learn the essential concepts behind cloud platforms, virtualization, storage, networking, deployment models, and scalable applications.</p>',
    thumbnail: assets.course_3_thumbnail, price: 69.99, discount: 20, ratings: [3,3,3,3,3],
    chapters: [chapter('ch1', 'Cloud Fundamentals', [lecture('l1', 'What is Cloud Computing?', 12, true), lecture('l2', 'Service Models', 15)]), chapter('ch2', 'Cloud Architecture', [lecture('l3', 'Virtualization', 18, true), lecture('l4', 'Scalable Applications', 20)])],
  }),
  makeCourse({
    id: 'course-4', title: 'Cybersecurity Basics',
    description: '<h2>Build Cybersecurity Awareness</h2><p>Explore common security threats, authentication, secure practices, network security fundamentals, and the principles used to protect digital systems.</p>',
    thumbnail: assets.course_4_thumbnail, price: 69.99, discount: 15, ratings: [4,4,4],
    chapters: [chapter('ch1', 'Security Fundamentals', [lecture('l1', 'Threats and Vulnerabilities', 14, true), lecture('l2', 'Authentication', 16)]), chapter('ch2', 'Network Security', [lecture('l3', 'Secure Networks', 18, true), lecture('l4', 'Security Best Practices', 20)])],
  }),
  makeCourse({
    id: 'course-5', title: 'Data Science and Machine Learning',
    description: '<h2>Start Your Data Science Journey</h2><p>Learn how data is prepared, explored, visualized, and used to build introductory machine-learning solutions.</p>',
    thumbnail: assets.course_1_thumbnail, price: 69.99, discount: 10, ratings: [],
    chapters: [chapter('ch1', 'Data Science Foundations', [lecture('l1', 'Introduction to Data Science', 14, true), lecture('l2', 'Data Preparation', 18)]), chapter('ch2', 'Machine Learning', [lecture('l3', 'Supervised Learning', 20, true), lecture('l4', 'Model Evaluation', 18)])],
  }),
  makeCourse({
    id: 'course-6', title: 'Web Development Bootcamp',
    description: '<h2>Build Modern Websites</h2><p>Learn the building blocks of modern web development and create responsive, interactive websites using HTML, CSS, JavaScript, and React concepts.</p>',
    thumbnail: assets.course_2_thumbnail, price: 79.99, discount: 6, ratings: [5],
    chapters: [chapter('ch1', 'Web Fundamentals', [lecture('l1', 'HTML and CSS', 16, true), lecture('l2', 'Responsive Design', 20)]), chapter('ch2', 'JavaScript and React', [lecture('l3', 'JavaScript Essentials', 22, true), lecture('l4', 'React Fundamentals', 25)])],
  }),
  makeCourse({
    id: 'course-7', title: 'Data Science with Python',
    description: '<h2>Analyze Data with Python</h2><p>Explore practical data analysis workflows with Python, including data cleaning, visualization, and introductory predictive analysis.</p>',
    thumbnail: assets.course_3_thumbnail, price: 79.99, discount: 10, ratings: [5],
    chapters: [chapter('ch1', 'Python for Data', [lecture('l1', 'NumPy and Pandas', 18, true), lecture('l2', 'Cleaning Data', 20)]), chapter('ch2', 'Visualization', [lecture('l3', 'Charts and Graphs', 18, true), lecture('l4', 'Exploratory Analysis', 22)])],
  }),
  makeCourse({
    id: 'course-8', title: 'Introduction to Cybersecurity',
    description: '<h2>Learn Cybersecurity Fundamentals</h2><p>Understand the fundamentals of digital security, safe computing practices, common attacks, and basic defensive strategies.</p>',
    thumbnail: assets.course_4_thumbnail, price: 59.99, discount: 15, ratings: [4],
    chapters: [chapter('ch1', 'Cybersecurity Essentials', [lecture('l1', 'Common Cyber Threats', 15, true), lecture('l2', 'Password Security', 14)]), chapter('ch2', 'Staying Safe Online', [lecture('l3', 'Phishing Awareness', 16, true), lecture('l4', 'Secure Browsing', 15)])],
  }),
];

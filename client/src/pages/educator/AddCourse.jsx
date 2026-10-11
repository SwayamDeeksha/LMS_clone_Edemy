import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AddCourse = () => {
  const { addCourse } = useContext(AppContext);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lecture, setLecture] = useState({ lectureTitle: '', lectureDuration: '', lectureUrl: '', isPreviewFree: false });

  useEffect(() => {
    if (!quillRef.current && editorRef.current) quillRef.current = new Quill(editorRef.current, { theme: 'snow', placeholder: 'Write a course description...' });
  }, []);

  const addChapter = () => {
    const title = window.prompt('Enter Chapter Name:');
    if (!title) return;
    setChapters((items) => [...items, { chapterId: crypto.randomUUID(), chapterTitle: title, chapterContent: [], collapsed: false }]);
  };

  const addLecture = () => {
    if (!lecture.lectureTitle || !lecture.lectureDuration || !lecture.lectureUrl || !currentChapterId) return;
    setChapters((items) => items.map((chapter) => chapter.chapterId === currentChapterId ? { ...chapter, chapterContent: [...chapter.chapterContent, { ...lecture, lectureId: crypto.randomUUID(), lectureDuration: Number(lecture.lectureDuration) }] } : chapter));
    setLecture({ lectureTitle: '', lectureDuration: '', lectureUrl: '', isPreviewFree: false });
    setShowPopup(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!image) return toast.error('Thumbnail Not Selected');
    const reader = new FileReader();
    reader.onload = () => {
      addCourse({ courseTitle, courseDescription: quillRef.current?.root.innerHTML || '<p>Course description</p>', coursePrice: Number(coursePrice), discount: Number(discount), courseThumbnail: reader.result, courseContent: chapters.length ? chapters.map(({ chapterId, chapterTitle, chapterContent }, index) => ({ chapterId, chapterTitle, chapterOrder: index + 1, chapterContent })) : [{ chapterId: crypto.randomUUID(), chapterTitle: 'Introduction', chapterOrder: 1, chapterContent: [] }] });
      setCourseTitle(''); setCoursePrice(''); setDiscount(0); setImage(null); setChapters([]); if (quillRef.current) quillRef.current.root.innerHTML = '';
    };
    reader.readAsDataURL(image);
  };

  return <div className="min-h-[70vh] p-4 md:p-8"><form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl w-full text-gray-500">
    <div><p>Course Title</p><input value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required className="mt-1 w-full py-2 px-3 rounded border" placeholder="Type here" /></div>
    <div><p>Course Description</p><div ref={editorRef} className="mt-1 bg-white" /></div>
    <div className="flex flex-wrap gap-6"><div><p>Course Price</p><input value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} type="number" min="0" required className="mt-1 w-32 py-2 px-3 rounded border" /></div><div><p>Discount %</p><input value={discount} onChange={(e) => setDiscount(e.target.value)} type="number" min="0" max="100" className="mt-1 w-32 py-2 px-3 rounded border" /></div><div><p>Course Thumbnail</p><label className="flex items-center gap-3 mt-1 cursor-pointer"><img src={assets.file_upload_icon} className="p-3 bg-blue-500 rounded w-12" alt="Upload" /><input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files?.[0] || null)} />{image && <span className="text-xs">{image.name}</span>}</label></div></div>
    <div>{chapters.map((chapter, index) => <div key={chapter.chapterId} className="border rounded mb-3 bg-white"><div className="flex justify-between p-3 border-b"><span>{index + 1}. {chapter.chapterTitle}</span><div className="flex gap-3"><button type="button" onClick={() => setChapters((items) => items.map((c) => c.chapterId === chapter.chapterId ? { ...c, collapsed: !c.collapsed } : c))}>{chapter.collapsed ? 'Expand' : 'Collapse'}</button><button type="button" onClick={() => setChapters((items) => items.filter((c) => c.chapterId !== chapter.chapterId))}>Remove</button></div></div>{!chapter.collapsed && <div className="p-3">{chapter.chapterContent.map((item) => <div key={item.lectureId} className="flex justify-between py-1 text-sm"><span>{item.lectureTitle} · {item.lectureDuration} mins</span><button type="button" onClick={() => setChapters((items) => items.map((c) => c.chapterId === chapter.chapterId ? { ...c, chapterContent: c.chapterContent.filter((l) => l.lectureId !== item.lectureId) } : c))}>Remove</button></div>)}<button type="button" className="mt-2 px-3 py-2 bg-gray-100 rounded" onClick={() => { setCurrentChapterId(chapter.chapterId); setShowPopup(true); }}>+ Add Lecture</button></div>}</div>)}<button type="button" onClick={addChapter} className="w-full bg-blue-100 p-2 rounded">+ Add Chapter</button></div>
    <button type="submit" className="bg-black text-white w-max py-2.5 px-8 rounded">ADD</button>
  </form>{showPopup && <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"><div className="bg-white p-5 rounded w-full max-w-md"><h2 className="text-lg font-semibold mb-4">Add Lecture</h2><input value={lecture.lectureTitle} onChange={(e) => setLecture({ ...lecture, lectureTitle: e.target.value })} className="w-full border p-2 mb-2" placeholder="Lecture Title" /><input value={lecture.lectureDuration} onChange={(e) => setLecture({ ...lecture, lectureDuration: e.target.value })} type="number" className="w-full border p-2 mb-2" placeholder="Duration (minutes)" /><input value={lecture.lectureUrl} onChange={(e) => setLecture({ ...lecture, lectureUrl: e.target.value })} className="w-full border p-2 mb-2" placeholder="YouTube URL" /><label className="flex gap-2 mb-4"><input type="checkbox" checked={lecture.isPreviewFree} onChange={(e) => setLecture({ ...lecture, isPreviewFree: e.target.checked })} /> Free Preview</label><div className="flex gap-2"><button type="button" onClick={addLecture} className="flex-1 bg-blue-600 text-white py-2 rounded">Add</button><button type="button" onClick={() => setShowPopup(false)} className="flex-1 border py-2 rounded">Cancel</button></div></div></div>}</div>;
};
export default AddCourse;

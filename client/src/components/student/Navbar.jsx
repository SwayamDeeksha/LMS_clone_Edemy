import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { userData, isEducator, becomeEducator, loginDemo, logoutDemo, navigate } = useContext(AppContext);
  const isCoursesListPage = location.pathname.includes('/course-list');

  return (
    <nav className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-200 py-4 ${isCoursesListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <Link to="/" onClick={() => window.scrollTo(0, 0)}>
        <img src={assets.logo} alt="Edemy" className="w-28 lg:w-32 cursor-pointer" />
      </Link>
      <div className="hidden md:flex items-center gap-5 text-gray-600">
        {userData && <>
          <button onClick={() => isEducator ? navigate('/educator') : becomeEducator()}>
            {isEducator ? 'Educator Dashboard' : 'Become Educator'}
          </button>
          <span>|</span>
          <Link to="/my-enrollments">My Enrollments</Link>
          <button onClick={logoutDemo} className="text-sm">Sign out</button>
        </>}
        {!userData && <button onClick={loginDemo} className="bg-blue-600 text-white px-5 py-2 rounded-full">Create Account</button>}
        {userData && <img src={assets.user_icon} alt="Profile" className="w-7 h-7" />}
      </div>
      <div className="md:hidden flex items-center gap-3 text-gray-600">
        {userData ? (
          <>
            <Link to="/my-enrollments" className="text-xs">Enrollments</Link>
            <button onClick={() => isEducator ? navigate('/educator') : becomeEducator()} className="text-xs">{isEducator ? 'Dashboard' : 'Educator'}</button>
            <button onClick={logoutDemo}><img src={assets.user_icon} alt="Sign out" className="w-7 h-7" /></button>
          </>
        ) : <button onClick={loginDemo}><img src={assets.user_icon} alt="Create account" className="w-7 h-7" /></button>}
      </div>
    </nav>
  );
};

export default Navbar;

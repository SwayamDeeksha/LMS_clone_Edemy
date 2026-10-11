import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Navbar = ({ bgColor = 'bg-white' }) => {
  const { userData, logoutDemo } = useContext(AppContext);
  if (!userData) return null;
  return (
    <div className={`flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 ${bgColor}`}>
      <Link to="/"><img src={assets.logo} alt="Edemy" className="w-28 lg:w-32" /></Link>
      <div className="flex items-center gap-4 text-gray-500">
        <p>Hi! {userData.name}</p>
        <button onClick={logoutDemo} className="text-sm text-blue-600">Sign out</button>
      </div>
    </div>
  );
};
export default Navbar;

import { assets } from '../../assets/assets';

const Footer = () => (
  <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
    <div className="flex items-center gap-4"><img className="hidden md:block w-20" src={assets.logo} alt="Edemy" /><div className="hidden md:block h-7 w-px bg-gray-500/60" /><p className="py-4 text-center text-xs md:text-sm text-gray-500">Copyright 2026 © Edemy. All Right Reserved.</p></div>
    <div className="flex items-center gap-3 max-md:mt-4"><a href="#" aria-label="Facebook"><img src={assets.facebook_icon} alt="" /></a><a href="#" aria-label="Twitter"><img src={assets.twitter_icon} alt="" /></a><a href="#" aria-label="Instagram"><img src={assets.instagram_icon} alt="" /></a></div>
  </footer>
);
export default Footer;

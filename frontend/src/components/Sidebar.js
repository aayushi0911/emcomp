import {useState} from 'react';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import {FaMusic, FaStickyNote, FaBrain, FaClock, FaSyncAlt, FaBars, FaTimes, FaArrowLeft, FaSignOutAlt} from 'react-icons/fa';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';

const menuItems = [
  {path:'/select',icon:<FaArrowLeft/>,label:'Back to Modules'},
  {path:'/emotion',icon:<FaMusic/>,label:'Playlist'},
  {path:'/notes',icon:<FaStickyNote/>,label:'Smart Notes'},
  {path:'/mindmap',icon:<FaBrain/>,label:'Reading Map'},
  {path:'/timecapsule',icon:<FaClock/>,label:'Time Capsule'},
  {path:'/refresh',icon:<FaSyncAlt/>,label:'Break Time'}
];

const Sidebar=()=>{
  const [expanded,setExpanded]=useState(true);
  const navigate=useNavigate();
  const location=useLocation();
  const handleSignOut=async()=>{
    try{
      await signOut(auth);
      navigate('/login');
    }catch(e){console.error('Sign out failed:',e);}
  };
  return(
    <>
      {!expanded&&<div className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden" onClick={()=>setExpanded(true)} aria-label="Open sidebar"/>}
      <aside className={`${expanded?'w-56':'w-16'} bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 min-h-screen text-gray-100 transition-all duration-300 fixed z-20 shadow-lg flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-purple-700">
          {expanded&&<span className="text-xl font-semibold tracking-wide select-none text-purple-200">{location.pathname==='/select'?'Modules':"Let's Enjoy!"}</span>}
          <button onClick={()=>setExpanded(v=>!v)} aria-label={expanded?'Collapse sidebar':'Expand sidebar'} className="focus:outline-none text-xl text-purple-300 hover:text-purple-100 transition">
            {expanded?<FaTimes/>:<FaBars/>}
          </button>
        </div>
        <nav className="mt-6 flex-1 flex flex-col items-center">
          {menuItems.map(({path,icon,label})=>(
            <NavLink to={path} key={path} className={({isActive})=>
              `flex flex-col items-center justify-center h-16 w-full rounded-md transition-colors duration-200 ${isActive?'bg-purple-700':'hover:bg-purple-700'}`}>
              <span className="text-xl text-purple-300">{icon}</span>
              {expanded&&<span className="mt-1 text-sm font-medium select-none text-purple-200">{label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="mb-6 mt-auto px-4">
          <button onClick={handleSignOut} className="flex flex-col items-center justify-center h-16 w-full gap-1 text-sm text-pink-400 hover:text-pink-600 transition rounded-md bg-purple-800 hover:bg-purple-700">
            <FaSignOutAlt className="text-lg text-pink-400"/>{expanded&&<span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;

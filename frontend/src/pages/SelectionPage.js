import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";

const mods=[
  {txt:"Emotion Playlist",route:"/emotion",clr:"bg-pink-500 hover:bg-pink-400"},
  {txt:"Smart Notes",route:"/notes",clr:"bg-purple-500 hover:bg-purple-400"},
  {txt:"Time Capsule",route:"/timecapsule",clr:"bg-blue-500 hover:bg-blue-400"},
  {txt:"Mind Map",route:"/mindmap",clr:"bg-yellow-400 hover:bg-yellow-300 text-purple-800"},
  {txt:"Refresh Zone",route:"/refresh",clr:"bg-teal-400 hover:bg-teal-300 text-purple-900"},
  {txt:"Exit",route:"/exit",clr:"bg-gray-700 hover:bg-gray-600"}
];
export default function SelectionPage(){
  const nav=useNavigate();
  return(
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex flex-col items-center justify-center text-white p-4">
      <motion.h1 className="text-4xl font-bold mb-2" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>Choose a Module</motion.h1>
      <p className="mb-10 text-purple-200 text-sm">Pick anything. You can’t go wrong here!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mods.map((m,i)=>
          <motion.button
            key={i}
            onClick={()=>nav(m.route)}
            whileHover={{scale:1.08,rotate:-2}}
            whileTap={{scale:.97,rotate:2}}
            className={`${m.clr} p-6 rounded-xl text-lg font-semibold shadow-md transition-all w-64 outline-none focus:ring-2 ring-pink-300`}
            style={{transition:'all .18s'}}
          >{m.txt}</motion.button>
        )}
      </div>
    </div>
  );
}

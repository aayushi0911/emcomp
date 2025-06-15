import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";

export default function MainPage(){
  const nav=useNavigate();
  return(
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center text-white p-4">
      <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1}} className="text-center w-full max-w-xl p-8 rounded-xl" style={{
        background:'rgba(55,0,60,0.28)',
        boxShadow:'0 8px 32px 0 rgba(31,38,135,0.25)',
        backdropFilter:'blur(10px)',
        WebkitBackdropFilter:'blur(10px)',
        border:'1px solid rgba(255,255,255,0.12)'
      }}>
        <h1 className="text-5xl font-bold mb-6">Welcome to Emotion Companion</h1>
        <p className="mb-8 text-lg">Discover your emotions, jot down your thoughts, and revisit your memories—all in one place.</p>
        <button onClick={()=>nav("/select")} className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-lg text-xl font-semibold hover:opacity-90 transition">Get Started</button>
      </motion.div>
    </div>
  );
}


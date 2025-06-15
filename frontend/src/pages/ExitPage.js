import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';

export default function ExitPage(){
  const navigate=useNavigate();
  const handleBack=async()=>{await signOut(auth);navigate('/login');};
  return(
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center justify-center text-white p-4">
      <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1}} className="text-center">
        <h1 className="text-5xl font-bold mb-6">Thank you for using Emotion Companion</h1>
        <p className="mb-8 text-lg max-w-md mx-auto">We appreciate you spending time with us. Hope to see you again soon.</p>
        <button onClick={handleBack} className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-lg text-xl font-semibold hover:opacity-90 transition">
          Back to Login
        </button>
      </motion.div>
    </div>
  );
}

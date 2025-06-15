import {useState,useContext,useEffect} from "react";
import {motion,AnimatePresence} from "framer-motion";
import {AuthContext} from "../context/AuthProvider";
import {saveNote} from "../utils/saveNote";
import {getNotes} from "../utils/getNotes";
import {deleteNote} from "../utils/deleteNote";
import {v4 as id} from "uuid";

const getKw=t=>{
  const w=t.toLowerCase().replace(/[^\w\s]/gi,"").split(/\s+/).filter(x=>x.length>3);
  const f={};w.forEach(x=>f[x]=(f[x]||0)+1);
  return Object.entries(f).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([x])=>x);
};

export default function NotesPage(){
  const {user}=useContext(AuthContext)||{};
  const [txt,setTxt]=useState("");
  const [arr,setArr]=useState([]);
  useEffect(()=>{
    if(!user?.uid)return;
    (async()=>{
      try{setArr(await getNotes(user.uid));}catch{}
    })();
  },[user?.uid]);

  //.............................
  const save=async()=>{
    if(!txt.trim()||!user?.uid)return;
    const kw=getKw(txt);
    const n={id:id(),text:txt,keywords:kw,date:new Date().toLocaleString()};
    setArr(a=>[n,...a]);setTxt("");
    try{await saveNote(user.uid,n.id,n);}catch{}
  };
  const del=async(i)=>{
    setArr(a=>a.filter(x=>x.id!==i));
    try{await deleteNote(user.uid,i);}catch{}
  };
  return(
    <AnimatePresence mode="wait">
      <motion.div key="notes" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-30}} transition={{duration:.5}} className="p-4 md:p-8">
        <motion.h2 className="text-3xl font-bold mb-5" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>Smart Notes</motion.h2>
        <div className="w-full max-w-xl mx-auto mb-4 p-4 rounded-xl" style={{
          background:'rgba(255,255,255,0.12)',
          boxShadow:'0 8px 32px 0 rgba(128,90,213,0.15)',
          backdropFilter:'blur(8px)',
          WebkitBackdropFilter:'blur(8px)',
          border:'1px solid rgba(128,90,213,0.13)'
        }}>
          <textarea className="w-full h-28 p-3 rounded bg-white/80 text-black mb-3" placeholder="Write your note here..." value={txt} onChange={e=>setTxt(e.target.value)}/>
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} onClick={save} className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow hover:bg-pink-600 transition w-full">Save Note</motion.button>
        </div>
        <div className="mt-8 space-y-5">
          <AnimatePresence>
            {arr.map((n,i)=>(
              <motion.div key={n.id} initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.8,y:-20}} transition={{duration:.4,delay:i*.05,ease:"easeOut"}} whileHover={{scale:1.02,boxShadow:"0 8px 24px rgba(236,72,153,0.25)"}} className="relative bg-white shadow p-4 rounded-xl border-l-4 border-pink-400">
                <button onClick={()=>del(n.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm" aria-label="Delete">×</button>
                <div className="text-xs text-gray-500">{n.date}</div>
                <p className="mt-2 text-gray-800">{n.text}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {n.keywords.map((k,j)=>(
                    <span key={j} className={`px-2 py-1 rounded-full text-xs font-semibold ${j%2===0?'bg-pink-100 text-pink-600':'bg-purple-100 text-purple-700'}`}>#{k}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

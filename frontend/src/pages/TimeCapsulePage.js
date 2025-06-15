import {useState,useEffect,useContext} from "react";
import {motion,AnimatePresence} from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {v4 as id} from "uuid";
import {AuthContext} from "../context/AuthProvider";
import {saveCapsule} from "../utils/saveCapsule";
import {getCapsules} from "../utils/getCapsules";
import axios from "axios";

const upCloud=async(f,t)=>{
  const d=new FormData();
  d.append("file",f);d.append("upload_preset","capsule");d.append("folder","capsules");
  const url=`https://api.cloudinary.com/v1_1/dll4eeqfs/${t}/upload`;
  const r=await axios.post(url,d);
  return{url:r.data.secure_url,public_id:r.data.public_id};
};

export default function TimeCapsulePage(){
  const {user}=useContext(AuthContext)||{};
  const [msg,setMsg]=useState(""),[dt,setDt]=useState(new Date()),[tm,setTm]=useState(""),[img,setImg]=useState(null),[vid,setVid]=useState(null),[ip,setIp]=useState(null),[vp,setVp]=useState(null),[vt,setVt]=useState(""),[caps,setCaps]=useState([]),[open,setOpen]=useState(null),[showU,setShowU]=useState(false),[showL,setShowL]=useState(false),[now,setNow]=useState(new Date()),[load,setLoad]=useState(false);
  useEffect(()=>{
    if(user?.uid&&!load){
      getCapsules(user.uid).then(f=>{
        const local=JSON.parse(localStorage.getItem("capsules"))||[];
        const merged=[...f,...local.filter(lc=>!f.some(fc=>fc.id===lc.id))];
        const ask=f.length>0?window.confirm("Cloud capsules found. Load them?"):false;
        const final=ask?merged:local;
        setCaps(final);localStorage.setItem("capsules",JSON.stringify(final));setLoad(true);
      });
    }
  },[user,load]);
  useEffect(()=>{const i=setInterval(()=>setNow(new Date()),1e3);return()=>clearInterval(i);},[]);
  const save=async()=>{
    const unlock=new Date(`${dt.toDateString()} ${tm}`);
    if(unlock<new Date()){alert("No time travel. Pick future.");return;}
    if(!msg.trim()){alert("Write something.");return;}
    let imgUrl=null,imgId=null,vidUrl=null,vidId=null;
    try{
      if(img){const{url,public_id}=await upCloud(img,"image");imgUrl=url;imgId=public_id;}
      if(vid){const{url,public_id}=await upCloud(vid,"video");vidUrl=url;vidId=public_id;}
    }catch{alert("Upload fail.");return;}
    const cap={id:id(),date:dt.toISOString().split("T")[0],time:tm,message:msg,image:imgUrl,imagePublicId:imgId,media:vidUrl,mediaPublicId:vidId,mediaType:vid?vid.type.startsWith("video")?"video":"audio":"",unlocked:false};
    const upd=[...caps,cap];
    setCaps(upd);localStorage.setItem("capsules",JSON.stringify(upd));
    setMsg("");setImg(null);setVid(null);setIp(null);setVp(null);setVt("");
    alert("Saved!");
    if(user?.uid)try{await saveCapsule(user.uid,cap.id,cap);}catch{}
  };
  const del=async(id)=>{setCaps(caps.filter(c=>c.id!==id));setOpen(null);};
  const clearAll=()=>{if(window.confirm("Clear all?")){setCaps([]);localStorage.removeItem("capsules");}};
  const renderMedia=(src,t)=>t==="audio"?<audio controls className="mb-2 w-full"><source src={src}/></audio>:t==="video"?<video controls className="mb-2 w-full max-h-48"><source src={src}/></video>:null;
  return(
    <div className="p-4">
      <motion.h2 className="text-2xl font-bold mb-4" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>Time Capsule</motion.h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Your message..." className="w-full h-28 p-3 border rounded"/>
          <div className="flex gap-2 my-2">
            <label className="flex-1">
              <input type="file" accept="image/png,image/jpeg" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f){setImg(f);setIp(URL.createObjectURL(f));}}}/>
              <span className="w-full block bg-pink-500 hover:bg-pink-400 text-white py-2 px-2 rounded cursor-pointer text-center">Add Photo</span>
            </label>
            <label className="flex-1">
              <input type="file" accept="audio/*,video/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f){setVid(f);setVp(URL.createObjectURL(f));setVt(f.type.startsWith("video")?"video":"audio");}}}/>
              <span className="w-full block bg-blue-500 hover:bg-blue-400 text-white py-2 px-2 rounded cursor-pointer text-center">Add Audio/Video</span>
            </label>
          </div>
          {ip&&<img src={ip} alt="Preview" className="mb-2 max-h-24 rounded shadow"/>}
          {vp&&renderMedia(vp,vt)}
          <input type="time" value={tm} onChange={e=>setTm(e.target.value)} className="w-full p-2 border rounded mb-3"/>
          <button onClick={save} className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded w-full mb-2">Save Capsule</button>
          <button onClick={clearAll} className="bg-teal-400 hover:bg-teal-300 text-purple-900 py-2 px-4 rounded w-full">Clear All</button>
        </div>
        <Calendar value={dt} onClickDay={val=>setDt(val)} tileClassName={({date})=>caps.some(c=>c.date===date.toISOString().split("T")[0])?"bg-purple-400 text-white rounded":null}/>
      </div>
      <div className="flex gap-4 my-6">
        <button onClick={()=>setShowU(true)} className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded">Unlocked</button>
        <button onClick={()=>setShowL(true)} className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded">Locked</button>
      </div>
      {caps.map(c=>{
        const unlock=new Date(`${c.date}T${c.time}`),cd=Math.max(Math.floor((unlock-now)/1e3),0),tl=`${Math.floor(cd/3600)}h ${Math.floor((cd%3600)/60)}m ${cd%60}s`;
        return(
          <div key={c.id} className="bg-white shadow p-3 rounded mb-3 border">
            <div className="font-semibold">{c.date} at {c.time}</div>
            <div className="text-purple-600">{c.unlocked?"Unlocked":`Countdown: ${tl}`}</div>
            <button onClick={()=>del(c.id)} className="text-xs text-pink-500 mt-2">Delete</button>
          </div>
        );
      })}
      <AnimatePresence>
        {open&&(
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="bg-white p-4 rounded shadow max-w-md w-full" initial={{scale:.8}} animate={{scale:1}} exit={{scale:.8}}>
              <h3 className="text-lg font-bold text-purple-600 mb-2">Capsule Opened!</h3>
              <p className="mb-2">{open.message}</p>
              {open.image&&<img src={open.image} alt="capsule" className="mb-2 max-h-32 mx-auto rounded"/>}
              {renderMedia(open.media,open.mediaType)}
              <button onClick={()=>setOpen(null)} className="bg-gray-500 text-white px-3 py-1 rounded mt-2">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {showU&&(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded max-w-md w-full">
            <h3 className="text-lg font-bold text-green-600 mb-2">Unlocked</h3>
            {caps.filter(c=>c.unlocked).map(c=>(
              <div key={c.id} className="mb-2 p-2 border rounded">
                <strong>{c.date}</strong>: {c.message}
                {c.image&&<img src={c.image} alt="capsule" className="mt-1 max-h-20 rounded"/>}
                {renderMedia(c.media,c.mediaType)}
              </div>
            ))}
            <button onClick={()=>setShowU(false)} className="mt-2 bg-gray-500 text-white px-3 py-1 rounded">Close</button>
          </div>
        </div>
      )}
      {showL&&(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded max-w-md w-full">
            <h3 className="text-lg font-bold text-red-600 mb-2">Locked</h3>
            {caps.filter(c=>!c.unlocked).map(c=>(
              <div key={c.id} className="mb-1"><strong>{c.date}</strong>: Unlock at {c.time}</div>
            ))}
            <button onClick={()=>setShowL(false)} className="mt-2 bg-gray-500 text-white px-3 py-1 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

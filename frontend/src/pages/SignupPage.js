import {useState,useContext,useEffect} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";

export default function SignupPage(){
  const {user}=useContext(AuthContext)||{};
  const nav=useNavigate();
  const [em,setEm]=useState("");
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  useEffect(()=>{if(user)nav("/",{replace:true});},[user,nav]);
  const signup=async()=>{
    setErr("");
    if(!em||!pw){setErr("Please enter both email and password.");return;}
    if(pw.length<6){setErr("Password must be at least 6 characters.");return;}
    try{await createUserWithEmailAndPassword(auth,em,pw);}
    catch(e){
      if(e.code==="auth/email-already-in-use")setErr("An account with this email already exists.");
      else if(e.code==="auth/invalid-email")setErr("Please enter a valid email.");
      else setErr("Could not create account.");
    }
  };

  
  return(
    <div className="min-h-screen bg-purple-900 flex items-center justify-center text-white">
      <div className="w-80 p-6 rounded-xl space-y-4" style={{
        background:'rgba(55,0,60,0.35)',
        boxShadow:'0 8px 32px 0 rgba(31,38,135,0.37)',
        backdropFilter:'blur(8px)',
        WebkitBackdropFilter:'blur(8px)',
        border:'1px solid rgba(255,255,255,0.18)'
      }}>
        <h2 className="text-2xl font-bold">Sign Up</h2>
        {err&&<p className="text-red-400">{err}</p>}
        <input type="email" placeholder="Email" className="w-full px-3 py-2 rounded bg-purple-700" value={em} onChange={e=>setEm(e.target.value)} autoComplete="email"/>
        <input type="password" placeholder="Password" className="w-full px-3 py-2 rounded bg-purple-700" value={pw} onChange={e=>setPw(e.target.value)} autoComplete="new-password"/>
        <button onClick={signup} className="w-full bg-pink-500 py-2 rounded hover:opacity-90">Sign Up</button>
        <button type="button" onClick={()=>nav("/login")} className="text-sm text-pink-200 underline">Already have an account? Log in</button>
      </div>
    </div>
  );
}

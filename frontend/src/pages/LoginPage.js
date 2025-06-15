import {useState,useContext,useEffect} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthProvider';

export default function LoginPage(){
  const {user}=useContext(AuthContext)||{};
  const nav=useNavigate();
  const [em,setEm]=useState('');
  const [pw,setPw]=useState('');
  const [err,setErr]=useState('');
  useEffect(()=>{if(user)nav('/',{replace:true});},[user,nav]);
  const login=async()=>{
    setErr('');
    try{await signInWithEmailAndPassword(auth,em,pw);}
    catch{setErr('Invalid email or password. Please try again.');}
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
        <h2 className="text-2xl font-bold">Login</h2>
        {err&&<p className="text-red-400">{err}</p>}
        <input type="email" placeholder="Email" className="w-full px-3 py-2 rounded bg-purple-700" value={em} onChange={e=>setEm(e.target.value)} autoComplete="email"/>
        <input type="password" placeholder="Password" className="w-full px-3 py-2 rounded bg-purple-700" value={pw} onChange={e=>setPw(e.target.value)} autoComplete="current-password"/>
        <button onClick={login} className="w-full bg-pink-500 py-2 rounded hover:opacity-90">Log In</button>
        <button type="button" onClick={()=>nav('/signup')} className="text-sm text-pink-200 underline">Don’t have an account? Sign up</button>
      </div>
    </div>
  );
}

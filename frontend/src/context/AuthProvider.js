import {createContext,useEffect,useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';

export const AuthContext=createContext({user:null,loading:true});

const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,u=>{
      setUser(u);
      setLoading(false);
    });
    return ()=>unsub();
  },[]);
  if(loading) return <div className="text-white p-6">Loading authentication...</div>;
  return <AuthContext.Provider value={{user,loading}}>{children}</AuthContext.Provider>
};
export default AuthProvider;


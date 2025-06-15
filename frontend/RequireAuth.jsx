import {useContext} from "react";
import {Navigate,useLocation} from "react-router-dom";
import {AuthContext} from "./context/AuthProvider";

export default function RequireAuth({children}){
  const {user:u,loading:load}=useContext(AuthContext)||{};
  const loc=useLocation();
  if(load)return(
    <div className="min-h-screen bg-purple-900 flex items-center justify-center text-white">
      <h2 className="text-xl animate-pulse">Loading...</h2>
    </div>
  );
  if(!u)return <Navigate to="/login" state={{from:loc}} replace/>;
  return children;
}

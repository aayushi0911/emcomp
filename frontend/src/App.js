import {useContext} from "react";
import {AuthContext} from "./context/AuthProvider";
import RequireAuth from "./RequireAuth";
import {BrowserRouter as R,Routes,Route,Navigate,useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import SelectionPage from "./pages/SelectionPage";
import EmotionPage from "./pages/EmotionPage";
import NotesPage from "./pages/NotesPage";
import MindMapPage from "./pages/MindMapPage";
import TimeCapsulePage from "./pages/TimeCapsulePage";
import RefreshPage from "./pages/RefreshPage";
import ExitPage from "./pages/ExitPage";

function AppContent(){
  // const {user}=useContext(AuthContext)||{};
  const loc=useLocation();
  const showSb=!["/login","/signup","/exit","/","/select"].includes(loc.pathname);
  return(
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {showSb&&<Sidebar/>}
      <main className={`flex-1 ${showSb?"ml-20 md:ml-64":""} transition-all duration-300 overflow-y-auto`}>
        <AnimatePresence mode="wait">
          <Routes location={loc} key={loc.pathname}>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/" element={<RequireAuth><MainPage/></RequireAuth>}/>
            <Route path="/select" element={<RequireAuth><SelectionPage/></RequireAuth>}/>
            <Route path="/emotion" element={<RequireAuth><EmotionPage/></RequireAuth>}/>
            <Route path="/notes" element={<RequireAuth><NotesPage/></RequireAuth>}/>
            <Route path="/mindmap" element={<RequireAuth><MindMapPage/></RequireAuth>}/>
            <Route path="/timecapsule" element={<RequireAuth><TimeCapsulePage/></RequireAuth>}/>
            <Route path="/refresh" element={<RequireAuth><RefreshPage/></RequireAuth>}/>
            <Route path="/exit" element={<RequireAuth><ExitPage/></RequireAuth>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App(){
  return(
    <div className="App pb-10">
      <R>
        <AppContent/>
        <Footer/>
      </R>
    </div>
  );
}

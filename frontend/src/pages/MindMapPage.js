import {useRef,useState,useEffect,useContext} from "react";
import {motion} from "framer-motion";
import {ReactFlow,useNodesState,useEdgesState,MarkerType} from "@reactflow/core";
import {MiniMap} from "@reactflow/minimap";
import {Controls} from "@reactflow/controls";
import {Background} from "@reactflow/background";
import "reactflow/dist/style.css";
import {nanoid} from "nanoid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {getMindMaps} from "../utils/getMindMaps";
import {saveMindMap} from "../utils/saveMindMap";
import {AuthContext} from "../context/AuthProvider";

const gid="defaultMap";
const genres=["Fiction","Non-Fiction","Biography","Fantasy","Sci-Fi","Mystery","Poetry"];
const gclr={
  Fiction:"#a78bfa", // purple
  "Non-Fiction":"#38bdf8", // blue
  Biography:"#f472b6", // pink
  Fantasy:"#5eead4", // teal
  "Sci-Fi":"#facc15", // yellow
  Mystery:"#6366f1", // indigo
  Poetry:"#fff", // white
};
const getNodes=()=>[{id:"root",data:{label:"My Reading Journey"},position:{x:250,y:50},style:{backgroundColor:"#a78bfa",color:"white"},draggable:false}];

export default function MindMap(){
  const ref=useRef(null);
  const [nds,setNds,onNd]=useNodesState(getNodes());
  const [eds,setEds,onEd]=useEdgesState([]);
  const [ttl,setTtl]=useState("");
  const [gen,setGen]=useState(genres[0]);
  const [tab,setTab]=useState("All");
  const [load,setLoad]=useState(false);
  const [pop,setPop]=useState(false);
  const {user}=useContext(AuthContext);
  useEffect(()=>{
    async function f(){
      if(!user?.uid||load)return;
      const maps=await getMindMaps(user.uid);
      const d=maps.find(m=>m.id===gid);
      if(d?.nodes&&d?.edges){
        if(window.confirm("Load your saved mind map?")){
          try{
            const n=typeof d.nodes==="string"?JSON.parse(d.nodes):d.nodes;
            const e=typeof d.edges==="string"?JSON.parse(d.edges):d.edges;
            setNds(n);setEds(e);
          }catch{}
        }
      }
      setLoad(true);
    }
    f();
  },[user,load,setNds,setEds]);
  const save=async()=>{
    if(user?.uid){
      await saveMindMap(user.uid,gid,{nodes:nds,edges:eds});
      setPop(true);setTimeout(()=>setPop(false),1500);
    }
  };
  const add=()=>{
    if(!ttl.trim())return;
    const id=nanoid();




    const node={
      id,
      data:{label:`${ttl} (${gen})`},
      position:{x:Math.random()*600+50,y:Math.random()*400+100},
      genre:gen,
      style:{backgroundColor:gclr[gen],color:gen==="Poetry"?"#7c3aed":"white",padding:8,borderRadius:6}
    };
    const edge={
      id:`e-root-${id}`,
      source:"root",
      target:id,
      type:"smoothstep",
      markerEnd:{type:MarkerType.ArrowClosed}
    };
    setNds(ns=>[...ns,node]);
    setEds(es=>[...es,edge]);
    setTtl("");
  };
  const handleNode=n=>{
    const c=prompt("1. Edit  2. Delete","1");
    if(c==="1"){
      const t=prompt("New title:",n.data.label.split(" (")[0]);
      if(!t?.trim())return;
      const g=prompt("Select new genre:\n"+genres.map((x,i)=>`${i+1}. ${x}`).join("\n"),genres.indexOf(n.genre)+1);
      const idx=Number(g)-1;
      if(idx<0||idx>=genres.length)return;
      const newGen=genres[idx];
      setNds(ns=>ns.map(x=>x.id===n.id?{...x,data:{label:`${t} (${newGen})`},genre:newGen,style:{...x.style,backgroundColor:gclr[newGen],color:newGen==="Poetry"?"#7c3aed":"white"}}:x));
    }else if(c==="2"){



      if(window.confirm("Delete this node?")){
        setNds(ns=>ns.filter(x=>x.id!==n.id));
        setEds(es=>es.filter(e=>e.source!==n.id&&e.target!==n.id));
      }
    }
  };
  const clear=()=>{
    const ch=prompt("1. Clear current genre  2. Clear all","2");
    if(ch==="1"){
      const f=nds.filter(n=>n.id==="root"||n.genre!==tab);
      setNds(f);
      setEds(es=>es.filter(e=>f.some(n=>n.id===e.source)&&f.some(n=>n.id===e.target)));
    }else if(ch==="2"){
      setNds(getNodes());
      setEds([]);
    }
  };
  const exportImg=async(type)=>{
    const el=ref.current;if(!el)return;
    const canvas=await html2canvas(el);
    const img=canvas.toDataURL("image/png");
    if(type==="png"){
      const a=document.createElement("a");
      a.href=img;a.download="mindmap.png";a.click();
    }else{
      const pdf=new jsPDF({orientation:"landscape"});
      const w=pdf.internal.pageSize.getWidth();

      const h=(canvas.height*w)/canvas.width;
      pdf.addImage(img,"PNG",0,10,w,h);
      pdf.save("mindmap.pdf");
    }
  };
  const fNds=tab==="All"?nds:nds.filter(n=>n.genre===tab||n.id==="root");
  const fEds=tab==="All"?eds:eds.filter(e=>fNds.some(n=>n.id===e.source)&&fNds.some(n=>n.id===e.target));
  return(
    <div className="p-4">
      <motion.h2 className="text-2xl font-bold mb-3" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>MindMap</motion.h2>
      {pop&&<motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">Saved!</motion.div>}
      <div className="flex flex-wrap gap-2 mb-3">
        {["All",...genres].map(g=>
          <button key={g} onClick={()=>setTab(g)} className={`px-3 py-1 rounded text-xs font-semibold transition ${tab===g?
            g==="Fiction"?"bg-purple-400 text-white":
            g==="Non-Fiction"?"bg-blue-400 text-white":
            g==="Biography"?"bg-pink-400 text-white":
            g==="Fantasy"?"bg-teal-300 text-white":
            g==="Sci-Fi"?"bg-yellow-300 text-white":
            g==="Mystery"?"bg-indigo-400 text-white":
            g==="Poetry"?"bg-white text-purple-700":
            "bg-purple-700 text-white"
          :"bg-gray-200 text-gray-700"}`}>{g}</button>
        )}
      </div>
      <div className="flex gap-2 flex-wrap mb-3">
        <input placeholder="Title" value={ttl} onChange={e=>setTtl(e.target.value)} className="border p-2 rounded w-52 text-black"/>
        <select value={gen} onChange={e=>setGen(e.target.value)} className="border p-2 rounded font-semibold" style={{background:gclr[gen],color:gen==="Poetry"?"#7c3aed":"#222"}}>
          {genres.map(g=><option key={g} value={g}>{g}</option>)}
        </select>
        <button onClick={add} className="bg-purple-600 text-white px-4 py-2 rounded">Add</button>
        <button onClick={clear} className="bg-pink-500 text-white px-4 py-2 rounded">Clear</button>
        <button onClick={()=>exportImg("png")} className="bg-blue-500 text-white px-4 py-2 rounded">Export PNG</button>
        <button onClick={()=>exportImg("pdf")} className="bg-teal-500 text-white px-4 py-2 rounded">Export PDF</button>
        <button onClick={save} className="bg-yellow-400 text-white px-4 py-2 rounded">Save</button>
      </div>
      <div ref={ref} style={{height:"70vh"}}>
        <ReactFlow
          nodes={fNds}
          edges={fEds}
          onNodesChange={onNd}
          onEdgesChange={onEd}
          
          onNodeClick={(_,n)=>n.id!=="root"&&handleNode(n)}
          fitView
        >
          <MiniMap/>
          <Controls/>
          <Background/>
        </ReactFlow>
      </div>
    </div>
  );
}

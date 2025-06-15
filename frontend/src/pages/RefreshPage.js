import {useState,useEffect} from "react";
import {motion,AnimatePresence} from "framer-motion";

const colors={red:"Passion",orange:"Joy",yellow:"Happiness",green:"Calm",blue:"Peace",indigo:"Wisdom",violet:"Creativity",pink:"Love",teal:"Balance",brown:"Stability",black:"Mystery",white:"Clarity",gray:"Neutral",gold:"Confidence",silver:"Elegance",darkblue:"Sadness",darkred:"Anger",darkgray:"Depression",midnightblue:"Hurt",maroon:"Regret"};
const chs=["Draw a self-portrait","Do 10 jumping jacks","Make a paper airplane","Tell a joke to yourself","Take 3 deep breaths","Make a gratitude list","Dance for 1 minute","Water a plant","Send a kind message","Stretch your arms"];
const quizQs=[{q:"Pick a weather:",a:["Sunny","Rainy","Windy","Snowy"]},{q:"Pick a snack:",a:["Chips","Fruit","Chocolate","Noodles"]},{q:"How are you feeling now?",a:["Awesome!","Okay","Meh","Sleepy"]}];

export default function RefreshPage(){
  const [mod,setMod]=useState(null),[emo,setEmo]=useState(null),[ch,setCh]=useState(null),[up,setUp]=useState(null),[b,setB]=useState("Inhale"),[t,setT]=useState(4),[quiz,setQuiz]=useState(false),[ans,setAns]=useState([]);
  const colorKeys=Object.keys(colors); // now all colors!
  useEffect(()=>{
    if(mod==="breath"){
      let s=["Inhale","Hold","Exhale"],tm={Inhale:4,Hold:2,Exhale:4};
      const i=setInterval(()=>{setT(v=>v>1?v-1:(setB(s[(s.indexOf(b)+1)%s.length]),tm[s[(s.indexOf(b)+1)%s.length]]));},1e3);
      return()=>clearInterval(i);
    }
  },[b,mod]);
  const spin=()=>setCh(chs[Math.floor(Math.random()*chs.length)]);
  const luckyColor=()=>setEmo(colors[colorKeys[Math.floor(Math.random()*colorKeys.length)]]);
  const startQuiz=()=>{setQuiz(true);setAns([]);}
  const pickAns=a=>{setAns(x=>[...x,a]);if(ans.length===quizQs.length-1)setTimeout(()=>{setQuiz(false);alert("Your mood: "+["Cheerful","Chill","Curious","Quirky"][Math.floor(Math.random()*4)]+"!");},500);}
  return(
    <div className="min-h-screen text-white bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex flex-col justify-center items-center px-2 py-6">
      <style>{`.color-grid{display:grid;grid-template-columns:repeat(5,40px);gap:14px}.color-dot{width:40px;height:40px;border-radius:50%;cursor:pointer;border:2px solid white;transition:transform .2s}.color-dot:hover{transform:scale(1.15)}.bubble{width:${b==="Inhale"?"240px":b==="Hold"?"280px":"160px"};height:${b==="Inhale"?"240px":b==="Hold"?"280px":"160px"};background:radial-gradient(circle,#a78bfa,#7c3aed);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;transition:all 1s}`}</style>
      <AnimatePresence>
        {!mod&&!quiz&&(
          <motion.div className="flex flex-col items-center gap-5" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:.4}}>
            <h1 className="text-3xl font-bold mb-2">Refresh Zone</h1>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={()=>setMod("emotion")} className="bg-pink-500 px-4 py-2 rounded shadow hover:bg-pink-400">Pick a Color</button>
              <button onClick={()=>setMod("breath")} className="bg-purple-500 px-4 py-2 rounded shadow hover:bg-purple-400">Breathing Bubble</button>
              <button onClick={()=>{setMod("challenge");spin();}} className="bg-blue-500 px-4 py-2 rounded shadow hover:bg-blue-400">Fun Challenge</button>
              <button onClick={luckyColor} className="bg-yellow-400 px-4 py-2 rounded shadow hover:bg-yellow-300">Lucky Color</button>
              <button onClick={startQuiz} className="bg-teal-400 px-4 py-2 rounded shadow hover:bg-teal-300">Quick Mood Quiz</button>
            </div>
          </motion.div>
        )}
        {mod==="emotion"&&(
          <motion.div className="text-center mt-8" initial={{opacity:0}} animate={{opacity:1}}>
            <h2 className="text-2xl mb-3 font-bold">Color Mood Game</h2>
            <div className="color-grid mb-5 mx-auto">
              {colorKeys.map(c=>
                <div key={c} className="color-dot" style={{backgroundColor:c}} onClick={()=>setEmo(colors[c])}/>
              )}
            </div>
            {emo&&<motion.div className="text-lg font-semibold mt-2" initial={{opacity:0}} animate={{opacity:1}}>
              {emo}!
              <button onClick={()=>{setMod(null);setTimeout(()=>setMod("emotion"),100);}} className="ml-4 bg-purple-600 px-3 py-1 rounded text-sm">Play Again?</button>
            </motion.div>}
            <button onClick={()=>{setMod(null);setEmo(null);}} className="mt-6 bg-gray-800 px-4 py-2 rounded">Back</button>
          </motion.div>
        )}
        {mod==="breath"&&(
          <motion.div className="text-center flex flex-col items-center gap-4 mt-8" initial={{opacity:0}} animate={{opacity:1}}>
            <div className="bubble">{t}s</div>
            <h2 className="text-xl">{b}</h2>
            <button onClick={()=>setMod(null)} className="mt-4 bg-gray-800 px-4 py-2 rounded">Done</button>
          </motion.div>
        )}
        {mod==="challenge"&&(
          <motion.div className="text-center max-w-md mt-8" initial={{opacity:0}} animate={{opacity:1}}>
            <h2 className="text-2xl font-bold mb-3">Your Challenge</h2>
            <p className="mb-3 text-lg">{ch}</p>
            <label className="block mb-2">Give proof else it didn't happen!!</label>
            <input type="file" onChange={e=>setUp(e.target.files[0])} accept="image/*,video/*" className="mb-3"/>
            {up&&<p className="text-sm text-green-300 mb-2">Uploaded: {up.name}</p>}
            <button onClick={()=>{setMod(null);setUp(null);}} className="bg-green-500 px-4 py-2 rounded">Done</button>
          </motion.div>
        )}
        {emo&&!mod&&(
          <motion.div className="text-center mt-8" initial={{opacity:0}} animate={{opacity:1}}>
            <h2 className="text-xl mb-2">Your Lucky Emotion: {emo}</h2>
            <button onClick={()=>setEmo(null)} className="mt-4 bg-gray-800 px-4 py-2 rounded">Try Again</button>
          </motion.div>
        )}
        {quiz&&(
          <motion.div className="text-center mt-8" initial={{opacity:0}} animate={{opacity:1}}>
            <h2 className="text-2xl font-bold mb-3">Quick Mood Quiz</h2>
            {quizQs[ans.length]&&(
              <div>
                <p className="mb-2">{quizQs[ans.length].q}</p>
                <div className="flex flex-wrap gap-2 justify-center">{quizQs[ans.length].a.map(a=>
                  <button key={a} onClick={()=>pickAns(a)} className="bg-purple-400 px-3 py-1 rounded hover:bg-purple-500">{a}</button>
                )}</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

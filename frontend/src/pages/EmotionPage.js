import {useState} from 'react';
import {motion} from 'framer-motion';

const plMap={
  joy:{
    pop:'https://open.spotify.com/playlist/37i9dQZF1EIfYGwsYS3OAX?si=Fv6Y9CdiSJC8_E2oEI2oLg',
    rock:'https://open.spotify.com/playlist/37i9dQZF1EId9DMlWlVoSu?si=4mHleDMkTAuZEDbd76XNKQ',
    acoustic:'https://open.spotify.com/playlist/37i9dQZF1EIhMTXmkj03sv?si=s0kFVmrPTS-l13diF6M0bA',
    metal:'https://open.spotify.com/playlist/37i9dQZF1EIgSmyJCZE7Ie?si=0H00UDUmQIyAUhFR7RJQXw',
    random:'https://open.spotify.com/playlist/37i9dQZF1EVJSvZp5AOML2?si=8LGtxFxGTNqg7P-fZkiCJQ'
  },
  sadness:{
    pop:'https://open.spotify.com/playlist/37i9dQZF1EIdZrPvCvCkh4?si=3f73acdf45434217',
    rock:'https://open.spotify.com/playlist/37i9dQZF1EIcxHInSBQ4YQ?si=IVPKH_kARIOlbeD4ZzLYkQ',
    acoustic:'https://open.spotify.com/playlist/37i9dQZF1EIeQRmBVWmucS?si=bxsck4z2RnaAgqUmwoZuUg',
    metal:'https://open.spotify.com/playlist/37i9dQZF1EIgIV8RiK2jWE?si=eqMijyIITyGwde-QnWaQng',
    random:'https://open.spotify.com/playlist/37i9dQZF1EIhmSBwUDxg84?si=OF1BAhm8RK6qbQy6OUnthA'
  },
  anger:{
    pop:'https://open.spotify.com/playlist/37i9dQZF1EIfThrCEERy1q?si=kvydcNlHQpekJkzuq2vzTA',
    rock:'https://open.spotify.com/playlist/37i9dQZF1EIhPEivbiO6xe?si=fyTwkcGvSBakFJ4e5T2w-g',
    acoustic:'https://open.spotify.com/playlist/37i9dQZF1EIcy5i44MceAw?si=61uZZaMNSeG2vzoqBH5mkA',
    metal:'https://open.spotify.com/playlist/37i9dQZF1EIhftJcvhr4O0?si=cBJ_P8fKTemUNWQwT1H2mQ',
    random:'https://open.spotify.com/playlist/37i9dQZF1EIh2g9BXwCTIZ?si=3MUbs4EOTYerP0LtGrrJ2Q'
  },
  love:{
    pop:'https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn?si=fgiMMa_1QVKu5FIn0yoNLw',
    rock:'https://open.spotify.com/playlist/37i9dQZF1DX7Z7kYpKKGTc?si=08VxCqYkSQiFy_tR_U-p2A',
    acoustic:'https://open.spotify.com/playlist/37i9dQZF1DWSlwBojgQEcN?si=SyEQdg9uT_W-nRQOUeDGgw',
    metal:'https://open.spotify.com/playlist/37i9dQZF1EIgCBwZrC4njh?si=BdYmILvlQKGSa9F3A0Lxmg',
    random:'https://open.spotify.com/playlist/37i9dQZF1EIfFUEPTOA50z?si=qODGrbFsT36c3onimaS2bw'
  },
  fear:{
    pop:'https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn?si=fgiMMa_1QVKu5FIn0yoNLw',
    rock:'https://open.spotify.com/playlist/37i9dQZF1DX7Z7kYpKKGTc?si=08VxCqYkSQiFy_tR_U-p2A',
    acoustic:'https://open.spotify.com/playlist/37i9dQZF1DWSlwBojgQEcN?si=SyEQdg9uT_W-nRQOUeDGgw',
    metal:'https://open.spotify.com/playlist/37i9dQZF1EIgCBwZrC4njh?si=BdYmILvlQKGSa9F3A0Lxmg',
    random:'https://open.spotify.com/playlist/37i9dQZF1EIfFUEPTOA50z?si=qODGrbFsT36c3onimaS2bw'
  },
  surprise:{
    pop:'https://open.spotify.com/playlist/37i9dQZF1EIfYGwsYS3OAX?si=Fv6Y9CdiSJC8_E2oEI2oLg',
    rock:'https://open.spotify.com/playlist/37i9dQZF1EId9DMlWlVoSu?si=4mHleDMkTAuZEDbd76XNKQ',
    acoustic:'https://open.spotify.com/playlist/37i9dQZF1EIhMTXmkj03sv?si=s0kFVmrPTS-l13diF6M0bA',
    metal:'https://open.spotify.com/playlist/37i9dQZF1EIgSmyJCZE7Ie?si=0H00UDUmQIyAUhFR7RJQXw',
    random:'https://open.spotify.com/playlist/37i9dQZF1EVJSvZp5AOML2?si=8LGtxFxGTNqg7P-fZkiCJQ'
  }
};
const msgs={
  joy:"Yay! You're feeling joyful. Keep shining!",
  love:"Awww! You're feeling love. Enjoy the vibes!",
  sadness:"It's okay to feel sad. I'm here for you.",
  anger:"Take a deep breath. You're strong enough to handle this.",
  fear:"Shush! You're safe now. Listen to these melodies and feel better.",
  surprise:"Ooo! What a twist. Let's roll with it! Have fun!"
};
const moodMap={
  joy:'joy',amusement:'joy',excitement:'joy',pride:'joy',contentment:'joy',gratitude:'joy',optimism:'joy',
  love:'love',admiration:'love',caring:'love',
  sadness:'sadness',disappointment:'sadness',grief:'sadness',remorse:'sadness',
  anger:'anger',annoyance:'anger',disapproval:'anger',embarrassment:'anger',
  fear:'fear',nervousness:'fear',confusion:'fear',
  surprise:'surprise',realization:'surprise',relief:'joy',desire:'love'
};
const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;



export default function EmotionPage(){
  const [txt,setTxt]=useState('');
  const [gen,setGen]=useState('pop');
  const [mood,setMood]=useState(null);
  const [pl,setPl]=useState('');
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState('');
  const detect=async()=>{
    setLoading(true);setMood(null);setPl('');setMsg('');
    try{
      const res=await fetch('https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',{
        method:'POST',
        headers:{Authorization:`Bearer ${HF_TOKEN}`,'Content-Type':'application/json'},
        body:JSON.stringify({inputs:txt})
      });
      const result=await res.json();
      if(!Array.isArray(result)||!Array.isArray(result[0]))throw new Error('Unexpected API response format');
      const preds=result[0];
      const top=preds.sort((a,b)=>b.score-a.score)[0].label.toLowerCase();
      const m=moodMap[top]||'neutral';
      setMood(m);setMsg(msgs[m]||"You're feeling something unique.");
      const link=plMap[m]?.[gen]||'';
      setPl(link);
    }catch{setMsg('Could not detect emotion. Please try again later.');}
    finally{setLoading(false);}
  };

  return(
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white flex flex-col items-center justify-center p-6">
      <motion.h1 className="text-4xl font-bold mb-4">Emotion Playlist Generator</motion.h1>
      <textarea value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Type how you're feeling..." className="w-full max-w-xl p-4 rounded-lg text-black mb-4" rows={3}/>
      <div className="mb-4">
        <label className="mr-2">Select Genre:</label>
        <select value={gen} onChange={e=>setGen(e.target.value)} className="text-black p-2 rounded">
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="acoustic">Acoustic</option>
          <option value="metal">Metal</option>
          <option value="random">Random</option>
        </select>
      </div>
      <button onClick={detect} className="bg-pink-600 px-6 py-2 rounded hover:bg-pink-500 transition mb-6">Detect Emotion & Get Playlist</button>
      {loading&&<p className="text-lg">Analyzing your mood...</p>}
      {mood&&(
        <motion.div className="bg-white/10 p-6 rounded-xl max-w-xl w-full text-white text-center" initial={{opacity:0}} animate={{opacity:1}}>
          <h2 className="text-2xl font-bold mb-2">Detected Mood: {mood}</h2>
          <p className="mb-4 italic">{msg}</p>
          {pl?
            <a href={pl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition duration-300">Open Playlist</a>
            :<p>No playlist found for that mood and genre.</p>
          }
        </motion.div>
      )}
    </div>
  );
}

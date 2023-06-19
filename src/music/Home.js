import React, { useEffect } from "react";
import axios from "axios";
import './Home.css';
import vmsg from 'vmsg'
import { useState } from "react";


const recorder=new vmsg.Recorder({
    wasmURL:'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
})
export default function Home() {

    const [text,settext]=useState(false);
   const [recording,setrecordeing]=useState([])
   const[show,setshow]=useState(true)

  
const func=async()=>{
 settext(true);
if(text){
    const blob=await recorder.stopRecording()
    settext(false);
    setrecordeing([...recording,URL.createObjectURL(blob)])
}
else{
    try{
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        settext(true);
        console.log(recording);
    }
    catch(e){
        console.log(e);
    }
}

}
    return(
        <div className="homebox">
        
		{
           show ?
         (  <div className="soundbox">
           <ion-icon name="mic-outline" 
            
           onClick={(e)=>{setshow(false);e.target.style.color="red"}}
            style={{fontSize:"45px",color:"gray"}}
            
            ></ion-icon>
            </div>)
            :	(<div className="send">
                <ion-icon name="send"  className="anim"
            
            onClick={()=>{setshow(true)}}
                          
             ></ion-icon>
             </div>)
        }
          <ul>
     {
     
          recording.map((item)=>(
               <li key={item}>
                <audio src={item} controls></audio>
               </li>
            ))
     
     }
     
      </ul>
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" 
  viewBox="-25 -25 250 250" class="rotate"> 
  <path d="M97.48370773854259 0.03166364665794674 C65.50487796652664 -3.8608706725971174 6.216323111202611 53.71013603220382 1.055525653822471 85.50893391228179 C-3.913301090049635 116.12488399254822 33.68795819977693 183.1096296775674 63.1039536170453 192.9445090433365 C96.44110184346889 204.0903780358632 182.70145684922824 171.71853074935376 192.51317290559908 137.9646261530221 C204.2017170506 97.75412661617483 139.05178654418174 5.0914226963165365 97.48370773854259 0.03166364665794674Z" stroke="none" fill="#3fc1b0"  />
<h2 style={{color:"#000"}}>aaa</h2>
</svg>
        </div>
        
    )
}
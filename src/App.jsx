import React, { useState } from "react"; 
import "./App.css";
import { Game } from "./components/Game"; 

function App() { 
const [open, setOpen] = useState(false)
  return (
    <>
      <div className="App" style={{position: 'absolute', backgroundColor: '#242424', width: '30vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems:'center', top: open ? '-100%': '' }}>
        <button onClick={()=>{ setOpen(true)}} style={{ width: "200px", height: "50px", fontSize: "1.3rem" }}>
          Click to Start 
        </button>
      </div>
      <Game />
    </>
  );
}

export default App;

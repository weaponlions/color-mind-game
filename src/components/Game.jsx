import React, {useState, useEffect} from 'react'
import horn from '../assets/horn.mp3'
import wining from '../assets/wining.mp3'

let history = []
let userAction = []
const limit = 4
let perform = 0
let min = 0  
const val = parseInt(localStorage.getItem('maxScore')) || 0

export const Game = () => {
    const [score, setScore] = useState(0)
    const [count, setCount] = useState('') 
    const [max, setMax] = useState(val)
    const audio = new Audio(horn); 
    const winAudio = new Audio(wining); 

    const plusScore = (val) => {
        setScore((prev) => prev + val);
        if (score + 1 > max) {
            winAudio.play()
            localStorage.setItem('maxScore', max + 1)
        } 
    }

    useEffect(() => {
        if (parseInt(localStorage.getItem('maxScore')) > max) {
            setMax(parseInt(localStorage.getItem('maxScore'))) 
        }
    }, [score])
     
    const handleSpeed = () => {
        setInterval(()=>{
            setSpeed((prev) => prev - 1)
        }, 1000)
    }
    
    const minusScore = (val) => {
        if (score > 0) {
            setScore((prev) => prev - val); 
        }
    }
 

    const randomNumber = (limit) => {
        return(Math.floor(Math.random() * limit));
    }

    const getReady = () => {
        if (!localStorage.getItem('maxScore')) { 
            localStorage.setItem("maxScore", 0) 
        }
        const arr = []
        for (let index = 0; index < limit; index++) {
            arr.push(randomNumber(limit)) 
        }
        glowBox(arr);
    }

    const glowBox = async (arr) => { 
        for (let index = 0; index < arr.length; index++) { 
            const ele = document.querySelector(`#box${arr[index]}`)
            ele.style.opacity = '0.3';
            audio.play();
            await sleep(500 - min);
            ele.style.opacity = '1'
            await sleep(200 - min);
        }
        history = arr;
    }

    const sleep = async (milliseconds) => {
        await new Promise(resolve => {
            return setTimeout(resolve, milliseconds)
        });
    };

    const handleAction = async (e) => {
        let ID = parseInt(((e.target.id).split("box"))[1]); 
        let ele = document.querySelector(`#${e.target.id}`)
        ele.style.borderColor = 'black'
        perform = perform + 1;
        userAction.push(ID)
        await sleep(200);
        ele.style.borderColor = 'white'

        if (perform == limit) {
            handleSubmit()
        }
    }

    const handleSubmit = async() => {
        let Bool = true
        for (let index = 0; index < limit; index++) {
            if (history[index] != userAction[index]) {
                Bool = false;
                break;
            }  
        }
        if (Bool == true) {
            plusScore(1)
            min = min + 10
        }else{
            minusScore(1)
        }
        perform = 0;
        userAction = []
        history = []  
        setCount('Go...')
        await sleep(500); 
        getReady()
    }

  return (
    <>   
        <div className="main" style={{ }}>
            <div className="top" style={{}}> 
                <h2>COLOR-IN-MIND!</h2>
                <h3 style={{fontSize: "2.5rem", margin: "1.5rem" }}>
                    Score: <span className="score" style={{background: "#ffe5cf", padding: "0 3rem", lineHeight: 1, borderRadius: "1rem", color: "#3b1010" }}> {score} </span>
                </h3>
                <h3 style={{fontSize: "2rem", margin: "1.5rem" }}>
                    Max Score: <span className="score" style={{background: "#ffe5cf", padding: "0 3rem", lineHeight: 1, borderRadius: "1rem", color: "#3b1010" }}> {max} </span>
                </h3> 
                <button onClick={getReady} style={{width: "100px", margin: "1rem"}}>{count == ''? 'Start': count}</button>  
            </div>
            <div className="game" style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
                <div className="section" style={{ width: "350px", height: "320px", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center"}}>
                    <div id='box0' onClick={handleAction} style={{width: '150px', height: "150px", border: "2px solid white", backgroundColor: "red", borderRadius: "1rem",}} > </div>
                    <div id='box1' onClick={handleAction} style={{width: '150px', height: "150px", border: "2px solid white", backgroundColor: "green", borderRadius: "1rem"}} > </div>
                    <div id='box2' onClick={handleAction} style={{width: '150px', height: "150px", border: "2px solid white", backgroundColor: "yellow", borderRadius: "1rem"}} > </div>
                    <div id='box3' onClick={handleAction} style={{width: '150px', height: "150px", border: "2px solid white", backgroundColor: "blue", borderRadius: "1rem"}} > </div>
                    {/* <div id='box4' onClick={handleAction} style={{width: '150px', height: "150px", border: "2px solid white", backgroundColor: "purple", borderRadius: "1rem"}} > </div>
                    <div id='box5' onClick={handleAction} style={{width: '150px', height: "150px", border: "2px solid white", backgroundColor: "orange", borderRadius: "1rem"}} > </div> */}
                </div>
            </div>
        </div> 
    </>
  )
}

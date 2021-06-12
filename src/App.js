import { useEffect, useState } from 'react';
import './App.css';

function Horloge(props){
  return(
    <div className="theme-clock">
      <div className="needle sec" style={props.sStyle}></div>
      <div className="needle min" style={props.mStyle}></div>
      <div className="needle hour" style={props.hStyle}></div>
      <div className='needle_holder'></div>
    </div>
  )
}

function App() {
  let myTime = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//initializing our state to dark
  let [clockState, setClockState] = useState({
    dark:false,
    hoursForClock:myTime.getHours() % 12,
    date: {
      month:months[myTime.getMonth()],
      date:myTime.getDate(),
      day:days[myTime.getDay()],
    },
    time: {
      hours:myTime.getHours(),
      minutes:(myTime.getMinutes() < 10 ? '0'+myTime.getMinutes(): myTime.getMinutes()),
      seconds:(myTime.getSeconds() < 10 ? '0'+myTime.getSeconds(): myTime.getSeconds()),
      ampm:(myTime.getHours() >= 12 ? 'PM' : 'AM')
    },
    clockStyle:{
      h_style:{
        transform:"rotate("+((myTime.getHours() % 12)*360/12 - 85)+"deg)"
      },
      m_style:{
        transform:"rotate("+(myTime.getMinutes()*360/60 -90)+"deg)"
      },
      s_style:{
        transform:"rotate("+(myTime.getSeconds()*360/60 -90)+"deg)"
      }
    }
  });

//this witches the page between light and dark mode
  let changeModeHandler = () =>{
    //needles
    let min = document.querySelector(".min");
    min.style.backgroundColor = (!clockState.dark ? "white" : "black");
    let hour = document.querySelector(".hour");
    hour.style.backgroundColor = (!clockState.dark ? "white" : "black");
    //theme-clock
    let clock = document.querySelector(".theme-clock");
    clock.style.borderColor = (!clockState.dark ? "white" : "black");
    //backgruond change to dark
    let app = document.querySelector(".theme");
    app.style.backgroundColor = (!clockState.dark ? "black" : "white");

    let infos = document.querySelectorAll(".today");
    infos.forEach(info => {
      info.style.color = (!clockState.dark ? "white" : "black");
    })
    //changing button color
    const mode = document.querySelector('.mode');
    mode.style.backgroundColor = (!clockState.dark ? "white" : "black");
    mode.style.color = (!clockState.dark ? "black" : "white");
    //time effects
    app.style.transition = "2s";
    //update state
    let newClockState = {...clockState, dark:!clockState.dark}
    setClockState(newClockState);
  }

  //object that will recieve our time
  //let clockState = null;

//clock fuunction management  
  let TimeHandler = () => {
    myTime = new Date();
    let newClockState = {
      ...clockState, 
      date: {
        month:months[myTime.getMonth()],
        date:myTime.getDate(),
        day:days[myTime.getDay()],
      },
      time: {
        hours:myTime.getHours(),
        minutes:(myTime.getMinutes() < 10 ? '0'+myTime.getMinutes(): myTime.getMinutes()),
        seconds:(myTime.getSeconds() < 10 ? '0'+myTime.getSeconds(): myTime.getSeconds()),
        ampm:(myTime.getHours() >= 12 ? 'PM' : 'AM')
      },
      clockStyle:setAngles(myTime)
    }
    setClockState(newClockState);
  }

  let setAngles = (myTime) =>{
    //find the angle for a given hour
    return ({
      h_style:{
        transform:"rotate("+((myTime.getHours() % 12)*360/12 - 85)+"deg)"
      },
      m_style:{
        transform:"rotate("+(myTime.getMinutes()*360/60 -90)+"deg)"
      },
      s_style:{
        transform:"rotate("+(myTime.getSeconds()*360/60 -90)+"deg)"
      }
    });
  }
  
  setInterval(() => {
    TimeHandler()
  }, 1000);

  return (
    <div className="App" onTimeUpdateCapture>
      <div className="theme">
      <button className="mode" onClick={changeModeHandler}>Dark Mode</button>
        <Horloge 
          sStyle={clockState.clockStyle.s_style} 
          mStyle={clockState.clockStyle.m_style} 
          hStyle={clockState.clockStyle.h_style}
        />
        <div  className="timeSet">
          <p className="today">
            {clockState.time.hours}: {clockState.time.minutes}:{clockState.time.seconds} {clockState.time.ampm}
          </p>
          <p className="today">
            {clockState.date.day}, {clockState.date.month} <span className="circle">{clockState.date.date}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

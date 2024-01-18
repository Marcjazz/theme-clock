import { useState } from 'react'
import './App.css'

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
function Horloge({ isDarkMode, clockStyle }) {
  return (
    <div
      className='theme-clock'
      style={{ borderColor: isDarkMode ? 'black' : 'white' }}
    >
      <div className='needle sec' style={clockStyle.secondsNeedle}></div>
      <div
        className='needle min'
        style={{
          ...clockStyle.minutesNeedle,
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}
      ></div>
      <div
        className='needle hour'
        style={{
          ...clockStyle.hoursNeedle,
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}
      ></div>
      <div className='needle_holder'></div>
    </div>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [clockTime, setClockTime] = useState(new Date())

  let clockState = {
    dark: false,
    hoursForClock: clockTime.getHours() % 12,
    date: {
      month: MONTHS[clockTime.getMonth()],
      date: clockTime.getDate(),
      day: WEEKDAYS[clockTime.getDay()],
    },
    time: {
      hours: clockTime.getHours(),
      minutes:
        clockTime.getMinutes() < 10
          ? '0' + clockTime.getMinutes()
          : clockTime.getMinutes(),
      seconds:
        clockTime.getSeconds() < 10
          ? '0' + clockTime.getSeconds()
          : clockTime.getSeconds(),
      ampm: clockTime.getHours() >= 12 ? 'PM' : 'AM',
    },
    clockStyle: {
      hoursNeedle: {
        transform:
          'rotate(' + (((clockTime.getHours() % 12) * 360) / 12 - 85) + 'deg)',
      },
      minutesNeedle: {
        transform:
          'rotate(' + ((clockTime.getMinutes() * 360) / 60 - 90) + 'deg)',
      },
      secondsNeedle: {
        transform:
          'rotate(' + ((clockTime.getSeconds() * 360) / 60 - 90) + 'deg)',
      },
    },
  }

  setInterval(() => {
    setClockTime(new Date())
  }, 1000)

  return (
    <div className='App' onTimeUpdateCapture>
      <div
        className='theme'
        style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}
      >
        <button
          className='mode'
          style={{
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? 'black' : 'white',
          }}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <Horloge isDarkMode={isDarkMode} clockStyle={clockState.clockStyle} />
        <div className='timeSet'>
          <p
            className='today'
            style={{ color: isDarkMode ? 'black' : 'white', transition: '2s' }}
          >
            {clockState.time.hours}: {clockState.time.minutes}:
            {clockState.time.seconds} {clockState.time.ampm}
          </p>
          <p
            className='today'
            style={{ color: isDarkMode ? 'black' : 'white', transition: '2s' }}
          >
            {clockState.date.day}, {clockState.date.month}
            <span>{clockState.date.date}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

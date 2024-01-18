export function Clock({ isDarkMode, clockStyle }) {
  return (
    <div
      id='theme-clock'
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
  );
}

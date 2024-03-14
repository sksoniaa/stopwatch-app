import React, {useEffect, useState, useRef} from 'react'

export default function StopWatch() {

  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {

    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [isRunning])

  function start() {
    setIsRunning(true)
    startTimeRef.current = Date.now() - elapsedTime
    console.log(startTimeRef.current);
  }

  function stop() {
    setIsRunning(false)
  }

  function reset() {
    setElapsedTime(0)
    setIsRunning(false)
  }

  function format() {
    let hours = Math.floor(elapsedTime / (1000*60*60))
    let minutes = Math.floor(elapsedTime /(1000 *60) % 60)
    let seconds = Math.floor((elapsedTime / 1000)% 60)
    let milliseconds = Math.floor((elapsedTime % 1000) / 10)


    hours = String(hours).padStart(2, "0")
    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")
    milliseconds = String(milliseconds).padStart(2, '0')

    return `${minutes}:${seconds}:${milliseconds}`
  }

  return(
    <div className='stopwatch'>
      <div className="display">{format()}</div>
      <div className="controls">
        <button className='start-btn' onClick={start}>Start</button>
        <button className="stop-btn" onClick={stop}>Stop</button>
        <button className="reset-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
import { useEffect, useRef, useState } from "react"

function App() {
  const [activeKey, setActiveKey] = useState(null)
  const audioRef = useRef({})

  const soundsContainer = `grid grid-cols-3 gap-12 m-auto bg-gradient-to-br p-16
                           from-neutral-600 via-neutral-500 to-neutral-600 rounded-lg
                           shadow-lg shadow-neutral-800/30 w-11/12 md:w-10/12`
  const btn = `py-5 px-8 text-neutral-300 font-bold
               rounded-lg shadow-lg shadow-neutral-300/30
               transition-transform duration-150 hover:scale-110 active:scale-95`
  const btnBg = `bg-gradient-to-b from-neutral-700 to-neutral-600`

  const sounds = [
    {key : "Q", label : "Boom", src : "/sounds/boom.wav", color : "bg-lime-300"},
    {key : "W", label : "Clap", src : "/sounds/clap.wav", color : "bg-orange-300"},
    {key : "E", label : "Hihat", src : "/sounds/hihat.wav", color : "bg-purple-300"},
    {key : "A", label : "Kick", src : "/sounds/kick.wav", color : "bg-red-300"},
    {key : "S", label : "Openhat", src : "/sounds/openhat.wav", color : "bg-sky-300"},
    {key : "D", label : "Ride", src : "/sounds/ride.wav", color : "bg-green-300"},
    {key : "Z", label : "Snare", src : "/sounds/snare.wav", color : "bg-violet-300"},
    {key : "X", label : "Tink", src : "/sounds/tink.wav", color : "bg-indigo-300"},
    {key : "C", label : "Tom", src : "/sounds/tom.wav", color : "bg-emerald-300"}
  ]

  useEffect(() => {
    const handleKeyDown = e => {
      const key = e.key.toUpperCase()
      playSound(key)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const playSound = key => {
    const audio = audioRef.current[key]
    if(audio){
      audio.currentTime = 0
      audio.play()
      setActiveKey(key)
      setTimeout(() => setActiveKey(null), 300)
    }
  }


  const soundsBtn = sounds.map(s => (
    <button 
      className={`${btn} ${activeKey === s.key ? `${s.color} scale-95` : btnBg}`} 
      key={s.key} 
      onClick={() => playSound(s.key)}
    >
      <span>({s.key})</span> {s.label}
      <audio ref={el => (audioRef.current[s.key] = el)} src={s.src}/>
    </button>
  ))

  return (
    <div className="bg-neutral-200 min-h-screen flex flex-col" >
        <div className={soundsContainer}>
          {soundsBtn}
        </div>
    </div>
  )
}

export default App

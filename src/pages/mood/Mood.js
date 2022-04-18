import React, { useState, useEffect, useRef } from "react"
import "./style.css"



const moodImages = [
    "mood/img/bio.gif",
]

const moodAudio = [
    "mood/audio/both-of-us.mp3",
    "mood/audio/order.mp3",
    "mood/audio/relax.mp3",
    "mood/audio/showreel.mp3",
    "mood/audio/soul.mp3",
]

async function sleep(sec) {
    return new Promise((res) => setTimeout(res, sec * 1000))
}

function randomAudio() {
    let rand = Math.floor(Math.random() * moodAudio.length);
    let img = moodAudio[rand];
    return img
}

function randomImages() {
    let rand = Math.floor(Math.random() * moodImages.length);
    let img = moodImages[rand];
    return img
}



function Mood() {

    const [mood, setMood] = useState("")
    const [visi, setVisi] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setVisi(false)
        }, 4000)
    }, [])

    function handleMood(e) {
        let tgt = e.target.dataset;
        if (Object.entries(tgt).length > 0) {
            const { mood } = tgt;
            let moodPlayer = document.querySelector(".mood-player");

            if (moodPlayer !== null) {
                moodPlayer.classList.add("active")
                setMood(mood)
            }
        }
    }

    return (
        <div className="mood-cont">
            <div className="top-head">
                <h1>Medi</h1>
                <p>Brilliant things happen in calm minds. Be calm. You're brilliant</p>
                <br />
                <span>select your mood below</span>
            </div>
            <div className="bottom">
                <div className="box-cont">
                    <div className={mood === "relax" ? "bx active" : "bx"} onClick={handleMood} data-mood="relax">
                        <h1>😀</h1>
                        <small>Relax</small>
                    </div>
                    <div className={mood === "anxiety" ? "bx active" : "bx"} onClick={handleMood} data-mood="anxiety">
                        <h1>😰</h1>
                        <small>Anxiety</small>
                    </div>
                    <div className={mood === "sleep" ? "bx active" : "bx"} onClick={handleMood} data-mood="sleep">
                        <h1>😴</h1>
                        <small>Sleep</small>
                    </div>
                    <div className={mood === "stress" ? "bx active" : "bx"} onClick={handleMood} data-mood="stress">
                        <h1>😞</h1>
                        <small>Stress</small>
                    </div>
                </div>
            </div>
            {visi && <FlashScreen />}
            <MoodPlayer mood={mood} />
        </div>
    )
}

export default Mood


function MoodPlayer({ mood }) {

    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState("")
    const moodRef = useRef()
    const audioRef = useRef()

    const { current } = audioRef
    let audio = current;
    // let audio = new Audio()

    useEffect(() => {
        if (audio !== null || audio !== undefined) {
            switch (mood) {
                case "relax":
                    audio.src = moodAudio[2]
                    break;

                case "anxiety":
                    audio.src = moodAudio[0]
                    break;

                case "sleep":
                    audio.src = moodAudio[4]
                    break;

                case "stress":
                    audio.src = moodAudio[1]
                    break;

                default:
                    // audio.src = moodAudio[3]
                    break;
            }
        }
    }, [mood])

    function playAudio() {
        audio.play()
        if (audio.paused) {
            setIsPlaying(false)
        }
        if (isPlaying) {
            stopAudio()
            return
        }
        setIsPlaying(true)
    }

    function stopAudio() {
        audio.pause()
        audio.currentTime = 0
        setIsPlaying(false)

    }

    function closeMood() {
        const { current } = moodRef;
        if (current !== null) {
            current.classList.remove("active")
            stopAudio()
        }
    }

    return (
        <div className="mood-player" ref={moodRef}>
            <div className="top-cont">
                <ion-icon name="chevron-down-outline" class="icon" onClick={closeMood}></ion-icon>
                <p>now playing</p>
            </div>
            <div className="bottom-cont">
                <div className="top-bx">
                    <div className="bg" style={{
                        backgroundImage: `url(${moodImages[0]})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                    }}>
                    </div>
                    <br />
                    <h4>{mood}</h4>
                </div>
                <div className="controls">
                    <audio src={audioSrc} ref={audioRef} className="audio"></audio>
                    <ion-icon name={isPlaying ? "pause" : "play"} onClick={playAudio} class="icon"></ion-icon>
                </div>
            </div>
        </div>
    )
}

function FlashScreen() {

    return (
        <div className="m-flash-screen">
            <h3>Medi</h3>
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
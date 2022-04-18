import React, { useState, useEffect, useRef } from 'react'
import { FitDB } from '../../db/DB'
import Confetti from 'react-confetti'
import { AiTwotoneTrophy, AiFillHome, AiOutlineUser } from "react-icons/ai"
import { FaWeightHanging, FaCheckCircle, FaArrowUp, FaBullseye } from "react-icons/fa"
import { IoBarbellSharp } from "react-icons/io5"
import { IoMdClose, IoMdRefresh } from "react-icons/io"
import { BsCircleFill } from "react-icons/bs"
import Notification from "../../helpers/notyf";
import exerciseData from "./exercises.json"
import "./dashboard.css"
import avatar from "../../assets/img/avatar.png"

const notif = new Notification(3000);


const exercisesImages = [
    "exercises/fitness.svg",
    "exercises/fitness2.svg",
    "exercises/fitness3.svg",
    "exercises/fitness4.svg",
    "exercises/fitness4.svg",
    "exercises/fitness5.svg",
    "exercises/fitness6.svg",
]

const exercisesAcImages = [
    "exercises/achievements/1.png",
    "exercises/achievements/2.png",
    "exercises/achievements/3.png",
    "exercises/achievements/4.png",
    "exercises/achievements/4.png",
    "exercises/achievements/5.png",
]

async function sleep(sec) {
    return new Promise((res) => setTimeout(res, sec * 1000))
}

function randomImages() {
    let rand = Math.floor(Math.random() * exercisesImages.length);
    let img = exercisesImages[rand];
    return img
}

function randomAcImages() {
    let rand = Math.floor(Math.random() * exercisesAcImages.length);
    let img = exercisesAcImages[rand];
    return img
}

function UUID(len = 10) {
    let char = "abcdefgh0123456".split("")
    let id = ""
    for (let i = 0; i < len; i++) {
        let rand = Math.floor(Math.random() * char.length);
        id += char[rand]
    }
    return id
}

function Dashboard() {
    const [username, setUserName] = useState("")
    const [tagName, setTagName] = useState("")
    const [workoutExists, setWorkoutExists] = useState(false)
    const [workoutTags, setWorkoutTags] = useState([])
    const [workoutsData, setWorkoutsData] = useState([])
    const [startWorkoutData, setStartWorkoutData] = useState({})
    const [proVisi, setProVisi] = useState(false);
    const [hvisi, setHVisi] = useState(true);
    const [wvisi, setWVisi] = useState(false);
    const [acvisi, setAcVisi] = useState(false);
    const [mwvisi, setMWVisi] = useState(false);
    const [TargetedWorkoutsLessons, setTargetedWorkoutsLessons] = useState({})


    let fitnessData = localStorage.getItem("proact-fitness");
    let { userInfo } = JSON.parse(fitnessData)


    function getWorkoutsData() {
        let results = FitDB.getFitnessData;

        if (results.error === true) {
            return notif.error(results.message)
        }
        const { data } = results;

        setWorkoutsData(data.workouts)
        setWorkoutExists(true)

    }

    const tags = []
    function workoutsTags() {
        if (workoutsData.length > 0) {
            workoutsData.map((data) => {
                if (!tags.includes(data.wTag)) {
                    tags.push(data.wTag)
                }
            });
            setWorkoutTags(tags)
        }
    }

    function getWorkoutByTags(e) {
        let results = FitDB.getFitnessData;
        const { data } = results;
        let { tag } = e.target.dataset

        if (results.error === true) {
            return notif.error(results.message)
        }

        if (tag === "all") {
            setTagName(tag)
            return setWorkoutsData([...data.workouts])
        }

        if (data.workouts.length === 0) {
            setWorkoutsData([])
            setWorkoutExists(true)
            return
        }

        const filtData = data.workouts.filter((data) => data.wTag === tag);
        setWorkoutsData([...filtData])
        // setWorkoutCounts(filtData.length)
        setTagName(tag)
    }

    useEffect(() => {
        getWorkoutsData()
        workoutsTags()
    }, [workoutExists])


    useEffect(() => {
        setUserName(userInfo.name);
    }, [])

    function openStartWorkout(e) {
        let tgt = e.target.dataset;
        if (Object.entries(tgt).length > 0) {
            const { id } = tgt;
            const filtData = workoutsData.filter((data) => data.id === id);
            setStartWorkoutData(filtData[0]);
            let startW = document.querySelector(".start-workout-cont");
            startW.classList.remove("close")
        }
    }

    const filteredCompletedWorkouts = []

    function getCompletedWorkouts() {
        let result = FitDB.findColumnName("completedWorkouts");

        if (result.error === true) {
            return notif.error(result.message)
        }

        let data = result.data;

        if (data.length > 0) {
            let filt = data.filter((workouts) => {
                if (!filteredCompletedWorkouts.includes(workouts.id)) {
                    filteredCompletedWorkouts.push(workouts.id)
                }
            })
        }

    }
    getCompletedWorkouts()

    function getTargetedWorkoutsLessons(e) {
        let tgt = e.target.dataset;
        let practice = document.querySelector(".practice-cont");

        if (Object.entries(tgt).length > 0) {
            let { name } = tgt;
            let filtData = exerciseData.exercises.filter((data) => data.name === name);
            setTargetedWorkoutsLessons(filtData[0])
            practice.classList.remove("close")
        }
    }

    return (
        <div className="dashboard-cont">
            <div className="top-head">
                <div className="left">
                    <h5>Good Day 😉🔥</h5>
                    <p>{username.toUpperCase()}</p>
                    <br />
                    <div className="goal">
                        <BsCircleFill className="icon" />
                        <span>{userInfo?.goal}</span>
                    </div>
                </div>
                <div className="right">
                    <img src={`https://avatars.dicebear.com/api/micah/${username}.svg`} alt="" />
                </div>
            </div>
            <div className="routine-cont">
                <div className="routine-list">
                    <li key={tagName} className={tagName === "all" ? "active" : ""} data-tag={"all"} onClick={(e) => getWorkoutByTags(e)}>
                        All
                    </li>
                    {workoutTags.length === 0 ? "" : workoutTags.map((tag) => {
                        return (
                            <li key={tag} className={tagName === tag ? "active" : ""} data-tag={tag} onClick={(e) => getWorkoutByTags(e)}>{tag}</li>
                        )
                    })}
                </div>

                <div className="routine-body">
                    {/* {console.log(workoutsData)} */}
                    {
                        workoutsData.length === 0 ?
                            <p>You have no workouts.</p>
                            :
                            workoutsData.map((data) => {
                                return (
                                    <div className="routine-box" key={data.id}>
                                        <div className="img-cont" data-id={data.id} onClick={(e) => openStartWorkout(e)} style={{
                                            backgroundImage: `url(${data.wImage})`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center"
                                        }}></div>
                                        <div className="body" data-id={data.id} onClick={(e) => openStartWorkout(e)}>
                                            <div className="top">
                                                <p>{data.wName}</p>
                                                <span>{data.wMuscle}</span>
                                                {filteredCompletedWorkouts.includes(data.id) ?
                                                    <FaCheckCircle className='completed' /> : ""}
                                            </div>
                                            <div className="bottom mt-3">
                                                <span>{data.wKg} kg</span>
                                                <span>{data.wReps} reps</span>
                                                <span>{data.wSets} sets</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>

            <StartWorkout setWorkoutsData={setWorkoutsData} workoutData={startWorkoutData} />
            {wvisi && <WorkoutLists setWVisi={setWVisi} setWorkoutsData={setWorkoutsData} />}
            {mwvisi && <MoreWorkouts getTargetedWorkoutsLessons={getTargetedWorkoutsLessons} setWVisi={setWVisi} setMWVisi={setMWVisi} />}
            <PracticeWorkoutSection targetLesson={TargetedWorkoutsLessons} />
            {acvisi && <Achievements setAcVisi={setAcVisi} />}
            {proVisi && <Profile />}
            <BottomNavigation setWVisi={setWVisi} setHVisi={setHVisi} setAcVisi={setAcVisi} hvisi={hvisi} wvisi={wvisi} acvisi={acvisi} setMWVisi={setMWVisi} setProVisi={setProVisi} />
            <FloatingAdd setWVisi={setWVisi} />
        </div>
    )
}

export default Dashboard

function MoreWorkouts({ getTargetedWorkoutsLessons, setWVisi, setMWVisi }) {



    // function openPraciceSection() {
    //     let practice = document.querySelector(".practice-cont");
    //     practice.classList.remove("close")
    // }

    return (
        <div className="more-workouts">
            <div className="top-head">
                <div className="left">
                    <h3>More Workouts</h3>
                    <p>practice some workouts.</p>
                </div>
                <ion-icon name="arrow-front" class="icon" onClick={() => setMWVisi(false)}></ion-icon>
            </div>
            <div className="body">
                {
                    exerciseData.exercises.map((list, i) => {
                        return (
                            <div className="mw-box" key={i}>
                                <div className="img-cont" data-name={list.name} data-id={UUID()} style={{
                                    backgroundImage: `url(${randomImages()})`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }} onClick={(e) => {
                                    // openPraciceSection(e)
                                    getTargetedWorkoutsLessons(e)
                                }}></div>
                                <div className="body">
                                    <div className="top">
                                        <p>{list.name}</p>
                                        <span className={list.level}>
                                            {list.level}
                                        </span>
                                    </div>
                                    <div className="bottom mt-3">
                                        <span>equipment</span>
                                        <span className='equipment'>
                                            {list.equipment !== null ? list.equipment : "None"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="space"></div>
            </div>
        </div>
    )
}

function PracticeWorkoutSection({ targetLesson, setMWVisi }) {

    const [isSeen, setisSeen] = useState(false)
    const pracRef = useRef()
    const instructionRef = useRef();

    const validImageExt = ["png", "jpeg", "jpg", "giff"]

    const instructions = targetLesson?.instructions;

    function getMediaExt(path = "") {
        if (path === "") {
            return {
                error: true,
                ext: null,
                src: null
            }
        }

        let url = new URL(path)
        let { pathname } = url;
        let formated = pathname.replace("/", "").split(".");
        let ext = formated[formated.length - 1];

        return { error: false, ext, src: path }
    }

    function increaseHeight() {
        if (instructionRef.current !== null) {
            if (isSeen === false) {
                instructionRef.current.style.height = "60vh";
                setisSeen(true)
                return
            }
            instructionRef.current.style.height = "10vh";
            setisSeen(false)
        }
    }

    function close() {
        pracRef.current.classList.add("close")
    }

    let mediaExt = getMediaExt(targetLesson?.video)

    return (
        <div className="practice-cont close" ref={pracRef}>
            <div className="practice-section">
                <div className="top-head">

                    {
                        mediaExt.ext === null ?
                            <div className="image" style={{
                                backgroundImage: `url(${randomImages()})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}></div>
                            :
                            validImageExt.includes(mediaExt.ext) ?
                                <div className="image" style={{
                                    backgroundImage: `url(${mediaExt.src})`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}></div>
                                :
                                <video src={mediaExt.src} className="video" width="100%" height={"100%"} autoPlay loop>
                                    <source src={mediaExt.src} type="video/mp4" />
                                </video>
                    }

                    <ion-icon name="arrow-back" class="icon" onClick={() => close()}></ion-icon>
                </div>
                <div className="bottom">
                    <div className="head">
                        <div className="left bx">
                            <h3>{targetLesson?.name}</h3>
                            <p>{targetLesson?.equipment}</p>
                        </div>
                        <div className="right bx">
                            <span className="beginner">{targetLesson?.level}</span>

                        </div>
                    </div>
                    <div className="instructions" ref={instructionRef}>
                        <button className="more btn" onClick={() => increaseHeight()}></button>
                        <div className="body">
                            {
                                (instructions && instructions.length > 0 && isSeen === true) && instructions.map((list) => {
                                    return (
                                        <p key={list}>{list}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Achievements({ setAcVisi }) {

    const [completedWorkouts, setCompletedWorkouts] = useState([])
    const [g1, setG1] = useState(false)
    const [g2, setG2] = useState(false)
    const [g3, setG3] = useState(false)
    const [g4, setG4] = useState(false)
    const [cofettiHide, setCofettiHide] = useState(true)

    const { innerWith, innerHeight } = window;

    let goalOne = {
        workouts: 4
    };
    let goalThree = {
        workouts: 2,
        sets: 10
    };
    let goalFour = {
        workouts: 4,
        forearms: 2,
        fullbody: 2
    }

    useEffect(() => {
        // hide cofetti
        if (g1 || g2 || g3 || g4) {
            setTimeout(() => {
                setCofettiHide(false)
            }, 5000);
        }
    })


    const goals = [
        "Complete personal 4 workouts",
        "2 Biceps and 2 Chest Muscles Workout",
        "10 Sets with 2 WeightLifting muscles",
        "Complete 2 Forearms and FullBody muscles"
    ]

    useEffect(() => {
        let result = FitDB.findColumnName("completedWorkouts");

        if (result.error === true) {
            return notif.error(result.message)
        }
        let { data } = result;
        setCompletedWorkouts(data)

    }, [])

    useEffect(() => {
        checkIfWorkoutsMeetsGoals()
    })

    let goalOneStore = []
    let goalThreeStore = []

    function checkIfWorkoutsMeetsGoals() {
        if (completedWorkouts.length > 0) {
            completedWorkouts.map((data) => {
                if (!goalOneStore.includes(data.id)) {
                    goalOneStore.push(data.wName)
                }
            })

            if (goalOneStore.length >= goalOne.workouts) {
                setG1(true)
            }

            // algo for goal two
            let filtBiceps = completedWorkouts.filter((data) => data.wMuscle === "biceps")
            let filtChest = completedWorkouts.filter((data) => data.wMuscle === "chest")
            console.log(filtBiceps, filtChest);
            if (filtBiceps.length > 1 && filtChest.length > 1) {
                setG2(true)
            }

            // goal three algo
            // filtered workouts with weightlifting
            completedWorkouts.filter((data) => data.wMuscle === "weightlifting").map((data) => {
                if (parseInt(data.wSets) === 10 && data.wMuscle === "weightlifting") {
                    goalThreeStore.push(data.wMuscle)
                }
            })

            if (goalThreeStore.length === goalThree.workouts) {
                setG3(true)
            }
        }

    }



    return (
        <div className="achievements-cont">
            {
                (g1 || g2 || g3 || g4) &&
                cofettiHide && <Confetti
                    width={innerWith}
                    height={innerHeight}
                    numberOfPieces={400}
                    run={true}
                />
            }
            <div className="top-head">

                <div className="right">
                    <ion-icon name="arrow-back" class="icon" onClick={() => setAcVisi(false)}></ion-icon>
                </div>
                <div className="left">
                    <h4>Your Achievements</h4>
                    <p>workout achievements</p>
                </div>
            </div>
            <div className="body">
                <div className={g1 ? "bx complete" : "bx"}>
                    <div className="img-cont" style={{
                        backgroundImage: `url(${exercisesAcImages[5]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>

                    </div>

                    <div className="bx-body">
                        <p>{goals[0]}</p>

                        <br />

                        <span className={g1 ? "complete" : ""}>
                            Achieved Workout
                        </span>
                        <br />
                        <br />
                    </div>
                </div>
                <div className={g2 ? "bx complete" : "bx"}>
                    <div className="img-cont" style={{
                        backgroundImage: `url(${exercisesAcImages[4]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>

                    </div>

                    <div className="bx-body">
                        <p>{goals[1]}</p>

                        <br />

                        <span className={g1 ? "complete" : ""}>
                            Achieved Workout
                        </span>
                        <br />
                        <br />
                    </div>
                </div>
                <div className={g3 ? "bx complete" : "bx"}>
                    <div className="img-cont" style={{
                        backgroundImage: `url(${exercisesAcImages[2]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>

                    </div>

                    <div className="bx-body">
                        <p>{goals[2]}</p>

                        <br />

                        <span className={g1 ? "complete" : ""}>
                            Achieved Workout
                        </span>
                        <br />
                        <br />
                    </div>
                </div>
                <div className={g4 ? "bx complete" : "bx"}>
                    <div className="img-cont" style={{
                        backgroundImage: `url(${exercisesAcImages[4]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>

                    </div>

                    <div className="bx-body">
                        <p>{goals[3]}</p>

                        <br />

                        <span className={g1 ? "complete" : ""}>
                            Achieved Workout
                        </span>
                        <br />
                        <br />
                    </div>
                </div>
                <div className="bx">
                    <div className="img-cont" style={{
                        backgroundImage: `url(${exercisesAcImages[4]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>

                    </div>

                    <div className="bx-body">
                        <p>{goals[4]}</p>

                        <br />

                        <span className="complete">
                            Achieved Workout
                        </span>
                        <br />
                        <br />
                    </div>
                </div>
                <div className="bx">
                    <div className="img-cont" style={{
                        backgroundImage: `url(${exercisesAcImages[5]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>

                    </div>

                    <div className="bx-body">
                        <p>Complete personal 4 workouts</p>

                        <br />

                        <span className="complete">
                            Achieved Workout
                        </span>
                        <br />
                        <br />
                    </div>
                </div>
                <div className="space"></div>
            </div>
        </div>
    )
}


function StartWorkout({ setWVisi, setWorkoutsData, workoutData }) {

    const [isStart, setIsStartWorkout] = useState(false)
    // const [counter, setCounter] = useState(0);
    const [nextsetCount, setNextSetCount] = useState(0);
    const [start, setStart] = useState(false);
    const [isStop, setIsStop] = useState(false);
    const [currentTime, setCurrentTime] = useState("")
    const [hideTutor, setHideTutor] = useState(true);
    const startRef = useRef()
    const timerRef = useRef()

    // hide tutor if it has been seen
    useEffect(() => {
        let tutor = localStorage.getItem("workout-tutorial")

        if (tutor !== undefined || tutor !== null) {
            const { isSeen } = JSON.parse(tutor)
            if (isSeen === true) {
                setHideTutor(false)
            }
        }
    }, [])

    function startTimer() {
        // let date = new Date();
        // let min = date.getMinutes();
        // let sec = date.getSeconds();
        if (Object.entries(workoutData).length > 0) {
            const { wSets } = workoutData

            if (isStart === false && parseInt(wSets) === nextsetCount) {
                setNextSetCount(0);
                return setIsStartWorkout(true)
            }

            setIsStartWorkout(true)
        }
    }

    function stopTimer() {
        setIsStop(false)
    }

    function getTimer() {
        const { current } = timerRef;
        let time = current.innerHTML;
        setCurrentTime(time);
        return time;
    }

    function moveNextSet() {
        if (Object.entries(workoutData).length > 0) {
            const { wSets, wKg, id, wMuscle, wReps, wName } = workoutData
            if (nextsetCount === parseInt(wSets)) {
                setNextSetCount((prev) => (prev = parseInt(wSets)))
                setIsStartWorkout(false)
                setStart(false);

                const completedWorkout = {
                    id,
                    wName,
                    wSets,
                    wKg,
                    wReps,
                    wMuscle,
                    completed: true,
                }

                const result = FitDB.postData("completedWorkouts", completedWorkout)

                if (result.error === true) {
                    return notif.error(result.mesage)
                }
                const workData = FitDB.findColumnName("workouts")
                setWorkoutsData(workData.data)
                setNextSetCount(0)
                notif.success("Workout completed and saved");
                close()
                return;
            }
            setNextSetCount((prev) => (prev += 1))
        }
    }

    function close() {
        let { current } = startRef;
        current.classList.add("close")
        setIsStartWorkout(false)
    }

    function deleteData(e) {
        let tgt = e.target.dataset;

        if (Object.entries(tgt).length > 0) {
            let { id } = tgt;

            let res1 = FitDB.deleteById("workouts", id)

            if (res1.error === true) {
                return notif.error(res1.message)
            }
            let res2 = FitDB.deleteById("completedWorkouts", id)
            if (res2.error === true) {
                return notif.error(res2.message)
            }
            notif.success("workout deleted")
            return close()
        }
    }

    return (
        <div className="start-workout-cont close" ref={startRef}>
            <div className="top-head">
                <ion-icon name="arrow-back" class="icon" onClick={() => close()}></ion-icon>
                <h4>{workoutData?.wName} </h4>
                <button className="btn start" disabled={isStart} onClick={() => {
                    startTimer()
                }}>
                    Start
                </button>
            </div>
            <div className="img-cont" style={{
                backgroundImage: `url(${workoutData?.wImage || randomImages()})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}></div>
            <div className="body">
                <div className="top">
                    <p>Exercise <button className="btn btn-danger" data-id={workoutData?.id} onClick={(e) => deleteData(e)}>delete</button> </p>
                    <h4 ref={timerRef}>0</h4>
                </div>
                <div className="middle">
                    <div className="bx">
                        <FaWeightHanging className='icon' />
                        <div className="right">
                            <h5>{workoutData?.wKg}kg</h5>
                            <small>weight</small>
                        </div>
                    </div>
                    <div className="bx">
                        <IoMdClose className='icon' />
                        <div className="right">
                            <h5>{workoutData?.wReps}</h5>
                            <small>reps</small>
                        </div>
                    </div>
                    <div className="bx">
                        <IoMdRefresh className='icon' />
                        <div className="right">
                            <h5>{workoutData?.wSets}</h5>
                            <small>sets</small>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="muscle-group">
                        <p>Muscle Groups</p>
                        <div className="bx">
                            <span className="group">{workoutData?.wMuscle}</span>
                        </div>
                    </div>
                    <br />
                    <div className="sets-completed">
                        <p>Completed Sets</p>
                        <div className={"completed"}>{nextsetCount}</div>
                    </div>
                    <br />
                    {Object.entries(workoutData).length > 0 && <button className={parseInt(workoutData.wSets) === nextsetCount ? "btn finished" : "btn continue"} onClick={() => {
                        moveNextSet()
                    }} disabled={isStart === false ? true : false}>
                        {
                            parseInt(workoutData.wSets) === nextsetCount ?
                                "Finished"
                                :
                                "Next Set"
                        }
                    </button>}
                    <br />
                    <br />
                    <br />
                </div>
            </div>
            {hideTutor && <StartTutorial setHideTutor={setHideTutor} />}
        </div>
    )
}

function StartTutorial({ setHideTutor }) {

    const [seen, setSeen] = useState(false)
    // const [stageName, setStageName] = useState("step1");
    const [stepCounter, setStepCounter] = useState(1)

    if (localStorage.getItem("workout-tutorial") === null) {
        localStorage.setItem("workout-tutorial", JSON.stringify({ isSeen: false }))
    }

    let wData = JSON.parse(localStorage.getItem("workout-tutorial"));

    useEffect(() => {
        if (wData !== undefined || wData !== null) {
            let { isSeen } = wData;
            setSeen(isSeen)
        }
    }, [])

    function handleStageName(e) {
        setStepCounter((prev) => prev += 1)
        if (stepCounter === 3) {
            let isSeen = true;
            localStorage.setItem("workout-tutorial", JSON.stringify({ isSeen }))
            setHideTutor(false);
        }
    }

    let stepsElem;

    if (stepCounter === 1) {
        stepsElem = <Step1 handleStageName={handleStageName} />
    }
    else if (stepCounter == 2) {
        stepsElem = <Step2 handleStageName={handleStageName} />
    }
    else if (stepCounter == 3) {
        stepsElem = <Step3 handleStageName={handleStageName} />
    }

    return (
        <div className="start-tutor">
            {/* steps */}
            {stepsElem}
        </div>
    )
}

function Step1({ handleStageName }) {
    return (
        <div className="step-1 bx" data-name="step1">
            <p>Click on start to begin the session</p>
            <button className="btn next-btn" onClick={handleStageName}>
                Next
            </button>
        </div>
    )
}

function Step2({ handleStageName }) {
    return (
        <div className="step-2 bx" data-name="step2">
            <p>Delete workout by clicking delete button</p>
            <button className="btn next-btn" onClick={handleStageName}>
                Next
            </button>
        </div>
    )
}

function Step3({ handleStageName }) {
    return (
        <div className="step-3 bx" data-name="step3">
            <p>Click this button and move to next set of the workout till each sets are completed</p>
            <button className="btn next-btn" onClick={handleStageName}>
                Continue Workout
            </button>
        </div>
    )
}



// Workout List

function WorkoutLists({ setWVisi, setWorkoutsData }) {

    const [image, setImage] = useState("")
    const [color, setColor] = useState("")
    const [formData, setFormData] = useState({
        wName: "",
        wTag: "",
        wMuscle: "",
        wImage: "",
        wSets: "",
        wReps: "",
        wKg: ""
    })

    const fileRef = useRef()


    const muscles = [
        "yoga",
        "weightlifting",
        "triceps",
        "shoulders",
        "neck",
        "legs",
        "full body",
        "forearms",
        "core",
        "chest",
        "cardio",
        "biceps",
        "back"
    ]


    // handle image
    function handleImage(e) {
        const { current } = fileRef;
        current.click();
        let file = current.files
        const validTypes = ["png", "jpeg", "jpg", "giff"]
        if (file.length === 0) return false;

        const fileData = file[0]
        let { type } = fileData
        const ext = type.split("/")[1]

        if (!validTypes.includes(ext)) {
            return notif.error("Invalid image of type: " + ext);
        }
        let reader = new FileReader();
        reader.readAsDataURL(fileData);

        reader.onload = function () {
            setImage(reader.result);
        };
    }


    let fData = {}
    function handleFormData(e) {
        let { value, name } = e.target;
        fData[name] = value
        setFormData((prev) => ({ ...prev, ...fData }))
    }

    function AddWorkout() {
        formData["id"] = UUID();
        formData["wImage"] = image === "" ? randomImages() : image;

        const { wName, wTag, wMuscle, wSets, wReps, wKg } = formData;

        if (wName === "") {
            return notif.error("workout name cant be empty")
        }
        if (wTag === "") {
            return notif.error("workout tag cant be empty")
        }
        if (wMuscle === "") {
            return notif.error("workout muscle cant be empty")
        }
        if (wSets === "") {
            return notif.error("workout sets cant be empty")
        }
        if (wReps === "") {
            return notif.error("workout reps cant be empty")
        }
        if (wKg === "") {
            return notif.error("workout weight cant be empty")
        }

        // validate sets reps kg
        if (parseInt(wSets) < 0) {
            return notif.error("workout sets cant be less than 0")
        }
        if (parseInt(wReps) < 0) {
            return notif.error("workout reps cant be less than 0")
        }
        if (parseInt(wKg) < 0) {
            return notif.error("workout weight cant be less than 0")
        }


        const result = FitDB.postData("workouts", formData)
        const workData = FitDB.findColumnName("workouts")

        if (result.error === true) {
            return notif.error(result.message)
        }
        setWorkoutsData([...workData.data]);
        setWVisi(false)
        return notif.success("Workout added")
    }

    return (
        <div className="workout-list">
            <div className="top-head">
                <div className="left">
                    <ion-icon name="arrow-back" class="icon" onClick={() => setWVisi(false)}></ion-icon>
                    <p>Add Workout</p>
                </div>
                <div className="right">
                    <button className="btn addWorkout" onClick={() => AddWorkout()}>Add Workout</button>
                </div>
            </div>
            <div className="body">
                <div className="d-flex p-0 m-0" style={{ width: "100%" }}>
                    <div className="bx mr-5" style={{ width: "100%" }}>
                        <label htmlFor="">Name</label>
                        <input type="text" name="wName" onChange={(e) => handleFormData(e)} className="inp" />
                    </div>
                    <div className="bx" style={{ width: "100%" }}>
                        <label htmlFor="">Tag Name</label>
                        <input type="text" name="wTag" onChange={(e) => handleFormData(e)} className="inp" />
                    </div>
                </div>
                <div className="bx">
                    <label htmlFor="">Muscle</label>
                    <select name="wMuscle" name="wMuscle" onChange={(e) => handleFormData(e)} id="" className="inp">
                        <option value=""></option>
                        {
                            muscles.map((list, i) => {
                                return (
                                    <option value={list} key={i}>{list.toLocaleUpperCase()}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="bx">
                    <label htmlFor="">Photo</label>
                    <button className="btn upload" onClick={(e) => handleImage(e)}>upload</button>
                    <input type="file" ref={fileRef} onChange={() => handleImage()} hidden className="inp" />
                </div>
                <div className="bx">
                    <label htmlFor="">Sets weight field</label>
                    <div className="inp-cont">
                        <div className="bx">
                            <input type="number" name="wSets" placeholder={"3"} onChange={(e) => handleFormData(e)} id="" />
                            <label htmlFor="">Sets</label>
                        </div>
                        <div className="bx">
                            <input type="number" name="wReps" onChange={(e) => handleFormData(e)} placeholder={"3"} id="" />
                            <label htmlFor="">Reps</label>
                        </div>
                        <div className="bx">
                            <input type="number" name="wKg" onChange={(e) => handleFormData(e)} placeholder={"3"} id="" />
                            <label htmlFor="">Kg</label>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
    )
}

function Profile() {

    let profileData = JSON.parse(localStorage.getItem("proact-fitness"));

    const { userInfo } = profileData;

    function logout() {
        localStorage.clear();
        window.location = "/"
    }

    return (
        <div className="profile-cont">
            <div className="box">
                <img src={avatar} alt="" />
                <br />
                <h4>{userInfo.name.toUpperCase()}</h4>
                <p>{userInfo.goal}</p>
                <br />
                <button className="btn logout" onClick={() => logout()}>Logout</button>
            </div>
        </div>
    )
}

function FloatingAdd({ setWVisi }) {

    return (
        <div className="floating-addbtn">
            <ion-icon name="add" class="icon" onClick={() => setWVisi(true)}></ion-icon>
        </div>
    )
}

function BottomNavigation({ setWVisi, setHVisi, setAcVisi, setMWVisi, setProVisi }) {

    const [bNavName, setBNavname] = useState("home")

    function handleToggle(e) {
        let tgt = e.target.dataset;

        if (Object.entries(tgt).length > 0) {
            const { nav } = tgt;

            switch (nav) {
                case "home":
                    setWVisi(false)
                    setMWVisi(false);
                    setAcVisi(false)
                    setProVisi(false)
                    break;

                case "workout":
                    setMWVisi(true);
                    setAcVisi(false)
                    setProVisi(false)
                    break;

                case "achievement":
                    setAcVisi(true)
                    setMWVisi(false);
                    setProVisi(false)
                    break;

                case "profile":
                    setProVisi(true)
                    setMWVisi(false);
                    setAcVisi(false)
                    break;

                default:
                    setMWVisi(false);
                    setAcVisi(false)
                    setProVisi(false)
                    break;
            }
            setBNavname(nav)
            return
        }
    }

    return (
        <div className="bottom-nav">
            <li data-nav="home" onClick={(e) => {
                setHVisi(true)
                handleToggle(e)
            }}>
                <AiFillHome data-nav="home" className={bNavName === "home" ? 'icon active' : "icon"} onClick={(e) => {
                    setHVisi(true)
                    handleToggle(e)
                }} />
                <small>Home</small>
            </li>
            <li data-nav="workout" onClick={(e) => {
                setMWVisi(true)
                handleToggle(e)
            }}>
                <IoBarbellSharp data-nav="workout" className={bNavName === "workout" ? 'icon active' : "icon"} onClick={(e) => {
                    setMWVisi(true)
                    handleToggle(e)
                }} />
                <small>Workout</small>
            </li>
            <li data-nav="achievement" onClick={(e) => {
                setAcVisi(true)
                handleToggle(e)
            }}>
                <AiTwotoneTrophy data-nav="achievement" className={bNavName === "achievement" ? 'icon active' : "icon"} onClick={(e) => {
                    setAcVisi(true)
                    handleToggle(e)
                }} />
                <small>Achivements</small>
            </li>
            <li data-nav="profile" onClick={(e) => {
                setWVisi(true)
                handleToggle(e)
            }}>
                <AiOutlineUser data-nav="profile" className={bNavName === "profile" ? 'icon active' : "icon"} onClick={(e) => {
                    setProVisi(true)
                    handleToggle(e)
                }} />
                <small>Profile</small>
            </li>
        </div>
    )
}
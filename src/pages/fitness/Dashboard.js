import React, { useState, useEffect, useRef, useContext } from 'react'
import DataContext from '../../context/DataContext'
import { FitnessDB, FitDB } from '../../db/DB'
import workoutimg from "../../assets/img/workout.png"
import { AiTwotoneTrophy, AiFillHome, AiOutlineUser } from "react-icons/ai"
import { FaWeightHanging } from "react-icons/fa"
import { IoBarbellSharp } from "react-icons/io5"
import { IoMdClose, IoMdRefresh } from "react-icons/io"
import { BsCircleFill } from "react-icons/bs"
import Notification from "../../helpers/notyf";
import exerciseData from "./exercises.json"
import "./dashboard.css"

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
    const [hvisi, setHVisi] = useState(true);
    const [wvisi, setWVisi] = useState(false);
    const [acvisi, setAcVisi] = useState(false);
    const [mwvisi, setMWVisi] = useState(false);


    let fitnessData = localStorage.getItem("proact-fitness");
    let { userInfo } = JSON.parse(fitnessData)

    useEffect(() => {
        setUserName(userInfo.name);
    }, [])

    function openStartWorkout() {
        let startW = document.querySelector(".start-workout-cont");
        startW.classList.remove("close")
    }

    function viewNavComponents() {

    }

    return (
        <div className="dashboard-cont">
            <div className="top-head">
                <div className="left">
                    <h5>Good Morning</h5>
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
                    <li className='active'>Push Up</li>
                    <li>Barbell</li>
                </div>

                <div className="routine-body">
                    <div className="routine-box" onClick={() => openStartWorkout()}>
                        <div className="img-cont" style={{
                            backgroundImage: `url(${workoutimg})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                        <div className="body">
                            <div className="top">
                                <p>Alternative Stuff</p>
                                <span>Biceps</span>
                            </div>
                            <div className="bottom mt-3">
                                <span>14kg</span>
                                <span>10reps</span>
                                <span>4sets</span>
                            </div>
                        </div>
                    </div>
                    <div className="routine-box" onClick={() => openStartWorkout()}>
                        <div className="img-cont" style={{
                            backgroundImage: `url(${randomImages()})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}></div>
                        <div className="body">
                            <div className="top">
                                <p>Alternative Stuff</p>
                                <span>Biceps</span>
                            </div>
                            <div className="bottom mt-3">
                                <span>14kg</span>
                                <span>10reps</span>
                                <span>4sets</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StartWorkout />
            {wvisi && <WorkoutLists setWVisi={setWVisi} />}
            {mwvisi && <MoreWorkouts setWVisi={setWVisi} setMWVisi={setMWVisi} />}
            <PracticeWorkoutSection />
            {acvisi && <Achievements setAcVisi={setAcVisi} />}
            <BottomNavigation setWVisi={setWVisi} setHVisi={setHVisi} setAcVisi={setAcVisi} hvisi={hvisi} wvisi={wvisi} acvisi={acvisi} setMWVisi={setMWVisi} />
            <FloatingAdd setWVisi={setWVisi} />
        </div>
    )
}

export default Dashboard

function MoreWorkouts({ setWVisi, setMWVisi }) {



    function openPraciceSection() {
        let practice = document.querySelector(".practice-cont");
        practice.classList.remove("close")
    }

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
                            <div className="mw-box" data-id={UUID()} key={i} onClick={(e) => openPraciceSection(e)}>
                                <div className="img-cont" style={{
                                    backgroundImage: `url(${randomImages()})`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
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

function PracticeWorkoutSection({ setMWVisi }) {

    const [startPractice, setStartPractice] = useState(false);
    const [complete, setComplete] = useState(false)

    const pracRef = useRef()

    function close() {
        pracRef.current.classList.add("close")
    }

    return (
        <div className="practice-cont close" ref={pracRef}>
            <div className="practice-section">
                <div className="top-head">
                    <ion-icon name="arrow-front" class="icon" onClick={() => close()}></ion-icon>
                </div>
                <div className="bottom">
                    <div className="head">
                        <div className="left bx">
                            <h3>Title</h3>
                            <p>kettlebells</p>
                        </div>
                        <div className="right bx">
                            <span className="beginner">intermediate</span>
                            <button className={complete ? "btn complete" : "btn"}>
                                {complete ? "Finish Session" : "Begin Session"}
                            </button>
                        </div>
                    </div>
                    <div className="instructions">
                        {
                            startPractice
                            &&
                            <>
                                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, rem?</h5>

                                <div className="pro-bar">
                                    <div className="p-bar"></div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function Achievements({ setAcVisi }) {

    return (
        <div className="achievements-cont">
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
                {
                    [1, 2, 3, 43, 45].map((list) => {
                        return (
                            <div className="bx" key={list}>
                                <div className="img-cont" style={{
                                    backgroundImage: `url(${randomAcImages()})`,
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
                        )
                    })
                }
                <div className="space"></div>
            </div>
        </div>
    )
}

function StartWorkout({ setWVisi }) {

    const startRef = useRef()

    function close() {
        let { current } = startRef;
        current.classList.add("close")
    }

    return (
        <div className="start-workout-cont close" ref={startRef}>
            <div className="top-head">
                <ion-icon name="arrow-back" class="icon" onClick={() => close()}></ion-icon>
                <h4>Front Squart</h4>
            </div>
            <div className="img-cont" style={{
                backgroundImage: `url(${randomImages()})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}></div>
            <div className="body">
                <div className="top">
                    <p>Exercise</p>
                </div>
                <div className="middle">
                    <div className="bx">
                        <FaWeightHanging className='icon' />
                        <div className="right">
                            <h5>60kg</h5>
                            <small>weight</small>
                        </div>
                    </div>
                    <div className="bx">
                        <IoMdClose className='icon' />
                        <div className="right">
                            <h5>10</h5>
                            <small>reps</small>
                        </div>
                    </div>
                    <div className="bx">
                        <IoMdRefresh className='icon' />
                        <div className="right">
                            <h5>4</h5>
                            <small>sets</small>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="muscle-group">
                        <p>Muscle Groups</p>
                        <div className="bx">
                            <span className="group">Biceps</span>
                            <span className="group">Biceps</span>
                        </div>
                    </div>
                    <br />
                    <div className="sets-completed">
                        <div className="completed">1</div>
                        <div className="completed">2</div>
                        <div className="completed">3</div>
                    </div>
                    <br />
                    <br />
                    <button className="btn continue">Finished Workout</button>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    )
}

function WorkoutLists({ setWVisi }) {

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
    const colorRef = useRef()


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

    function handleColor() {
        const { current } = colorRef;
        current.click();

        if (current.value === "#000000") {
            current.value = "#10e697"
        }
        return setColor(current.value)
    }

    let fData = {}
    function handleFormData(e) {
        let { value, name } = e.target;
        fData[name] = value
        setFormData((prev) => ({ ...prev, ...fData }))
    }

    function AddWorkout() {
        formData["wImage"] = image;
        formData["wColor"] = color;

        const { wImage, wColor, wName, wTag, wMuscle, wSets, wReps, wKg } = formData;

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

        return console.log(formData);
        const payload = {

        }

        const result = FitDB.postData("workouts", payload)

        if (result.error === true) {
            return notif.error(result.message)
        }
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
                            <input type="number" name="wSets" onChange={(e) => handleFormData(e)} id="" />
                            <label htmlFor="">Sets</label>
                        </div>
                        <div className="bx">
                            <input type="number" name="wReps" onChange={(e) => handleFormData(e)} id="" />
                            <label htmlFor="">Reps</label>
                        </div>
                        <div className="bx">
                            <input type="number" name="wKg" onChange={(e) => handleFormData(e)} id="" />
                            <label htmlFor="">Kg</label>
                        </div>
                    </div>
                </div>
                <div className="bx color-cont">
                    <button className="btn color" onClick={() => handleColor()}>Choose Color</button>
                    <input type="color" ref={colorRef} onChange={() => handleColor()} hidden className="inp" />

                    <div className="color-cont" style={{
                        background: color,
                        borderRadius: "10px"
                    }} ></div>
                </div>
                <br />
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

function BottomNavigation({ setWVisi, setHVisi, setAcVisi, setMWVisi, hvisi, wvisi, acvisi }) {

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
                    break;

                case "workout":
                    setMWVisi(true);
                    setAcVisi(false)
                    break;

                case "achievement":
                    setMWVisi(false);
                    setAcVisi(true)
                    break;

                default:
                    setMWVisi(false);
                    setAcVisi(false)
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
                    setWVisi(true)
                    handleToggle(e)
                }} />
                <small>Profile</small>
            </li>
        </div>
    )
}
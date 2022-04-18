import React, { useState, useEffect, useRef, useContext } from 'react'
import { FaArrowRight } from "react-icons/fa"
import { HiChatAlt } from "react-icons/hi"
import { IoBarbellSharp, IoWaterSharp } from "react-icons/io5"
import { GiBiceps, GiFemale, GiMale } from "react-icons/gi"
import Notification from "../../helpers/notyf"
import { FitnessDB } from '../../db/DB'
import avatar from "../../assets/img/avatar.png"
import ScrollToBottom from "react-scroll-to-bottom";

const notif = new Notification()

const botQuestions = [
    {
        next: 1,
        quest: "Hi, am fitboy. your personal onboarding bot."
    },
    {
        next: 2,
        quest: "Please, before we begin, can i know your name?.",
    },
    {
        next: 3,
        quest: "Nice to meet you {}",
    },
    {
        next: 4,
        quest: "What your goal, {} ?",
    },
    {
        next: 5,
        quest: "My goal is to {}",
    },
    {
        next: 7,
        quest: "Thanks for your compilience.",
    },
    {
        next: 8,
        quest: "What your weight, {} ?",
    },
    {
        next: 9,
        quest: "My weight is {} kg ?",
    },
    {
        next: 10,
        quest: "Excuse me {}, considering your name, you're most likely to be a man 😉, but i need to know for sure. what your gender ?",
    },
    {
        next: 11,
        quest: "My gender is {}.",
    },
    {
        next: 12,
        quest: "Thanks {} , you've proving to be a good partner. you may now continue your journey from here."
    }
]

async function sleep(sec = 1) {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, sec * 1000);
    })
}

const FitDB = new FitnessDB()


function OnBoarding({ setOnboardingVisi }) {

    const [botinit, setBotInit] = useState(0)
    const [info, setInfo] = useState(false)
    const [goalvisi, setGoalVisi] = useState(false)
    const [weightvisi, setWeightVisi] = useState(false);
    const [gendervisi, setGenderVisi] = useState(false);
    const [lastquest, setLastQuest] = useState(null)
    const [weight, setWeight] = useState("")
    const [goal, setGoal] = useState("")
    const [gender, setGender] = useState("");
    const [username, setUsername] = useState("")

    let counter = 0;

    useEffect(() => {
        (async () => {
            await sleep(2)
            counter = 1
            setBotInit(1)
            await sleep(2)
            counter = 2
            setInfo(true)
        })()
    }, [])


    useEffect(() => {
        if (username !== "") {
            setGoalVisi(true)
        }
    }, [username])

    useEffect(() => {
        if (goal !== "") {
            setWeightVisi(true)
        }
    }, [goal])

    useEffect(() => {
        if (weight !== "") {
            setGenderVisi(true)
        }
    }, [weight])

    function saveUserInfo() {
        const userinfo = {
            name: username,
            goal,
            weight,
            gender,
        }

        const result = FitDB.saveUserInfo(userinfo);

        if (result.error === true) {
            notif.error(result.message)
        }

        notif.success("Data saved successfully");
        return setOnboardingVisi(false)
    }

    return (
        <div className="onboarding-cont">
            <div className="top-head">
                <HiChatAlt className='icon' />
                <p>Onboarding</p>
            </div>
            <div className="chat-main">
                <ScrollToBottom className="chat-body">
                    {
                        botinit === 1 &&
                        <>
                            <BotReplies chat={botQuestions[0].quest} next={botQuestions[0].next} />
                            <BotReplies chat={botQuestions[1].quest} next={botQuestions[1].next} />
                        </>
                    }
                    {username !== "" && <UsersReplies data={username} chat={botQuestions[2].quest} next={botQuestions[2].next} />}

                    {goalvisi && <BotReplies chat={botQuestions[3].quest} next={botQuestions[3].next} data={username} />}

                    {goalvisi && <Goal setGoal={setGoal} />}

                    {goal !== "" && <UsersReplies data={goal} chat={botQuestions[4].quest} next={botQuestions[4].next} />}

                    {goal !== "" && <BotReplies chat={botQuestions[6].quest} next={botQuestions[6].next} data={username} />}

                    {weightvisi && <Weight setWeight={setWeight} />}

                    {weight !== "" && <UsersReplies data={weight} chat={botQuestions[7].quest} next={botQuestions[7].next} />}

                    {weight !== "" && <BotReplies chat={botQuestions[8].quest} next={botQuestions[8].next} data={username} />}

                    {gendervisi && <Gender setGender={setGender} setLastQuest={setLastQuest} />}

                    {gender !== "" && <UsersReplies data={gender} chat={botQuestions[9].quest} next={botQuestions[9].next} />}

                    {(gender !== "" && lastquest === true) && <BotReplies chat={botQuestions[10].quest} next={botQuestions[10].next} data={username} />}
                </ScrollToBottom>
                <br />
                <div className="bottom-cont">
                    <button className="btn btn-block continue-btn" disabled={lastquest === null ? true : false} onClick={() => saveUserInfo()}>
                        Continue  <FaArrowRight className='icon' />
                    </button>
                </div>
            </div>
            {info && <UserInfo setUsername={setUsername} setInfo={setInfo} />}
        </div>
    )
}

export default OnBoarding

function BotReplies({ chat, next, data }) {
    return (
        <div className="bot-cont">
            <span className="bot-chat">
                {
                    next === 4 ?
                        chat.replace("{}", data)
                        :
                        next === 8 ?
                            chat.replace("{}", data)
                            :
                            next === 10 ?
                                chat.replace("{}", data)
                                :
                                next === 12 ?
                                    chat.replace("{}", data)
                                    :
                                    chat

                }
            </span>
        </div>
    )
}

function UsersReplies({ chat, next, data }) {
    return (
        <div className="user-cont">
            <span className="user-chat">
                {
                    next === 3 ?
                        chat.replace("{}", data)
                        :
                        next === 5 ?
                            chat.replace("{}", data)
                            :
                            next === 9 ?
                                chat.replace("{}", data)
                                :
                                next === 11 ?
                                    chat.replace("{}", data)
                                    :
                                    chat
                }
            </span>
        </div>
    )
}

function UserInfo({ setUsername, setInfo }) {

    const [name, setName] = useState("")
    let infoRef = useRef()
    let infoBoxRef = useRef()

    useEffect(() => {
        (async () => {
            await showUserInfo()
        })()
    }, [])

    async function showUserInfo() {
        infoRef.current.style.display = "flex"
        await sleep(1)
        infoBoxRef.current.classList.add("active")
    }

    async function closeInfo() {
        if (name === "") {
            return notif.error("username cant be empty")
        }
        infoBoxRef.current.classList.remove("active")
        await sleep(1)
        infoRef.current.style.display = "none"
        await sleep(1)
        setUsername(name)
        setInfo(false)
    }

    return (
        <div className="user-info" ref={infoRef}>
            <div className="main info-box" ref={infoBoxRef}>
                <img src={avatar} className="img" />
                <br />
                <input type="text" placeholder='username' maxLength={20} className="inp" onChange={(e) => setName(e.target.value)} />
                <br />
                <button className="btn btn-block" onClick={async () => {
                    await closeInfo()
                }}>Continue</button>
            </div>
        </div>
    )
}

function Weight({ setWeight }) {

    const [userweight, setUserWeight] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setWeight(userweight)
        }, 1000);
    }, [userweight])

    function handleWeight(e) {
        setUserWeight(e.target.value)
    }

    return (
        <div className="weight-cont">
            <div className="w-head">
                <p>My Weight is</p>
            </div>
            <div className="body">
                <input type="number" onChange={(e) => handleWeight(e)}
                    placeholder={"10"} className="inp" />
                <span className='msm'>KG</span>
            </div>
        </div>
    )
}

function Goal({ setGoal }) {

    const [usergoal, setUserGoal] = useState("");

    async function updateGoal(e) {
        let { goal } = e.target.dataset;
        setUserGoal(goal)
        await sleep(1)
        setGoal(goal)
    }

    return (
        <div className="goal-cont">
            <div className="g-head">
                <p>My Goal is</p>
            </div>
            <div className="body">
                <div className={usergoal === "build muscle" ? "bx active" : "bx"} data-goal="build muscle" onClick={async (e) => await updateGoal(e)}>
                    <GiBiceps className="icon" />
                    <small>Build Muscle</small>
                </div>
                <div className={usergoal === "loose fat" ? "bx active" : "bx"} data-goal="loose fat" onClick={async (e) => await updateGoal(e)}>
                    <IoWaterSharp className='icon' />
                    <small>Loose Fat</small>
                </div>
                <div className={usergoal === "get stronger" ? "bx active" : "bx"} data-goal="get stronger" onClick={async (e) => await updateGoal(e)}>
                    <IoBarbellSharp className='icon' />
                    <small>Get Stronger</small>
                </div>
            </div>
        </div>
    )
}

function Gender({ setGender, setLastQuest }) {

    const [usergender, setUserGender] = useState("")

    async function updateGender(e) {
        let { gender } = e.target.dataset;
        setUserGender(gender)
        await sleep(1)
        setGender(gender)
        await sleep(2)
        setLastQuest(true)
    }

    return (
        <div className="gender-cont">
            <div className="g-head">
                <p>My Gender is</p>
            </div>
            <div className="body">
                <div className={usergender === "male" ? "bx active" : "bx"} data-gender="male" onClick={async (e) => await updateGender(e)}>
                    <GiMale className="icon" />
                    <small>Male</small>
                </div>
                <div className={usergender === "female" ? "bx active" : "bx"} data-gender="female" onClick={async (e) => await updateGender(e)}>
                    <GiFemale className='icon' />
                    <small>Female</small>
                </div>
            </div>
        </div>
    )
}
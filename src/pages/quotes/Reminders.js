import React, { useState, useEffect } from 'react'
import quotesTags from "../../data/tags.json"
import "./CFR.css"
import { requestForToken } from "../../firebase/firebase"
import Notification from '../../helpers/notyf'
import { validateEmail } from '../../helpers/util'
import { RemindersDB } from '../../db/DB'
import { UUID } from '../../helpers/util'
import moment from 'moment'
import { sendMail } from '../../helpers/mail'

const notif = new Notification(3000)

// requestForToken()

// inittialized DB
const RDB = new RemindersDB()

export function Reminders({ rvis }) {
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [category, setCategory] = useState("")
    const [mail, setMail] = useState("test@mail.com")
    const [loading, setLoading] = useState(false)
    const [quoteinterval, setQuoteInterval] = useState("")

    // for firebase push notifications
    // const [isTokenFound, setTokenFound] = useState(null);

    async function saveReminders() {
        // validate inputs
        if (startTime === "") {
            return notif.error("start time cant be empty")
        }
        if (endTime === "") {
            return notif.error("end time cant be empty")
        }
        if (category === "") {
            return notif.error("category cant be empty")
        }
        if (mail === "") {
            return notif.error("mail address cant be empty")
        }
        if (quoteinterval === "") {
            return notif.error("quote interval cant be empty")
        }
        // validate email
        if (validateEmail(mail) === false) {
            return notif.error("mail address is invalid")
        }
        const date = new Date()
        const currYear = new Date().getFullYear()
        const currMonth = new Date().getMonth();
        const currDay = new Date().getDate()
        const startYear = new Date(startTime).getFullYear();
        const startMonth = new Date(startTime).getMonth() + 1;
        const endYear = new Date(endTime).getFullYear();
        const endMonth = new Date(endTime).getMonth() + 1;
        const startDay = new Date(startTime).getDate() + 1
        const endDay = new Date(endTime).getDate() + 1;

        if (startMonth > endMonth) {
            return notif.error("start month cant be greater than end month")
        }
        if (startDay < currDay) {
            return notif.error("start date cant be less than current date")
        }
        // calculate day if they have same month
        if (startMonth === endMonth) {
            // check day
            if (startDay > endDay) {
                return notif.error(`start Day ${startDay} cant be greater than end Day ${endDay}`)
            }

            if (startDay === endDay) {
                return notif.error(`cant have the same day in same month : ${startDay},  ${endDay}`)
            }
        }

        if (endMonth < startMonth) {
            return notif.error("end month cant be less than start month")
        }

        if (startYear < currYear) {
            return notif.error(`start year ${startYear} cant be less than current year ${currYear}`)
        }

        if (startYear < currYear) {
            return notif.error(`start year ${startYear} cant be less than current year ${currYear}`)
        }

        if (endYear < currYear) {
            return notif.error(`end year ${endYear} cant be less than current year ${currYear}`)
        }

        let dataToAdd = {
            _id: UUID(5),
            start: startTime,
            end: endTime,
            mail,
            tag: category,
            interval: quoteinterval
        }

        setLoading(true)

        let result = RDB.postData(dataToAdd);

        setTimeout(() => {
            setLoading(false)
            if (result) {
                if (result.error === true) {
                    return notif.error(result.message)
                }
                return notif.success(result.message)
            }
        }, 2000);
    }

    return (
        <div className="reminders-cont">
            <div className="top-head">
                <ion-icon name="arrow-back" onClick={() => rvis(false)} class="icon"></ion-icon>
                <p>Daily Reminders</p>
            </div>
            <div className="reminder-body">
                <p>Set how many quotes reminders you would like to get everyday</p>
                <div className="time-cont">
                    <div className="bx">
                        <label htmlFor="">Start At</label>
                        <input type="date" defaultValue={startTime} name="" id="" onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className="bx">
                        <label htmlFor="">End At</label>
                        <input type="date" defaultValue={endTime} name="" id="" onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                </div>
                <div className="quote-type">
                    <label htmlFor="">Type of Quote</label>
                    <select name="" id="" className="input" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">-------------</option>
                        {
                            quotesTags === undefined ?
                                <option value="">Not Found</option>
                                :
                                quotesTags && quotesTags.length === 0 ?
                                    <option value="">Not Available</option>
                                    :
                                    quotesTags.map((quotes) => {
                                        return (
                                            <option key={quotes._id} value={quotes.name}>{quotes.name}</option>
                                        )
                                    })
                        }
                    </select>
                    <br />
                    <label htmlFor="">How many times a Day</label>
                    <select name="" id="" className="input" onChange={(e) => setQuoteInterval(e.target.value)}>
                        <option value="">-------------</option>
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                        <option value="3">3x</option>
                        <option value="4">4x</option>
                        <option value="5">5x</option>
                        <option value="6">6x</option>
                        <option value="7">7x</option>
                        <option value="8">8x</option>
                        <option value="9">9x</option>
                        <option value="10">10x</option>
                        <option value="20">20x</option>
                        <option value="30">30x</option>
                        <option value="40">40x</option>
                        <option value="50">50x</option>
                        <option value="60">60x</option>
                        <option value="70">70x</option>
                        <option value="80">80x</option>
                    </select>
                </div>
                <div className="mail-cont">
                    <div className='label'>
                        <small>recieve motivational quotes in your inbox</small>
                    </div>
                    <input type="email" defaultValue={mail} placeholder='address@gmail.com' className='inp' onChange={(e) => setMail(e.target.value)} />
                </div>
                <br />
                <button className="btn save-quote" onClick={() => saveReminders()}>
                    {loading ? "Saving..." : "Set Reminder"}
                </button>
            </div>
        </div>
    )
}

export function ViewReminders({ vrvis }) {

    const [data, setData] = useState([])
    const [error, setError] = useState("")

    function getData() {
        const result = RDB.getReminders;
        if (result && result.error === true) {
            setError(result.message);
            return setData([])
        }
        setData(result.data.reminders)
    }


    useEffect(() => {
        getData()
    }, [])

    function deleteReminder(e) {
        let tgt = e.target.dataset;
        if (Object.entries(tgt).length > 0) {
            let { id } = tgt;

            const res = RDB.deleteById(id);
            if (res && res.error === true) {
                setError(res.message);
                notif.error(res.message)
                return
            }
            setData(res.data.reminders)
            notif.success(res.message)
        }
    }

    return (
        <div className="view-reminders">
            <div className="top-head">
                <ion-icon name="arrow-back" onClick={() => vrvis(false)} class="icon"></ion-icon>
                <p>Your Reminders</p>
            </div>
            <div className="reminder-body">
                {
                    error !== "" ?
                        <p>{error}</p>
                        :
                        data && data.length === 0 ?
                            <p>No reminders set.</p>
                            :
                            data.map((list) => {
                                return (
                                    <div className="q-card" data-id={list._id}>
                                        <div className="top">
                                            <p><span>start:</span> {moment(list.start).format("MMM Do YY")}</p>
                                            <p><span>end:</span> {moment(list.end).format("MMM Do YY")}</p>
                                            <span>interval: <kbd>{list.interval}x</kbd></span>
                                        </div>
                                        <button className="btn delete" onClick={(e) => deleteReminder(e)} data-id={list._id}>del</button>
                                    </div>
                                )
                            })
                }
            </div>
        </div>
    )
}

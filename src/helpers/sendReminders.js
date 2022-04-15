import { sendMail } from "./mail"
import moment from "moment"
import quotesData from "../data/quotes.json";

let randReminders = []
let timer = 0
const MINUTE = 60 * 1000

function getReminders() {
    let data = JSON.parse(localStorage.getItem("proact-reminder"))
    return data.reminders
}

async function sendReminders() {

    let reminders = getReminders()
    let length = reminders.length
    // console.log(Object.entries(reminders).length > 0);
    if (length > 0) {
        let rand = Math.floor(Math.random() * reminders.length);
        randReminders.push(reminders[rand]);
        const { interval, start, end } = randReminders[0];


        const currDay = moment().date();
        const currMonth = moment().month() + 1
        const currYear = moment().year()
        const startDay = moment(start).date();
        const endDay = moment(end).date()
        const startYear = moment(start).year()
        const endYear = moment(end).year()
        const startMonth = moment(start).month() + 1;
        const endMonth = moment(end).month() + 1;

        // start operation as far start year is > endYear or equal to

        if (startYear > endYear || startYear === endYear) {
            console.log({ endYear, startYear, currYear, endMonth, startMonth, currMonth, endDay, startDay, currDay });

            const cronJob = setInterval(() => {

                let randomReminders = Math.floor(Math.random() * reminders.length);
                let quoteRand = Math.floor(Math.random() * quotesData.length);
                // get user reminders details from reminders
                const { mail } = reminders[randomReminders]
                let filteredData = quotesData.filter((quote) => quote)[quoteRand]
                let { content, author } = filteredData
                timer += 1;

                // start sending quotes
                sendRemindersToMail(mail, content, author);

                // check if timer is qual to interval set
                if (timer === parseInt(interval)) {
                    console.log("TIMER STOPPED AAA");
                    return clearInterval(cronJob)
                }

                // time machine logic
                if (endYear === currYear && currMonth > endMonth) {
                    console.log("TIMER STOPPED A");
                    return clearInterval(cronJob)
                }
                // check end day and end month
                if (currMonth === endMonth && currDay > endDay) {
                    console.log("TIMER STOPPED B");
                    return clearInterval(cronJob)
                }
                if (endYear === currYear && endMonth === currMonth) {
                    // check start day
                    if (startDay === endDay) {
                        console.log("TIMER STOPPED C");
                        return clearInterval(cronJob)
                    }
                    // check end day
                    if (currDay > endDay) {
                        console.log("TIMER STOPPED D");
                        return clearInterval(cronJob)
                    }
                }
                if (endYear === currYear && startMonth > endMonth) {
                    console.log("TIMER STOPPED E");
                    return clearInterval(cronJob)
                }

            }, MINUTE * interval);
        }

    }
}

export default sendReminders

async function sendRemindersToMail(email, content, author) {
    const quoteTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                .main {
                    width: 100%;
                    height: 100%;
                    flex-direction: column !important;
                    background: linear-gradient(90deg, #f8127e, #5a6cc7);
                    margin: 0px;
                    overflow: hidden;
                    color: #fff;
                    padding: 0px;
                    word-wrap: wrap;
                    text-align: center;
                }
                h2, p{
                    padding:50px 50px 50px 50px;
                }
                
            </style>
        </head>
        <body>
            <div class="main">
                <h2>${content}</h2>
                <br>
                <p> - by: <em>${author}</em></p>
            </div>
        </body>
        </html>
    `

    try {
        sendMail(email, quoteTemplate);
        console.log("QUOTE SEND TO: " + email);
    } catch (err) {
        console.error("FAILED SENDING REMINDERS: " + err.message)
    }
}
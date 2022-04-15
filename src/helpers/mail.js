import Fetch from "./fetch";

const SMTP_TOKEN = "3871433c-6091-4ec2-a099-be182d5e6e29"

export function sendMail(to = "", body = "") {
    window.Email.send({
        SecureToken: SMTP_TOKEN,
        To: to,
        From: "alumonabenaiah71@gmail.com",
        Subject: "Proact Motivational Daily Quote.",
        Body: body
    }).then((message) => {
        console.log(message);
    }).catch((err) => {
        console.log(err);
    })
}





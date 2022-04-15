


export function validateEmail(email) {
    const tester =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) return false;

    let emailParts = email.split("@");

    if (emailParts.length !== 2) return false;

    let account = emailParts[0];
    let address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    let domainParts = address.split(".");
    if (
        domainParts.some(function (part) {
            return part.length > 63;
        })
    )
        return false;

    if (!tester.test(email)) return false;

    return true;
}


export function UUID(len = 5) {
    let char = "abcdefghijklmnopqrstuvwxyz1234567890".split("")
    let uuid = ""
    for (let i = 0; i < len; i++) {
        let rand = Math.floor(Math.random() * char.length);
        uuid += char[rand];
    }
    return uuid;
}
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Notification from '../helpers/notyf'

const notif = new Notification(3000)


const firebaseConfig = {
    apiKey: "AIzaSyDiMMThp6o9tgGs6Ir5GREfe_xxqrlTx-s",
    authDomain: "proact-1a438.firebaseapp.com",
    projectId: "proact-1a438",
    storageBucket: "proact-1a438.appspot.com",
    messagingSenderId: "664808307749",
    appId: "1:664808307749:web:9161ea702348cde41253cc",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const MESSAGING_KEY = "BHQwudBZz56F0MOxLICuVGYj6PBgHsZsKudz74GgrTTzHzBjDHpiBdkp4cGMrmFmoxp2WNDIUE7d_L5nG9eowZM "

// export const requestForToken = () => {
//     return getToken(messaging, { vapidKey: MESSAGING_KEY })
//         .then((currentToken) => {
//             if (currentToken) {
//                 notif.success("current token for client: ", currentToken);
//             } else {
//                 notif.error(
//                     "No registration token available. Request permission to generate one."
//                 );
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//             notif.error("An error occurred while retrieving token.")
//         });
// };

export const requestForToken = async (setTokenFound) => {
    let currentToken = '';
    try {
        currentToken = await getToken(messaging, { vapidKey: MESSAGING_KEY });
        if (currentToken) {
            setTokenFound(true);
        } else {
            setTokenFound(false);
        }
    } catch (error) {
        console.log('An error occurred while retrieving token.', error);
    }
    return currentToken;
};
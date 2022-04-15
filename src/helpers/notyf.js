import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf();

export default class Notification {
    constructor(duration) {
        this.duration = duration === undefined ? 5000 : duration;
        this.position = {
            x: "right",
            y: "top",
        };
    }

    success(msg, duration) {
        return notyf.success({
            duration: duration === undefined ? this.duration : duration,
            message: msg === undefined || msg === null ? this.message : msg,
            dismissible: true,
            position: this.position,
        });
    }

    error(msg, duration) {
        return notyf.error({
            duration: duration === undefined ? this.duration : duration,
            message: msg === undefined || msg === null ? this.message : msg,
            dismissible: true,
            position: this.position,
        });
    }

    dismissAll() {
        return notyf.dismissAll();
    }
}

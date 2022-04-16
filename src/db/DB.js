


/*

    // All Database Format
    // Reminders Table
    {
        "name": "proact-reminder",
        "reminders": [
            {
                _id: saxsaxc,
                start: "11:45",
                end: "12:45",
                category :"science",
                mail: "test@mail.com"
            }
        ]
    }

    // Favorites
    {
        "name": "proact-favorites",
        "data": [
            {
                _id: saxsaxc,
                category :"science",
                image: "quote/axsax.jpeg",
                text: "sxcsaxcdcsdcs"
            }
        ]
    }

    // Fitness App
    {
        "name": "proact-fitness",
        "userInfo": {
            "name": "john",
            "goal": "loose fat",
            "weight": "70",
            "gender": "male"
        },
        "routine": [
            {
                id: "1",
                type: "Barbell push",
                set: "2",
                reps: "",
                kg: "",
                date: "",
                color: ""
            }
        ],
        "achivements":[
            {
                id: "",
                routine_type: "",
                type: "achivement type"
            }
        ]

    }

*/

// Global functions

function parseJson(object) {
    return JSON.parse(object)
}

function parseString(object) {
    return JSON.stringify(object)
}

export class RemindersDB {

    constructor() {
        this.name = "proact-reminder";
        this.sendData = {}
    }

    createDatabase(name = "") {
        if (name === "") {
            this.sendData["error"] = true;
            this.sendData["message"] = "Failed to create database with empty name";
            return this.sendData
        }

        if (localStorage.getItem(this.name) === null) {
            return localStorage.setItem(name, parseString({ name: this.name, reminders: [] }))
        }
    }

    saveToDb(data = {}) {
        if (data === "" || Object.entries(data).length === 0) {
            this.sendData["error"] = true;
            this.sendData["message"] = "Failed to save data to: payload is empty";
            return this.sendData
        }

        localStorage.setItem(this.name, parseString(data))
        this.sendData["error"] = false;
        this.sendData["message"] = "Data added successfully";
        return this.sendData
    }

    findDb(databaseName = "") {
        if (databaseName === "") {
            this.error = true;
            this.message = "Failed to find data with empty name";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        let data = localStorage.getItem(databaseName);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = parseJson(data);
        return this.sendData
    }

    findbyId(id = "") {
        if (id === "") {
            this.error = true;
            this.message = "Failed to find data with empty id";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        let data = parseJson(localStorage.getItem(this.name));
        const reminders = data.reminders;
        const filteredData = reminders.filter((list) => list._id === id);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = filteredData;
        return this.sendData
    }

    postData(newdata = {}) {
        let dbdata = this.findDb(this.name);

        if (dbdata && dbdata.error === true) {
            this.sendData["error"] = true;
            this.sendData["message"] = "failed to add data: database not found.";
            return this.sendData;
        }
        let prevData = dbdata.data.reminders;
        const filteredData = prevData.filter((list) => list._id !== newdata._id)
        const newReminder = [...filteredData, newdata]
        const dbName = dbdata.data.name;
        const newSavedData = {
            name: dbName,
            reminders: newReminder
        }
        let result = this.saveToDb(newSavedData);

        if (result && result.error === true) {
            return result
        }

        return result
    }

    deleteById(id = "") {
        if (id === "") {
            this.error = true;
            this.message = "Failed to delete data with empty id";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        // check if data with id exists in db
        const check = this.findbyId(id);

        if (check) {
            if (check.error === true) {
                return check;
            }
            if (check.data.length === 0) {
                this.error = true;
                this.message = "Failed to delete data: reminder not found";
                this.sendData["error"] = this.error;
                this.sendData["message"] = this.message;
                return this.sendData
            }

            // filter data out of localstorage with that id
            const { data } = this.getReminders
            const filtdata = data.reminders.filter((list) => list._id !== id);
            const newStorageData = {
                nam: data.name,
                reminders: filtdata
            }

            // update localstorage
            const result = this.saveToDb(newStorageData)
            if (result && result.error === true) {
                this.sendData["error"] = true;
                this.sendData["message"] = "Failed to delete data: " + result.message;
                return this.sendData
            }

            this.sendData["error"] = false;
            this.sendData["message"] = "successfull deleted reminder";
            this.sendData["data"] = newStorageData
            return this.sendData
        }
    }

    get getReminders() {
        let data = localStorage.getItem(this.name);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = parseJson(data);
        return this.sendData
    }

    init() {

        // init db creation
        this.createDatabase(this.name)
    }

}



export class FavoriteDB {

    constructor() {
        this.name = "proact-favorite";
        this.sendData = {}
    }

    get getfavorites() {
        let data = localStorage.getItem(this.name);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = parseJson(data);
        return this.sendData
    }

    createDatabase(name = "") {
        if (name === "") {
            this.sendData["error"] = true;
            this.sendData["message"] = "Failed to create database with empty name";
            return this.sendData
        }

        if (localStorage.getItem(this.name) === null) {
            return localStorage.setItem(name, parseString({ name: this.name, favorites: [] }))
        }
    }

    saveToDb(data = {}) {
        if (data === "" || Object.entries(data).length === 0) {
            this.sendData["error"] = true;
            this.sendData["message"] = "Failed to save data to storage: payload is empty";
            return this.sendData
        }

        localStorage.setItem(this.name, parseString(data))
        this.sendData["error"] = false;
        this.sendData["message"] = "Data added successfully";
        return this.sendData
    }

    findDb(databaseName = "") {
        if (databaseName === "") {
            this.error = true;
            this.message = "Failed to find data with empty name";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        let data = localStorage.getItem(databaseName);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = parseJson(data);
        return this.sendData
    }

    findbyId(id = "") {
        if (id === "") {
            this.error = true;
            this.message = "Failed to find data with empty id";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        let data = parseJson(localStorage.getItem(this.name));
        const favorites = data.favorites;
        const filteredData = favorites.filter((list) => list._id === id);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = filteredData;
        return this.sendData
    }

    postData(newdata = {}) {
        let dbdata = this.findDb(this.name);

        if (dbdata && dbdata.error === true) {
            this.sendData["error"] = true;
            this.sendData["message"] = "failed to add data: database not found.";
            return this.sendData;
        }

        let data = parseJson(localStorage.getItem(this.name));
        let prevData = dbdata.data.favorites;
        const filteredData = prevData.filter((list) => list._id !== newdata._id)
        const favorites = data.favorites;
        const addedFavorite = favorites.filter((list) => list._id === newdata._id);
        let newFavorite;

        // check if this quotes exist in favourites
        const checkFav = prevData.filter((quote) => quote._id === newdata._id)
        // if it exists, simply remove the favourite from storage
        if (checkFav.length > 0) {
            newFavorite = [...filteredData]
            const dbName = dbdata.data.name;
            const newSavedData = {
                name: dbName,
                favorites: newFavorite
            }
            let result = this.saveToDb(newSavedData);

            if (result && result.error === true) {
                this.sendData["error"] = true;
                this.sendData["message"] = result.message;
                return this.sendData
            }

            this.sendData["error"] = false;
            this.sendData["message"] = "successfull";
            this.sendData["addedStatus"] = false;
            this.sendData["addedQuote"] = newdata;
            return this.sendData
        }

        newFavorite = [...filteredData, newdata]
        const dbName = dbdata.data.name;

        const newSavedData = {
            name: dbName,
            favorites: newFavorite
        }

        let result = this.saveToDb(newSavedData);

        if (result && result.error === true) {
            this.sendData["error"] = true;
            this.sendData["message"] = result.message;
            return this.sendData
        }

        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["addedStatus"] = true;
        this.sendData["addedQuote"] = newdata;
        return this.sendData
    }

    deleteById(id = "") {
        if (id === "") {
            this.error = true;
            this.message = "Failed to delete data with empty id";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        // check if data with id exists in db
        const check = this.findbyId(id);

        if (check) {
            if (check.error === true) {
                return check;
            }
            if (check.data.length === 0) {
                this.error = true;
                this.message = "Failed to delete data: favorite not found";
                this.sendData["error"] = this.error;
                this.sendData["message"] = this.message;
                return this.sendData
            }

            // filter data out of localstorage with that id
            const { data } = this.getfavorites
            const filtdata = data.favorites.filter((list) => list._id !== id);
            const newStorageData = {
                nam: data.name,
                favorites: filtdata
            }

            // update localstorage
            const result = this.saveToDb(newStorageData)
            if (result && result.error === true) {
                this.sendData["error"] = true;
                this.sendData["message"] = "Failed to delete data: " + result.message;
                return this.sendData
            }

            this.sendData["error"] = false;
            this.sendData["message"] = "successfull deleted reminder";
            this.sendData["data"] = newStorageData
            return this.sendData
        }
    }


    init() {

        // init db creation
        this.createDatabase(this.name)
    }

}


export class FitnessDB {

    constructor() {
        this.name = "proact-fitness";
        this.sendData = {}
    }

    get getFitnessData() {
        let data = localStorage.getItem(this.name);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = parseJson(data);
        return this.sendData
    }

    createDatabase(name = "") {
        if (name === "") {
            this.sendData["error"] = true;
            this.sendData["message"] = "Failed to create database with empty name";
            return this.sendData
        }

        const dbInfo = {
            name: this.name,
            userInfo: {},
            workouts: [],
            completedWorkouts: [],
            achivements: []
        }

        if (localStorage.getItem(this.name) === null) {
            return localStorage.setItem(name, parseString(dbInfo))
        }
    }

    saveUserInfo(data = {}) {
        if (data === "" || Object.entries(data).length === 0) {
            this.sendData["error"] = true;
            this.sendData["message"] = "Failed to save data to userinfo in storage: payload is empty";
            return this.sendData
        }
        let storagedata = parseJson(localStorage.getItem(this.name));
        storagedata.userInfo = data;
        let res = this.saveToDb(storagedata);
        return res;
    }

    saveToDb(data = {}) {
        if (data === "" || Object.entries(data).length === 0) {
            this.sendData["error"] = true;
            this.sendData["message"] = "Failed to save data to storage: payload is empty";
            return this.sendData
        }

        localStorage.setItem(this.name, parseString(data))
        this.sendData["error"] = false;
        this.sendData["message"] = "Data added successfully";
        return this.sendData
    }

    findDb(databaseName = "") {
        if (databaseName === "") {
            this.error = true;
            this.message = "Failed to find data with empty name";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        let data = localStorage.getItem(databaseName);
        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = parseJson(data);
        return this.sendData
    }

    findColumnName(columnName = "") {
        if (columnName === "") {
            this.error = true;
            this.message = "Failed to find table data with empty name";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        let data = parseJson(localStorage.getItem(this.name));
        if (data[columnName] === undefined) {
            this.error = true;
            this.message = `Table name '${columnName}' wasnt found in ${this.name} database `;
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
        }

        this.sendData["error"] = false;
        this.sendData["message"] = "successfull";
        this.sendData["data"] = data[columnName]
        return this.sendData
    }

    postData(columnName = "", payload = {}) {

        const dbRes = this.findDb(this.name);
        if (dbRes.error === true) {
            return dbRes
        }
        const { data } = dbRes
        // check if columnName exists before posting data
        let colFind = data[columnName]

        if (colFind === undefined) {
            this.sendData["error"] = true;
            this.sendData["message"] = `Failed to add workout: column name [${columnName}] doesnt exists.`
            return this.sendData
        }

        if (Object.entries(payload).length === 0) {
            this.sendData["error"] = true;
            this.sendData["message"] = `Failed to add workout: payload is empty`
            return this.sendData
        }

        colFind.push(payload)

        const results = this.saveToDb(data);

        if (results.error === true) {
            return results
        }

        this.sendData["error"] = false;
        this.sendData["message"] = `Workout added successfully.`
        return this.sendData
    }

    deleteById(columnName = "", id = "") {
        if (columnName === "") {
            this.error = true;
            this.message = "Failed to delete table data with empty column name";
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
            return this.sendData
        }

        let data = parseJson(localStorage.getItem(this.name));
        if (data[columnName] === undefined) {
            this.error = true;
            this.message = `Table name '${columnName}' wasnt found in ${this.name} database `;
            this.sendData["error"] = this.error;
            this.sendData["message"] = this.message;
        }

        let colData = data[columnName];
        let filtData = colData.filter((data) => data.id !== id);

        if (filtData.length === 0) {
            this.error = true;
            this.message = `Failed: data doesnt exists in ${columnName} table`;
            this.sendData["error"] = true;
            this.sendData["message"] = this.message;
        }

        data[columnName] = filtData;

        // console.log(colData);
        const results = this.saveToDb(data)
        if (results.error === true) {
            return results;
        }

        this.sendData["error"] = false;
        this.sendData["message"] = `workout deleted successfully`;
        this.sendData["data"] = colData;
        return this.sendData
    }

    init() {

        // init db creation
        this.createDatabase(this.name)
    }

}


export const FitDB = new FitnessDB()
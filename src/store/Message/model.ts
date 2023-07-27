import {makeAutoObservable} from "mobx";
import Users from '../Users/model'
import {getRandomNumber} from "../helpers";

class Message {
    private _userIdFrom: number
    private _userIdTo: number
    private readonly _message: string
    private _id: number

    constructor(userIdFrom: number, userIdTo: number, message: string) {
        makeAutoObservable(this)
        this._userIdFrom = userIdFrom
        this._userIdTo = userIdTo
        this._message = message
        this._id = getRandomNumber()
    }

    get message() {
        return this._message
    }

    get id() {
        return this._id
    }

    get userIdFrom() {
        return this._userIdFrom
    }

    getUserFromData() {
        return Users.getUserData(this._userIdFrom)
    }

    getUserToData() {
        return Users.getUserData(this._userIdTo)
    }
}

export default Message
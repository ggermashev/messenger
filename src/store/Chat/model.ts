import User from "../User/model";
import Message from "../Message/model";
import {makeAutoObservable} from "mobx";
import {getRandomNumber} from "../helpers";
import Users from '../Users/model'

class Chat {
    private readonly _user1Id: number
    private readonly _user2Id: number
    private readonly _messages: Message[]
    private readonly _id: number
    private _isActive: boolean

    constructor(user1Id: number, user2Id: number) {
        makeAutoObservable(this)
        this._user1Id = user1Id
        this._user2Id = user2Id
        this._messages = []
        this._id = getRandomNumber()
        this._isActive = false
    }

    sendMessage(userIdFrom: number, message: string) {
        const userIdTo = userIdFrom === this._user1Id ? this.user2Id : this.user1Id
        this._messages.push(new Message(userIdFrom, userIdTo, message))
    }

    get id() {
        return this._id
    }

    get user1Id() {
        return this._user1Id
    }

    get user2Id() {
        return this._user2Id
    }

    get messages() {
        return this._messages
    }

    get isActive() {
        return this._isActive
    }

    set isActive(status: boolean) {
        this._isActive = status
    }

    getContactData(userId: number) {
        if (userId === this._user1Id) {
            return Users.getUserData(this._user2Id)
        } else {
            return Users.getUserData(this._user1Id)
        }
    }
}

export default Chat
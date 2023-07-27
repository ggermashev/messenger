import {makeAutoObservable} from "mobx";
import sha256 from 'crypto-js/sha256';
import {getRandomNumber, getHash} from "../helpers";

export interface IData {
    name: string,
    surname: string,
}

class User {
    private _login: string;
    private _password: string;
    private readonly _id: number;
    private _name: string = ""
    private _surname: string = ""

    constructor(login: string, password: string) {
        makeAutoObservable(this)
        this._login = login
        this._password = getHash(password).toString()
        this._id = getRandomNumber()
    }

    get id() {
        return this._id
    }

    get login() {
        return this._login
    }

    setData({name, surname}: IData) {
        this._name = name
        this._surname = surname
    }

    getData() {
        return {name: this._name, surname: this._surname}
    }

    checkAuth(login: string, password: string): number | null {
        if (this._login === login && this._password === sha256(password).toString()) {
            return this._id
        } else {
            return null
        }

    }


}


export default User
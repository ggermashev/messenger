import User, {IData} from "../User/model";
import {makeAutoObservable} from "mobx";
import {isAuth, logout} from "../helpers";
import Chats from "../Chats/model";

class Users {
    private _users: User[]
    private _isAuth: boolean

    constructor() {
        makeAutoObservable(this)
        this._users = []
        this._isAuth = isAuth()
    }

    get isAuth() {
        this._isAuth = isAuth()
        return this._isAuth
    }

    addUser(login: string, password: string) {
        console.log(login, password)
        if (this._users.find(user => user.login === login)) {
            throw new Error("Такой пользователь уже есть")
        }
        const user = new User(login, password)
        this._users.push(user)
        return user.id
    }

    removeUser(userId: number) {
        this._users = this._users.filter(user => user.id !== userId)
    }

    auth(login: string, password: string): number | null {
        let id = null;
        for (let user of this._users) {
            const authId = user.checkAuth(login, password)
            if (authId) {
                id = authId
                break;
            }
        }
        if (!id) {
            throw new Error('неверный логин или пароль')
        }
        localStorage.setItem('userId', `${id}`)
        this._isAuth = isAuth()
        return id
    }

    logout() {
        logout()
        this._isAuth = isAuth()
    }

    getUsersId() {
        return this._users.map(user => user.id)
    }

    getUserData(userId: number) {
        const user = this._users.find(user => user.id === userId)
        return user?.getData()
    }

    setUserData(userId: number, {name, surname}: IData) {
        const user = this._users.find(user => user.id === userId)
        user?.setData({name, surname})
    }
}

export default new Users()
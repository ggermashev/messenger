import Chat from "../Chat/model";
import {makeAutoObservable} from "mobx";
import Users from '../../store/Users/model'

class Chats {
    private _chats: Chat[]
    private _activeChatId: number | null

    constructor() {
        makeAutoObservable(this)
        this._chats = []
        this._activeChatId = null
    }

    get activeChatId(): number | null {
        return this._activeChatId
    }

    set activeChatId(chatId: number | null) {
        this._activeChatId = chatId
    }

    createChat(user1Id: number, user2Id: number) {
        this._chats.push(new Chat(user1Id, user2Id))
    }

    createChats(newUserId: number) {
        const ids = Users.getUsersId()
        ids.forEach(id => {
            if (id !== newUserId) {
                this.createChat(id, newUserId)
            }
        })
    }

    removeChat(chatId: number) {
        this._chats = this._chats.filter(chat => chat.id !== chatId)
    }

    getChats(userId: number): Chat[] {
        const chats = this._chats.filter(chat => chat.user1Id === userId || chat.user2Id === userId)
        return chats
    }

    getMessagesByChatId(chatId: number) {
        return this._chats.find(chat => chat.id === chatId)?.messages
    }

    getChatByChatId(chatId: number) {
        return this._chats.find(chat => chat.id === chatId)
    }


}

export default new Chats()
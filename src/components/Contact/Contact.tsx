import React, {createRef, FC, useRef} from 'react';
import styles from './Contact.module.scss'
import {IData} from "../../store/User/model";
import Message from "../../store/Message/model";
import Chats from '../../store/Chats/model'
import Chat from "../../store/Chat/model";
import {observer} from "mobx-react-lite";

export interface IContact {
    data: IData,
    messages: Message[],
    id: number,
}

const Contact: FC<IContact> = observer( ({data, messages, id}) => {

    const {name, surname} = {...messages.at(-1)?.getUserFromData()} || {...{name: "", surname: ""}}
    const lastMsg = messages.at(-1)?.message

    return (
        <div
            className={styles.contact}
            style={{backgroundColor: Chats.activeChatId === id ? 'white' : 'rgba(255,255,255,0.5)'}}
            onClick={() => {
                if (Chats.activeChatId === id) {
                    Chats.activeChatId = null
                } else {
                    Chats.activeChatId = id
                }
            }}
        >
            <div className={styles.header}>
                <p>{`${data.name} ${data.surname}`}</p>
            </div>
            <div className={styles.lastMsg}>
                <p>{lastMsg ? `${name} ${surname}: ${lastMsg}` : 'Нет сообщений'}</p>
            </div>
        </div>
    );
});

export default Contact;
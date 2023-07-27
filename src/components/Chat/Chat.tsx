import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './Chat.module.scss'

import Chats from '../../store/Chats/model'
import {observer} from "mobx-react-lite";
import Message from "../Message/Message";
import {Button, TextInput} from "../../ui";
import {getAuthUserId} from "../../store/helpers";

const Chat = observer(() => {

    useEffect(() => {
        // @ts-ignore
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 45;
    }, [Chats.activeChatId])

    const messages = useMemo(() => {
        if (Chats.activeChatId === null) {
            return null
        } else {
            return Chats.getMessagesByChatId(Chats.activeChatId)
        }
    }, [Chats.activeChatId])

    const [input, setInput] = useState('')

    const sendMessage = useCallback(() => {
        if (Chats.activeChatId && input.length > 0) {
            const chat = Chats.getChatByChatId(Chats.activeChatId)
            chat?.sendMessage(+getAuthUserId(), input)
            setInput('')
            setTimeout(() => {
                // @ts-ignore
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 45;
            }, 5)
        }
    }, [input])

    const messagesRef = useRef(null)
    const floorRef = useRef(null)

    return (
        <div className={styles.chat}>
            <div className={styles.messages} ref={messagesRef}>
                {messages
                    ? messages.map(message =>
                        <Message key={message.id}
                                 userIdFrom={message.userIdFrom}
                        >
                            {message.message}
                        </Message>)
                    : ''
                }
                <div ref={floorRef}></div>
            </div>
            <div className={styles.input}
                 onKeyDown={(e) => {
                     if (e.code==='Enter') {
                         sendMessage()
                     }
                 }}
            >
                <TextInput wrapClassName={styles.textInputWrap} className={styles.textInput} value={input} setValue={setInput} title={''}/>
                <img
                    className={styles.send}
                    src={require('./images/send.png')}
                    onClick={() => {
                        sendMessage()
                    }}
                />
            </div>


        </div>
    );
});

export default Chat;
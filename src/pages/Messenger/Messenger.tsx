import React, {useMemo} from 'react';
import styles from './Messenger.module.scss'
import Chats from '../../store/Chats/model'
import {getAuthUserId} from "../../store/helpers";
import Contact, {IContact} from "../../components/Contact/Contact";
import Chat from "../../components/Chat/Chat";

const Messenger = () => {

    const contacts: IContact[] = useMemo(() => {
        try {
            const chats = Chats.getChats(+getAuthUserId())
            return chats.map(chat => {
                return (
                    {
                        data: chat.getContactData(+getAuthUserId()),
                        messages: chat.messages,
                        id: chat.id
                    } as IContact
                )
            })
        } catch(e) {
            console.log(e)
            return []
        }
    }, [])

    return (
        <div className={styles.messenger}>
            <div className={styles.contacts}>
                {contacts.map(({data, messages, id}) => <Contact data={data} messages={messages} id={id}/>)}
            </div>
            <div className={styles.chat}>
                <Chat/>
            </div>
        </div>
    );
};

export default Messenger;
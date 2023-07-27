import React, {FC} from 'react';
import styles from './Message.module.scss'
import {getAuthUserId} from "../../store/helpers";

interface IMessage {
    userIdFrom: number,
    children: React.ReactNode,
}

const Message: FC<IMessage> = ({userIdFrom, children}) => {
    return (
        <div
            className={styles.message}
            style={{alignSelf: userIdFrom === +getAuthUserId() ? 'end' : 'start'}}
        >
            {children}
        </div>
    );
};

export default Message;
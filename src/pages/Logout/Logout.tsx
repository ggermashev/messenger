import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {logout} from "../../store/helpers";
import Users from '../../store/Users/model'
import Chats from '../../store/Chats/model'

const Logout = () => {

    const navigate = useNavigate()

    useEffect(() => {
        Users.logout()
        Chats.activeChatId = null
        navigate('/auth')
    }, [])

    return (
        <div>

        </div>
    );
};

export default Logout;
import React, {useEffect} from 'react';
import {isAuth} from "../../store/helpers";
import {useNavigate} from "react-router-dom";


const Base = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth()) {
            navigate('/messenger')
        } else {
            navigate('/auth')
        }
    })

    return (
        <div>

        </div>
    );
};

export default Base;
import React, {useEffect, useMemo, useState} from 'react';
import styles from './Auth.module.scss'
import {AuthWindow} from "../../components";
import Users from '../../store/Users/model'
import User from "../../store/User/model";
import Chats from '../../store/Chats/model'
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {TextInput} from "../../ui";

const Auth = observer(() => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [position, setPosition] = useState<'left' | 'right' | undefined>('right')

    const [loginIsValid, setLoginIsValid] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [nameIsValid, setNameIsValid] = useState(false)
    const [surnameIsValid, setSurnameIsValid] = useState(false)

    useEffect(() => {
        setLogin('')
        setPassword('')
        setName('')
        setSurname('')
        setLoginIsValid(false)
        setPasswordIsValid(false)
        setNameIsValid(false)
        setSurnameIsValid(false)


    }, [position])

    const isValid = useMemo(() => {
        if (position === 'left') {
            return loginIsValid && passwordIsValid && nameIsValid && surnameIsValid
        } else {
            return loginIsValid && passwordIsValid
        }

    }, [loginIsValid, passwordIsValid, nameIsValid, surnameIsValid, position])

    const navigate = useNavigate()

    return (
        <div className={styles.auth}>
            <AuthWindow
                className={styles.window}
                login={login}
                setLogin={setLogin}
                password={password}
                setPassword={setPassword}
                onRegistration={() => {
                    if (isValid) {
                        try {
                            const id = Users.addUser(login, password)
                            Users.setUserData(id as number, {name, surname})
                            Chats.createChats(id)
                            setPosition('right')
                        } catch (e: any) {
                            alert(e)
                        }
                    } else {
                        alert('Данные введены неверно')
                    }

                }}
                onAuth={() => {
                    if (isValid) {
                        try {
                            const id = Users.auth(login, password)
                            navigate('/messenger')

                        } catch (e: any) {
                            alert(e)
                        }
                    } else {
                        alert('Данные введены неверно')
                    }

                }}
                position={position}
                setPosition={setPosition}
                loginIsValid={loginIsValid}
                passwordIsValid={passwordIsValid}
                setLoginIsValid={setLoginIsValid}
                setPasswordIsValid={setPasswordIsValid}
                dependencies={[nameIsValid, surnameIsValid, name, surname]}
            >
                {position === 'left' &&
                    <>
                        <TextInput setIsValid={setNameIsValid} required={true} value={name} setValue={setName}
                                   title={'Имя'}/>
                        <TextInput setIsValid={setSurnameIsValid} required={true} value={surname} setValue={setSurname}
                                   title={'Фамилия'}/>
                    </>
                }
            </AuthWindow>
        </div>
    );
});

export default Auth;
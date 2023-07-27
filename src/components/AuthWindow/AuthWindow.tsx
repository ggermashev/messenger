import React, {FC, useMemo, useState} from 'react';
import styles from './AuthWindow.module.scss'
import {Button, TextInput, ToggleSwitch} from "../../ui";


interface IAuthWindow {
    login: string,
    setLogin: (login: string) => void,
    password: string,
    setPassword: (password: string) => void,
    children?: React.ReactNode,
    className?: string,
    onRegistration: () => void,
    onAuth: () => void,
    position?: 'left' | 'right',
    setPosition: (position: 'left' | 'right' | undefined) => void,
    loginIsValid?: boolean,
    passwordIsValid?: boolean
    setLoginIsValid?: (isValid: boolean) => void,
    setPasswordIsValid?: (isValid: boolean) => void,
    dependencies?: any[],

}

const AuthWindow: FC<IAuthWindow> = ({
                                         login,
                                         setLogin,
                                         password,
                                         setPassword,
                                         children,
                                         className = "",
                                         onAuth,
                                         onRegistration,
                                         position,
                                         setPosition,
                                         loginIsValid,
                                         passwordIsValid,
                                         setLoginIsValid,
                                         setPasswordIsValid,
                                         dependencies=[]
                                     }) => {


    const onSubmit = useMemo(() => {
        if (position === 'right') {
            return onAuth
        } else {
            return onRegistration
        }
    }, [position, login, password, loginIsValid, passwordIsValid, ...dependencies as []])

    return (
        <div className={`${styles.authWindow} ${className}`}>
            <TextInput setIsValid={setLoginIsValid} required={true} value={login} setValue={setLogin} title={'login'}/>
            <TextInput setIsValid={setPasswordIsValid} required={true} value={password} setValue={setPassword}
                       title={'password'}/>
            {children}
            <Button onClick={() => {
                onSubmit()
            }}>
                {position === 'right' ? 'Войти' : 'Создать аккаунт'}
            </Button>
            <div className={styles.mode}>
                <div className={styles.left}>
                    <h3>Регистрация</h3>
                </div>

                <ToggleSwitch position={position} setPosition={setPosition} bgLeftColor={'purple'}
                              bgRightColor={'lightblue'}/>

                <div className={styles.right}>
                    <h3>Вход</h3>
                </div>
            </div>
        </div>
    );
};

export default AuthWindow;
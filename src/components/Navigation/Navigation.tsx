import React, {FC, useMemo} from 'react';
import styles from './Navigation.module.scss'
import {isAuth} from "../../store/helpers";
import {useNavigate} from "react-router-dom";
import {observe} from "mobx";
import {observer} from "mobx-react-lite";
import Users from '../../store/Users/model'

interface ILink {
    children: React.ReactNode,
    link: string,
}

const Link: FC<ILink> = ({children, link}) => {

    const navigate = useNavigate()

    return (
        <div
            className={styles.link}
            onClick={() => {navigate(link)}}
        >{children}</div>
    )
}

const Navigation = observer( () => {


    const auth = useMemo(() => {
        return Users.isAuth ? 'Выход' : 'Вход'
    }, [Users.isAuth])

    return (
        <div className={styles.nav}>
            <div className={styles.left}>
                <Link link={'/messenger'}>Чат</Link>
            </div>
            <div className={styles.right}>
                <Link link={isAuth() ? '/logout' : '/auth'}>
                    {auth}
                </Link>
            </div>
        </div>
    );
});

export default Navigation;
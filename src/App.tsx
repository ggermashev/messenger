import React, {useEffect} from 'react';
import styles from './App.module.scss'
import {Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Messenger from "./pages/Messenger/Messenger";
import Base from "./pages/Base/Base";
import Error from "./pages/Error/Error";
import Navigation from "./components/Navigation/Navigation";
import Logout from "./pages/Logout/Logout";
import Users from './store/Users/model'
import Chats from "./store/Chats/model";


function App() {

    useEffect(() => {
        Users.logout()
        for (let i = 0; i < 20; i++) {
            try {
                let id = Users.addUser(`user${i + 1}`, `user${i + 1}`)
                Users.setUserData(id, {name: `user${i + 1}`, surname: `user${i + 1}`})
                Chats.createChats(id)
            } catch (e) {

            }
        }
    }, [])

    return (
        <div className={styles.app}>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={'/auth'} element={<Auth/>}/>
                    <Route path={'/messenger'} element={<Messenger/>}/>
                    <Route path={'/logout'} element={<Logout/>}/>
                    <Route path={'/'} element={<Base/>}/>
                    <Route path={'*'} element={<Error/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;

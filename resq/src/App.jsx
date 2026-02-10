import { useState } from 'react'
import LoginPage from './login/Login'
import Dashboard from './dashboard/Dashboard'
import './App.css'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // no navigate just used conditional rendering for now
    // if setIsLoggedIn = true -> dashboard page
    // if setIsloggedOut = false -> login page
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <>
            {isLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </>
    );
}

export default App

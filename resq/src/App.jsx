import { useState } from 'react'
import LoginPage from './login/Login'
import Dashboard from './dashboard/Dashboard'
import './App.css'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

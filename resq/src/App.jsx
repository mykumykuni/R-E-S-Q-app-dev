import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './login/Login'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import IncidentMap from './pages/IncidentMap'
import CameraFeed from './pages/CameraFeed'
import CameraList from './pages/CameraList';
import Reports from './pages/Reports'
import './dashboard/Dashboard.css'
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
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        isLoggedIn ? (
                            <Navigate to="/overview" replace />
                        ) : (
                            <LoginPage onLogin={handleLogin} />
                        )
                    } 
                />
                <Route 
                    element={
                        isLoggedIn ? (
                            <Layout onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                >
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/incident-map" element={<IncidentMap />} />
                    <Route path="/camera-feed" element={<CameraFeed />} />
                    <Route path="/camera-list" element={<CameraList />} />
                    <Route path="/reports" element={<Reports />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App

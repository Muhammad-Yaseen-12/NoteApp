import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './components/Logout';
import authContext from './context/AuthContext';
import { useContext } from 'react';

function App() {
  let {isUser} = useContext(authContext)

  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#282c34',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        
        {!isUser && (
          <>
            <Link to="/" style={styles.link}>Signup</Link>
        <Link to="/login" style={styles.link}>Login</Link>
          </>
        )}
        {isUser && (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Logout style={styles.link} />
          </>
        )}
      </nav>
      <Routes>
        {/* <Route path="/" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={!isUser ? <Signup /> : <Navigate to="/dashboard" replace />} />
        <Route path="/login" element={!isUser ? <Login /> : <Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={isUser ? <Dashboard /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
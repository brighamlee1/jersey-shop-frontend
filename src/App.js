import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Jerseys from './pages/Jerseys';
import Register from './pages/Register';
import JerseyView from './pages/JerseyView';
import Header from './components/Header';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';

function App() {

  // const getUsers = () => {
  //   fetch(URL)
  //     .then(response => response.json())
  //     .then(result => setUser(result))
  // }

  // useEffect(() => {
  //   getUsers();
  // }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/jerseys" />} />
        <Route path='/jerseys' element={<Jerseys />} />
        <Route path='/jerseys/:id' element={<JerseyView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;

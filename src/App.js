import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Jerseys from './pages/Jerseys';
import Register from './pages/Register';
import JerseyView from './pages/JerseyView';
import Header from './components/Header';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import Footer from './components/Footer';

function App() {

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
      <Footer />
    </div>
  );
}

export default App;

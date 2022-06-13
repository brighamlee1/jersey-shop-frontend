import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Jerseys from './pages/Jerseys';
import Register from './pages/Register';
import JerseyView from './pages/JerseyView';
import Header from './components/Header';
import Login from './pages/Login'

function App() {

  const URL = "https://jersey-shop-backend.herokuapp.com"

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Navigate to="/jerseys"/> } />
        <Route path='/jerseys' element={<Jerseys URL={URL} />} />
        <Route path='/jerseys/:id' element={<JerseyView URL={URL} />} />
        <Route path="/register" element={<Register URL={URL} />} />
        <Route path="/login" element={<Login URL={URL} />} />
      </Routes>
    </div>
  );
}

export default App;

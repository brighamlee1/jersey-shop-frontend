import './App.css';
import { Route, Routes } from 'react-router-dom';
import Jerseys from './pages/Jerseys';
import Register from './pages/Register';

function App() {

  const URL = "https://jersey-shop-backend.herokuapp.com"

  return (
    <div className="App">
      <Routes>
        <Route path='/jerseys' element={<Jerseys URL={URL} />} />
        <Route path="/register" element={<Register URL={URL} />}  />
      </Routes>
    </div>
  );
}

export default App;

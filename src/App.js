import './App.css';
import { Route, Routes } from 'react-router-dom';
import Jerseys from './pages/Jerseys';
import Register from './pages/Register';
import JerseyView from './pages/JerseyView';
import Header from './components/Header';

function App() {

  const URL = "https://jersey-shop-backend.herokuapp.com"

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/jerseys' element={<Jerseys URL={URL} />} />
        <Route path='/jerseys/:id' element={<JerseyView URL={URL} />} />
        <Route path="/register" element={<Register URL={URL} />} />
      </Routes>
    </div>
  );
}

export default App;

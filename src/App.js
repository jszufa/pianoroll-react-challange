import './App.css';
import logo from './assets/white.svg';
import AppRoutes from './routes/AppRoutes';
import { useState } from 'react';
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  const [formatedRollsList, setFormatedRollsList] = useState(
    localStorage.getItem('formatedRollsList') ? JSON.parse(localStorage.getItem('formatedRollsList')) : []);

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <Link to={'/'}><div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>
          </Link>
        </nav>
        <AppRoutes
          formatedRollsList={formatedRollsList}
          setFormatedRollsList={setFormatedRollsList}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

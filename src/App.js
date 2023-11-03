import './App.css';
import logo from './assets/white.svg';
import AppRoutes from './routes/AppRoutes';
import { useState } from 'react';

function App() {
  const [formatedRollsList, setFormatedRollsList] = useState([]);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
      </nav>
      <AppRoutes
      formatedRollsList={formatedRollsList} 
      setFormatedRollsList={setFormatedRollsList}
      />
    </div>
  );
}

export default App;

    //ewentulanie dodanie local-storage
    //redakcja kodu

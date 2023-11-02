import './App.css';
import logo from './assets/white.svg';
import AppRoutes from './routes/AppRoutes';

function App() {


  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
      </nav>
      <AppRoutes />
    </div>
  );
}

export default App;

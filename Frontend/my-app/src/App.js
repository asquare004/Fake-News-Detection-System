import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Login.js';
import Home from './Home.js';
import { AuthProvider } from './AuthProvider.js';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

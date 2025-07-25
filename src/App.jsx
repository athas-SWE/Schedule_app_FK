import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import AdminDashboard from './pages/Admin';
import Client from './pages/Client';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/client' element={<Client />} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import ProtectedRoute from './components/ProtectedRoute';
import { setToken } from './api/api';
import Navbar from './components/Navbar';

const token = localStorage.getItem('token');
if (token) setToken(token);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={
          <ProtectedRoute><Posts /></ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute><CreatePost /></ProtectedRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import { api, setToken } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('All fields required');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

import { useState } from 'react';
import { api, setToken } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return setError('All fields required');
    try {
      const res = await api.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>Register</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
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
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

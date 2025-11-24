import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../api/api';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Mini Blog
        </Typography>
        {token && (
          <Box>
            
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

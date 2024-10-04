import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { login } from '../actions/AuthAction/login';


const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8',
    },
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 500,
      fontFamily: 'Arial, sans-serif',
    },
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.Login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', // Full viewport height
          backgroundColor: 'background.default' // Background color from theme
        }}
      >
        <Box sx={{ maxWidth: 400, width: '100%', padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary.main">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {loading ? (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            ) : (
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
                Login
              </Button>
            )}
          </form>
          {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
          {isAuthenticated && <Alert severity="success" sx={{ marginTop: 2 }}>Login Successful!</Alert>}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ADMIN_EMAILS = ['verbovsky13@yandex.ru', 'artemverbovsky793@gmail.com'];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // Получаем роль пользователя
      const me = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      if (ADMIN_EMAILS.includes(me.data.user.email)) {
        navigate('/admin');
      } else {
        navigate('/records');
      }
    } catch (err) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Вход</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Войти</Button>
        </form>
        <Button component={Link} to="/register" fullWidth sx={{ mt: 2 }}>Нет аккаунта? Зарегистрироваться</Button>
      </Box>
    </Container>
  );
};

export default LoginPage; 
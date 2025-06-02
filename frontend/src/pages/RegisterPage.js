import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ADMIN_EMAILS = ['verbovsky13@yandex.ru', 'artemverbovsky793@gmail.com'];

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password, name });
      // Автоматический вход после регистрации
      localStorage.setItem('token', res.data.token);
      const me = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      if (ADMIN_EMAILS.includes(me.data.user.email)) {
        navigate('/admin');
      } else {
        navigate('/records');
      }
    } catch (err) {
      setError('Ошибка регистрации. Возможно, email уже используется.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom>Регистрация</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Имя" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Зарегистрироваться</Button>
        </form>
        <Button component={Link} to="/login" fullWidth sx={{ mt: 2 }}>Уже есть аккаунт? Войти</Button>
      </Box>
    </Container>
  );
};

export default RegisterPage; 
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Stack, Paper } from '@mui/material';

const HomePage = () => (
  <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Paper elevation={6} sx={{ p: 6, width: '100%', textAlign: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)' }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: '#3f51b5' }}>
        Vellor
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 4, color: '#374151' }}>
        Онлайн-магазин виниловых пластинок
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#4b5563' }}>
        Покупайте, добавляйте и скачивайте любимые треки. Для администратора — отдельный вход.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button component={Link} to="/admin" variant="contained" color="secondary" size="large">
          Войти как админ
        </Button>
        <Button component={Link} to="/records" variant="contained" color="primary" size="large">
          Войти как пользователь
        </Button>
      </Stack>
    </Paper>
  </Container>
);

export default HomePage; 
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Avatar, Stack, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Link as MuiLink } from '@mui/material';

const DARK_BG = '#18181b';
const PEACH = '#ffe5d0';
const PEACH_ACCENT = '#ffbfae';
const PEACH_DARK = '#ff9776';

const ProfilePage = () => {
  // Заглушка пользователя
  const defaultUser = {
    name: 'Пользователь',
    email: 'user@example.com',
    about: 'Люблю музыку и винил!',
    avatar: '',
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: user.name, about: user.about });
  const [purchased, setPurchased] = useState(() => {
    const saved = localStorage.getItem('purchasedRecords');
    return saved ? JSON.parse(saved) : [];
  });
  // Получаем актуальные данные о купленных пластинках
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('records');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('purchasedRecords', JSON.stringify(purchased));
  }, [purchased]);

  // Слушаем localStorage на случай покупки с другой вкладки
  useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem('purchasedRecords');
      setPurchased(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleEditOpen = () => {
    setEditForm({ name: user.name, about: user.about });
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditSave = () => {
    setUser({ ...user, name: editForm.name, about: editForm.about });
    setEditOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: DARK_BG, py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, mt: 4, background: '#23232a', borderRadius: 4, border: `1.5px solid ${PEACH_ACCENT}` }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 64, height: 64, bgcolor: PEACH_DARK, color: '#fff' }}>{user.name[0]}</Avatar>
            <Box>
              <Typography variant="h5" sx={{ color: PEACH_DARK }}>{user.name}</Typography>
              <Typography color="text.secondary" sx={{ color: PEACH }}>{user.email}</Typography>
            </Box>
          </Stack>
          <Typography sx={{ mt: 2, color: PEACH }}>{user.about}</Typography>
          <Button variant="outlined" sx={{ mt: 2, borderColor: PEACH_DARK, color: PEACH_DARK, '&:hover': { borderColor: PEACH_ACCENT, background: PEACH_ACCENT, color: '#fff' } }} onClick={handleEditOpen}>Изменить профиль</Button>
          <Typography variant="h6" sx={{ mt: 4, mb: 1, color: PEACH_DARK }}>Купленные пластинки</Typography>
          {purchased.length === 0 ? (
            <Typography color="text.secondary" sx={{ color: PEACH }}>Вы ещё не покупали пластинки.</Typography>
          ) : (
            <ul>
              {purchased.map(r => {
                // Найти актуальную версию пластинки по id
                const actual = records.find(rec => rec.id === r.id) || r;
                const trackUrl = actual.trackUrl || `https://example.com/track${actual.id}.mp3`;
                return (
                  <li key={r.id}>
                    <Typography sx={{ display: 'inline', fontWeight: 500, color: PEACH }}>{actual.title}</Typography>{' '}
                    <Typography sx={{ display: 'inline', color: PEACH_ACCENT }}>({actual.artist})</Typography>
                    <MuiLink href={trackUrl} target="_blank" rel="noopener noreferrer" sx={{ ml: 2, color: PEACH_DARK, fontWeight: 600 }}>
                      Скачать
                    </MuiLink>
                  </li>
                );
              })}
            </ul>
          )}
          <Button variant="outlined" color="secondary" sx={{ mt: 3, borderColor: PEACH_DARK, color: PEACH_DARK, '&:hover': { borderColor: PEACH_ACCENT, background: PEACH_ACCENT, color: '#fff' } }} onClick={handleLogout}>Выйти</Button>
        </Paper>
        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ color: PEACH_DARK }}>Изменить профиль</DialogTitle>
          <DialogContent>
            <TextField label="Имя" name="name" value={editForm.name} onChange={handleEditChange} fullWidth sx={{ mb: 2, input: { color: PEACH } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="О себе" name="about" value={editForm.about} onChange={handleEditChange} fullWidth multiline rows={3} sx={{ input: { color: PEACH } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} sx={{ color: PEACH_DARK }}>Отмена</Button>
            <Button onClick={handleEditSave} variant="contained" sx={{ background: PEACH_DARK, color: '#fff', '&:hover': { background: PEACH_ACCENT } }}>Сохранить</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ProfilePage; 
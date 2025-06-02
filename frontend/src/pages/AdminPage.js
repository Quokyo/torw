import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar, IconButton, Tooltip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const PEACH_DARK = '#ff9776';
const PEACH_ACCENT = '#ffbfae';
const DARK_BG = '#18181b';

const AdminPage = () => {
  const defaultRecords = [
    { id: 1, title: 'Пластинка 1', artist: 'Исполнитель 1', year: 2020, genre: 'Рок', image: '', price: 1000 },
    { id: 2, title: 'Пластинка 2', artist: 'Исполнитель 2', year: 2021, genre: 'Джаз', image: '', price: 1200 }
  ];

  // Получаем актуальные данные из localStorage
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('records');
    return saved ? JSON.parse(saved) : defaultRecords;
  });
  const [open, setOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form, setForm] = useState({ title: '', artist: '', year: '', genre: '', price: '', image: '' });

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const handleOpen = (record = null) => {
    setEditRecord(record);
    setForm(record ? { ...record } : { title: '', artist: '', year: '', genre: '', price: '', image: '' });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (editRecord) {
      setRecords(records.map(r => r.id === editRecord.id ? { ...r, ...form } : r));
    } else {
      setRecords([{ id: Date.now(), ...form }, ...records]);
    }
    setOpen(false);
  };

  const handleDelete = id => {
    if (!window.confirm('Удалить пластинку?')) return;
    setRecords(records.filter(r => r.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>Админка: управление пластинками</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpen()} size="large" sx={{ background: PEACH_DARK, '&:hover': { background: PEACH_ACCENT } }}>
            Добавить пластинку
          </Button>
        </Stack>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2, background: '#23232a' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: DARK_BG }}>
                <TableCell sx={{ fontWeight: 700, color: PEACH_DARK }}>Обложка</TableCell>
                <TableCell sx={{ fontWeight: 700, color: PEACH_DARK }}>Название</TableCell>
                <TableCell sx={{ fontWeight: 700, color: PEACH_DARK }}>Исполнитель</TableCell>
                <TableCell sx={{ fontWeight: 700, color: PEACH_DARK }}>Год</TableCell>
                <TableCell sx={{ fontWeight: 700, color: PEACH_DARK }}>Жанр</TableCell>
                <TableCell sx={{ fontWeight: 700, color: PEACH_DARK }}>Цена</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: PEACH_DARK }}>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map(r => (
                <TableRow key={r.id} hover sx={{ background: '#23232a' }}>
                  <TableCell>
                    <Avatar variant="rounded" src={r.image} alt={r.title} sx={{ width: 56, height: 56, bgcolor: PEACH_ACCENT, color: DARK_BG }}>
                      {r.title?.[0] || '?'}
                    </Avatar>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: '#fff' }}>{r.title}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{r.artist}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{r.year}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{r.genre}</TableCell>
                  <TableCell sx={{ color: PEACH_DARK }}>{r.price} ₽</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Редактировать">
                      <IconButton onClick={() => handleOpen(r)} sx={{ color: PEACH_DARK }}><EditIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton onClick={() => handleDelete(r.id)} sx={{ color: PEACH_DARK }}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: PEACH_DARK }}>{editRecord ? 'Редактировать' : 'Добавить'} пластинку</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Название" name="title" value={form.title} onChange={handleChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
              <TextField label="Исполнитель" name="artist" value={form.artist} onChange={handleChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
              <TextField label="Год" name="year" value={form.year} onChange={handleChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
              <TextField label="Жанр" name="genre" value={form.genre} onChange={handleChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
              <TextField label="Цена" name="price" value={form.price} onChange={handleChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
              <TextField label="Картинка (URL)" name="image" value={form.image} onChange={handleChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: PEACH_DARK }}>Отмена</Button>
            <Button onClick={handleSave} variant="contained" sx={{ background: PEACH_DARK, color: '#fff', '&:hover': { background: PEACH_ACCENT } }}>Сохранить</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminPage; 
import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';

const DARK_BG = '#18181b';
const PEACH = '#ffe5d0';
const PEACH_ACCENT = '#ffbfae';
const PEACH_DARK = '#ff9776';

const RecordsPage = () => {
  // Заглушка списка пластинок
  const defaultRecords = [
    { id: 1, title: 'Пластинка 1', artist: 'Исполнитель 1', year: 2020, genre: 'Рок', image: '', price: 1000 },
    { id: 2, title: 'Пластинка 2', artist: 'Исполнитель 2', year: 2021, genre: 'Джаз', image: '', price: 1200 }
  ];

  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem('records');
    return savedRecords ? JSON.parse(savedRecords) : defaultRecords;
  });
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', artist: '', year: '', genre: '', price: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const handleEditOpen = (record) => {
    setEditForm({ title: record.title, artist: record.artist, year: record.year, genre: record.genre, price: record.price, image: record.image });
    setEditingId(record.id);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditSave = () => {
    setRecords(records.map(r => r.id === editingId ? { ...r, ...editForm } : r));
    setEditOpen(false);
  };

  const handleBuyClick = (record) => {
    setSelectedRecord(record);
    setPaymentOpen(true);
  };
  const handlePaymentClose = () => setPaymentOpen(false);
  const handlePaymentChange = e => setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  const handlePaymentSubmit = () => {
    if (selectedRecord) {
      const prev = localStorage.getItem('purchasedRecords');
      let purchased = prev ? JSON.parse(prev) : [];
      if (!purchased.some(r => r.id === selectedRecord.id)) {
        // Найти актуальную версию пластинки по id
        const allRecords = localStorage.getItem('records');
        let actual = selectedRecord;
        if (allRecords) {
          const arr = JSON.parse(allRecords);
          const found = arr.find(r => r.id === selectedRecord.id);
          if (found) actual = found;
        }
        // Если нет ссылки на трек — добавить фейковую
        const recordToSave = { ...actual };
        if (!recordToSave.trackUrl) {
          recordToSave.trackUrl = `https://example.com/track${recordToSave.id}.mp3`;
        }
        purchased.push(recordToSave);
        localStorage.setItem('purchasedRecords', JSON.stringify(purchased));
      }
    }
    alert('Оплата прошла успешно! Заказ добавлен в профиль.');
    handlePaymentClose();
  };

  return (
    <Box sx={{ minHeight: '100vh', background: DARK_BG, py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ color: PEACH_DARK, fontWeight: 700 }}>Список пластинок</Typography>
          <Grid container spacing={3}>
            {records.map(r => (
              <Grid item xs={12} sm={6} md={4} key={r.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, background: '#23232a', borderRadius: 4, border: `1.5px solid ${PEACH_ACCENT}` }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={r.image || 'https://via.placeholder.com/300x180?text=Vinyl'}
                    alt={r.title}
                    sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: PEACH_DARK }}>{r.title}</Typography>
                    <Typography color="text.secondary" sx={{ color: PEACH }}> {r.artist}</Typography>
                    <Typography sx={{ mt: 1, color: PEACH }}>Год: {r.year}</Typography>
                    <Typography sx={{ color: PEACH }}>Жанр: {r.genre}</Typography>
                    <Typography sx={{ mt: 1, fontWeight: 500, color: PEACH_DARK }}>Цена: {r.price} ₽</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, pt: 0 }}>
                    <Button variant="contained" sx={{ background: PEACH_DARK, color: '#fff', '&:hover': { background: PEACH_ACCENT } }} onClick={() => handleBuyClick(r)}>Купить</Button>
                    <Button variant="outlined" sx={{ borderColor: PEACH_DARK, color: PEACH_DARK, '&:hover': { borderColor: PEACH_ACCENT, background: PEACH_ACCENT, color: '#fff' } }} onClick={() => handleEditOpen(r)}>Редактировать</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ color: PEACH_DARK }}>Редактировать пластинку</DialogTitle>
          <DialogContent>
            <TextField label="Название" name="title" value={editForm.title} onChange={handleEditChange} fullWidth sx={{ mb: 2, input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="Исполнитель" name="artist" value={editForm.artist} onChange={handleEditChange} fullWidth sx={{ mb: 2, input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="Год" name="year" value={editForm.year} onChange={handleEditChange} fullWidth sx={{ mb: 2, input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="Жанр" name="genre" value={editForm.genre} onChange={handleEditChange} fullWidth sx={{ mb: 2, input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="Цена" name="price" value={editForm.price} onChange={handleEditChange} fullWidth sx={{ mb: 2, input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="Картинка (URL)" name="image" value={editForm.image} onChange={handleEditChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} sx={{ color: PEACH_DARK }}>Отмена</Button>
            <Button onClick={handleEditSave} variant="contained" sx={{ background: PEACH_DARK, color: '#fff', '&:hover': { background: PEACH_ACCENT } }}>Сохранить</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={paymentOpen} onClose={handlePaymentClose} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ color: PEACH_DARK }}>Оплата</DialogTitle>
          <DialogContent>
            <TextField label="Номер карты" name="cardNumber" value={paymentForm.cardNumber} onChange={handlePaymentChange} fullWidth sx={{ mb: 2, input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="Срок действия" name="expiryDate" value={paymentForm.expiryDate} onChange={handlePaymentChange} fullWidth sx={{ mb: 2, input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
            <TextField label="CVV" name="cvv" value={paymentForm.cvv} onChange={handlePaymentChange} fullWidth sx={{ input: { color: '#222' } }} InputLabelProps={{ style: { color: PEACH_ACCENT } }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePaymentClose} sx={{ color: PEACH_DARK }}>Отмена</Button>
            <Button onClick={handlePaymentSubmit} variant="contained" sx={{ background: PEACH_DARK, color: '#fff', '&:hover': { background: PEACH_ACCENT } }}>Оплатить</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default RecordsPage; 
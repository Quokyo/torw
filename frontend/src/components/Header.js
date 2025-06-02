import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PEACH_DARK = '#ff9776';
const DARK_HEADER = '#23232a';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const isAdminPage = location.pathname === '/admin';
  const isHomePage = location.pathname === '/';
  const isProfilePage = location.pathname === '/profile';
  const isRecordsPage = location.pathname === '/records';

  return (
    <AppBar position="static" elevation={1} sx={{ mb: 3, background: DARK_HEADER }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff', fontWeight: 700 }} component={Link} to="/" style={{ textDecoration: 'none' }}>
          Vellor
        </Typography>
        {!isHomePage && (
          <Box>
            {isAdminPage ? (
              <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} onClick={handleLogout}>Выйти</Button>
            ) : isProfilePage ? (
              <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} onClick={handleLogout}>Выйти</Button>
            ) : isRecordsPage ? (
              <>
                <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} component={Link} to="/profile">Профиль</Button>
                <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} onClick={handleLogout}>Выйти</Button>
              </>
            ) : (
              <>
                <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} component={Link} to="/records">Пластинки</Button>
                <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} component={Link} to="/profile">Профиль</Button>
                <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} component={Link} to="/admin">Админка</Button>
                <Button sx={{ color: PEACH_DARK, borderColor: PEACH_DARK, '&:hover': { color: '#fff', background: PEACH_DARK } }} onClick={handleLogout}>Выйти</Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 
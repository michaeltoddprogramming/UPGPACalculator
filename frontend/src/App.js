import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Container,
  Fade
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CalculateIcon from '@mui/icons-material/Calculate';

import Home from "./pages/Home";
import About from "./pages/About"; 
import Contact from "./pages/Contact";
import DontClickMe from "./pages/DontClickMe";
import { initGA, logPageView } from './analytics';

const NotFound = () => (
  <Box sx={{ textAlign: 'center', mt: 8 }}>
    <Typography variant="h1">404</Typography>
    <Typography variant="h4">Page Not Found</Typography>
  </Box>
);

const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:800px)');
  const location = useLocation();

  // Initialize Google Analytics
  useEffect(() => {
    initGA();
  }, []);

  // Log page view when location changes
  useEffect(() => {
    logPageView();
  }, [location]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0'
      },
      secondary: {
        main: '#dc004e',
        light: '#ff4081',
        dark: '#c51162'
      },
      background: {
        default: darkMode ? '#121212' : '#fafafa',
        paper: darkMode ? '#1e1e1e' : '#ffffff'
      }
    },
    transitions: {
      duration: {
        enteringScreen: 400,
        leavingScreen: 300
      }
    },
    components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
              backgroundColor: darkMode 
                ? 'rgba(0, 0, 0, 0.85)'
                : 'rgba(255, 255, 255, 0.95)',
              color: darkMode ? '#fff' : '#1976d2'
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              color: darkMode ? '#fff' : '#1976d2'
            }
          }
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: darkMode ? '#fff' : '#1976d2'
            }
          }
        }
      }
  });

  const navItems = [
    { title: 'GPA Calculator', path: '/' },
    // { title: 'Past Papers', path: '/papers' },
    // { title: 'About', path: '/about' },
    // { title: 'Contact', path: '/contact' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiToolbar-root': {
              color: darkMode ? '#fff' : '#1976d2'
            }
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2, display: { sm: 'none' } }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>

            <CalculateIcon sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.1rem'
              }}
            >
              GPA Calculator
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  sx={{
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease-in-out'
                    },
                    fontSize: '1rem',
                    borderBottom: location.pathname === item.path ? '2px solid' : 'none'
                  }}
                  href={item.path}
                >
                  {item.title}
                </Button>
              ))}
            </Box>

            <IconButton 
              sx={{ 
                ml: 1,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'rotate(180deg)' }
              }} 
              onClick={() => setDarkMode(!darkMode)} 
              color="inherit"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <Box sx={{ width: 240 }}>
            <List>
              {navItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => setMobileOpen(false)}
                    component="a"
                    href={item.path}
                    selected={location.pathname === item.path}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Other routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <footer style={{ marginTop: '2rem', padding: '1rem 0', borderTop: '1px solid #eaeaea' }}>
            <Typography variant="body2" color="textSecondary" align="center">
              © {new Date().getFullYear()} GPA Calculator for South African Universities
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Created by <a href="https://github.com/michaeltoddprogramming">Michael Todd</a>
            </Typography>
          </footer>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
};

export default App;
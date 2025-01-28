import React from 'react';
import { jwtDecode } from "jwt-decode";
import { 
  Container,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button, 
  Box
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Navbar from '../components/Navbar';

const UserProfile: React.FC = () => {
  const token = localStorage.getItem('token');
  let userId: string = '';
  let userName: string = 'Guest';
  let userEmail: string = '';

  if (token) {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.userId || '';
    userName = decodedToken.userName || 'Guest';
    userEmail = decodedToken.email || '';
  }

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          borderRadius: 4,
          background: 'linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mb: 4 
          }}>
            <Avatar sx={{ 
              width: 100, 
              height: 100, 
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: '2.5rem'
            }}>
              {getInitials(userName)}
            </Avatar>
            
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
              fontWeight: 700,
              color: 'text.primary'
            }}>
              {userName}
            </Typography>
          </Box>

          <List sx={{ width: '100%' }}>
            <ListItem sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary="User ID" 
                secondary={userId}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>

            <ListItem sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary="Email Address" 
                secondary={userEmail}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          </List>

          <Box sx={{ 
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 2
          }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ModeEditIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 20,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default UserProfile;
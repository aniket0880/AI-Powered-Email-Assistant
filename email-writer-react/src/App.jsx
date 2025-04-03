import { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Card, CardContent, CardActions, Snackbar, Alert, Fade } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8081/api/email/generate', {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
      setOpenSnackbar(true);
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to right, #1e3c72, #2a5298)', pb: 6 }}>
      
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#1b2838' }}>
        <Toolbar>
          <EmailIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Email Reply Generator
          </Typography>
          <Button color="inherit" startIcon={<HomeIcon />}>Home</Button>
          <Button color="inherit" startIcon={<InfoIcon />}>About</Button>
          <Button color="inherit" startIcon={<ContactMailIcon />}>Contact Us</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="white" sx={{ fontWeight: 'bold', mb: 4 }}>
            ✨ Generate Smart Email Replies Instantly
          </Typography>
        </Fade>

        <Fade in={true} timeout={1500}>
          <Card sx={{ p: 4, mb: 4, boxShadow: 5, borderRadius: 3, backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant='outlined'
                label="Original Email Content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                sx={{ mb: 3, backgroundColor: 'white', borderRadius: 1 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Tone (Optional)</InputLabel>
                <Select
                  value={tone}
                  label="Tone (Optional)"
                  onChange={(e) => setTone(e.target.value)}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                </Select>
              </FormControl>

              <CardActions>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!emailContent || loading}
                  fullWidth
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    transition: '0.3s',
                    '&:hover': { backgroundColor: '#1565c0' }
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : '🚀 Generate Reply'}
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Fade>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {generatedReply && (
          <Fade in={true} timeout={1500}>
            <Card sx={{ p: 4, boxShadow: 5, borderRadius: 3, backgroundColor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant='h6' gutterBottom color="primary">
                  ✅ Generated Reply:
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant='outlined'
                  value={generatedReply}
                  inputProps={{ readOnly: true }}
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
              </CardContent>

              <CardActions>
                <Button
                  variant='outlined'
                  color='primary'
                  startIcon={<ContentCopyIcon />}
                  onClick={() => navigator.clipboard.writeText(generatedReply)}
                  sx={{
                    transition: '0.3s',
                    '&:hover': { backgroundColor: '#4caf50', color: 'white' }
                  }}
                >
                  Copy to Clipboard
                </Button>
              </CardActions>
            </Card>
          </Fade>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            🎉 Reply generated successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default App;

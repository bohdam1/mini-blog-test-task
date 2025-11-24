import { useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) return setError('Title and text required');
    try {
      await api.post('/posts', { title, text });
      navigate('/posts');
    } catch {
      setError('Failed to create post');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Create Post</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          label="Text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary">Create</Button>
      </Box>
    </Container>
  );
};

export default CreatePost;

import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress, Alert, Select, MenuItem } from '@mui/material';
import Post from '../components/Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // desc = новіші зверху
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch {
      setError('Delete failed');
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === 'asc') return new Date(a.createdAt) - new Date(b.createdAt);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4">My Posts</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <MenuItem value="desc">Newest First</MenuItem>
            <MenuItem value="asc">Oldest First</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={() => navigate('/create')}>
            Create Post
          </Button>
        </Box>
      </Box>

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!loading && sortedPosts.length === 0 && <Typography>No posts yet.</Typography>}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {sortedPosts.map(post => (
          <Post key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </Box>
    </Container>
  );
};

export default Posts;

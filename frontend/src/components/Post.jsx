import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Post = ({ post, onDelete }) => {
  return (
    <Card sx={{ mb: 2, flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{post.title}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>{post.text}</Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(post.createdAt).toLocaleString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton color="error" onClick={() => onDelete(post._id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;

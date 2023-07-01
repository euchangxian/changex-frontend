import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";

const formatDate = dateString => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  const formattedTime = new Date(dateString).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${formattedDate}, ${formattedTime}`;
};

const postStyle = {
  maxWidth: 600,
  margin: "0 auto",
  marginTop: 20,
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
};
export default function Posts({ post }) {
  return (
    <Box style={postStyle}>
      <Card key={post._id} variant="outlined">
        <CardHeader
          title={
            <div style={headerStyle}>
              <Avatar />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                {post.username}
              </Typography>
            </div>
          }
        />
        <CardContent>
          <Typography variant="body1">{post.body}</Typography>
          <Typography variant="caption" color="textSecondary">
            Date: {formatDate(post.date)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
} from "@mui/material";
import axios from "../apis/axios";

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
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmitReply = async (e) => {
    const username = (await axios.get("/user")).data;
    await axios
      .post("/addreply", {
        date: new Date(),
        username: username,
        postId: post._id,
        body: inputValue,
      })
      .then((res) => {
        setInputValue("");
        console.log(res);
      });
  };

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
          <TextField
            id="reply-input"
            multiline
            rows={3}
            placeholder="Reply ..."
            variant="filled"
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitReply}
          >
            Reply
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

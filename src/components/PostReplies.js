import { useState, useEffect } from "react";
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

export default function PostReplies({ postId, formatDate }) {
  const [replies, setReplies] = useState([]);
  const fetchReplies = async () => {
    axios.get(`/getreplies/${postId}`).then((result) => {
      setReplies(result.data);
      console.log(result.data);
    });
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const renderBodyText = (body) => {
    const lines = body.split("\n");
    return lines.map((line, index) => (
      <Typography key={index} variant="body1" component="span">
        {line}
        <br />
      </Typography>
    ));
  };

  return (
    <CardContent>
      {replies.map((reply) => (
        <Box key={reply._id} marginBottom={2}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar />
            <Typography variant="body1" style={{ marginLeft: 10 }}>
              {reply.username}
            </Typography>
          </div>
          {renderBodyText(reply.body)}
          <Typography variant="caption" color="textSecondary">
            Date: {formatDate(reply.date)}
          </Typography>
        </Box>
      ))}
    </CardContent>
  );
}

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../apis/axios";

export default function FriendsList({ refreshFriendsList }) {
  const [friendsList, setFriendsList] = useState([]);

  const fetchFriendsList = async () => {
    await axios.get("getfriendslist").then((result) => {
      setFriendsList(result.data);
    });
  };

  useEffect(() => {
    fetchFriendsList();
  }, [refreshFriendsList]);

  const renderFriendsList = friendsList.map((friend) => {
    return (
      <>
        <ListItem key={friend._id}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={friend.username} />
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
    <>
    <Typography variant="h4" color="black">Followed users</Typography>
    <List
      sx={{
        width: "100%",
        backgroundColor: "paleblue",
      }}
    >
      {renderFriendsList}
    </List>
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "../apis/axios";
import {
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

export default function FriendsList() {
  const [friendsList, setFriendsList] = useState([]);

  const fetchFriendsList = async () => {
    await axios.get("getfriendslist").then(result => {
      setFriendsList(result.data);
    });
  };

  useEffect(() => {
    fetchFriendsList();
  }, []);

  const renderFriendsList = friendsList.map(friend => {
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
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      subheader={
        <ListSubheader
          component="div"
          id="list-header"
          sx={{ fontSize: "28px", color: "black" }}
        >
          Your Friends
        </ListSubheader>
      }
    >
      {renderFriendsList}
    </List>
  );
}

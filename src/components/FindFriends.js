import { Add, Search } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../apis/axios";

const toastConfig = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function FindFriends({ triggerRefreshFriendsList }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState();

  const fetchUser = async () => {
    console.log("Fetching user...");
    await axios.get("/user").then((res) => {
      setUsername(res.data);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users
    .filter((user) => user.username.toLowerCase().includes(searchTerm))
    .slice(0, 6);

  const handleAddFriend = async (friendId) => {
    const isFriend = await axios.get(`/checkfriend/${friendId}`);
    if (isFriend.data === true) {
      toast.info("You are already following this user!");
      return;
    }
    axios
      .post("/addfriend", {
        friendId: friendId,
      })
      .then((res) => {
        toast.success("🦄 Successfully followed user!", toastConfig);
        triggerRefreshFriendsList();
        console.log(res);
      });
  };

  const displayedUsers = filteredUsers
    .filter((user) => user.username !== username) // Exclude user with matching username
    .map((user) => (
      <div key={user._id}>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={user.username} />
          <IconButton
            aria-label="follow user"
            onClick={() => handleAddFriend(user._id)}
          >
            <Add />
          </IconButton>
        </ListItem>
        <Divider />
      </div>
    ));

  return (
    <>
      <Typography variant="h4" color="black">
        Follow users
      </Typography>
      <List
        sx={{
          width: "100%",
          backgroundColor: "paleblue",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <TextField
            type="text"
            placeholder="Search by username"
            onChange={handleSearch}
            fullWidth
          />
          <IconButton>
            <Search />
          </IconButton>
        </div>
        {displayedUsers}
      </List>
    </>
  );
}

import { Add, Search } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  TextField,
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

export default function FindFriends() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
    const [username, setUsername] = useState();

  const fetchUser = async () => {
    console.log("Fetching user...");
    await axios.get(
      "/user"
    ).then(res => {
      setUsername(res.data);
    });
  }

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
    .slice(0, 5);

  const handleAddFriend = async (friendId) => {
    const isFriend = await axios.get(`/checkfriend/${friendId}`);
    if (isFriend.data === true) {
      toast.info("You are already friends!");
      return;
    }
    axios
      .post("/addfriend", {
        friendId: friendId,
      })
      .then((res) => {
        toast.success("🦄 Successfully added friend!", toastConfig);
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
          aria-label="add friend"
          onClick={() => handleAddFriend(user._id)}
        >
          <Add />
        </IconButton>
      </ListItem>
    </div>
  ));

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
          Add Friends
        </ListSubheader>
      }
    >
      <div style={{ display: "flex", alignItems: "center", width: "90%" }}>
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
  );
}

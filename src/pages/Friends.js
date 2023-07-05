import { useState } from "react";
import FindFriends from "../components/FindFriends";
import FriendsList from "../components/FriendsList";
import { Box, Container } from "@mui/material";

export default function Friends() {
  const [refreshFriendsList, setRefreshFriendsList] = useState(false);

  const handleRefreshFriendsList = () => {
    setRefreshFriendsList((prevState) => !prevState);
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex">
        <Box className="componentContainer" style={{ flex: "50%" }}>
          <FriendsList refreshFriendsList={refreshFriendsList} />
        </Box>
        <Box className="componentContainer" style={{ flex: "50%" }}>
          <FindFriends triggerRefreshFriendsList={handleRefreshFriendsList} />
        </Box>
      </Box>
    </Container>
  );
}

import FindFriends from "../components/FindFriends";
import FriendsList from "../components/FriendsList";
import { Box, Container } from "@mui/material";

export default function Friends() {
  return (
    <Container maxWidth="lg">
      <Box display="flex">
        <FriendsList />
        <FindFriends />
      </Box>
    </Container>
  );
}

import { Box, Drawer, SwipeableDrawer, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";
import { Home, BarChart, Flag, People, Chat } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const isDrawerOpen = props.isDrawerOpen;
  const handleDrawerToggle = props.handleDrawerToggle;
  const drawerWidth = props.drawerWidth;

  // list of components to display in the drawer
  const list = (
    <Box p={2} width="250px" textAlign="center" role="presentation">
      <Typography variant="h6" component="div">
        ChangeX
      </Typography>
      <Divider variant="middle" />
      <List component="nav">
        {/* Each list item button is a link to another page */}
        <ListItemButton component={Link} to="">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="analysis">
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Analysis" />
        </ListItemButton>
        <Divider variant="middle" />
        <ListItemButton component={Link} to="friends">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItemButton>
        <ListItemButton component={Link} to="feed">
          <ListItemIcon>
            <Chat />
          </ListItemIcon>
          <ListItemText primary="Feed" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <SwipeableDrawer
        variant="temporary"
        open={isDrawerOpen}
        onOpen={handleDrawerToggle}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {list}
      </SwipeableDrawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {list}
      </Drawer>
    </Box>
  );
}

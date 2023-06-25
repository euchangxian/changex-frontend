import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* The TopBar and NavBar are always rendered */}
        <CssBaseline />
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
        >
          <NavBar
            isDrawerOpen={isDrawerOpen}
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <TopBar
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />
          <Box
            sx={{
              paddingTop: (theme) => theme.spacing(8),
              paddingBottom: (theme) => theme.spacing(2),
              overflowY: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

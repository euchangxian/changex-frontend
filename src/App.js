import Auth from "./pages/Auth";
import ChangeX from "./pages/ChangeX";
import Analysis from "./pages/Analysis";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Friends from "./pages/Friends";
import Feed from "./pages/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-sg";
import { Box } from "@mui/material";
import './App.styles.css';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-sg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>
          <Route path="/changex" element={<ChangeX />}>
            <Route
              path="/changex"
              element={
                <Box className="box-container">
                  <Home />
                </Box>
              }
            />
            <Route
              path="/changex/analysis"
              element={
                <Box className="box-container">
                  <Analysis />
                </Box>
              }
            />
            <Route
              path="/changex/friends"
              element={
                <Box className="box-container">
                  <Friends />
                </Box>
              }
            />
            <Route
              path="/changex/feed"
              element={
                <Box className="box-container">
                  <Feed />
                </Box>
              }
            />
          </Route>
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

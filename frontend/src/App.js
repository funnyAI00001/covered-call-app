import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";

import Register from "./pages/register";
import Login from "./pages/login";
import DrawerAppBar from "./components/layout/navbar";
import Dashboard from "./pages/dashboard";
import Expiration from "./pages/expiration";
import Footer from "./components/layout/footer";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routes/privateRoute";
import ThemeProvider from "./theme/ThemeProvider";
import Scrollbars from "react-custom-scrollbars-2";
import About from "./pages/about";
import { jwtDecode } from "jwt-decode";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/authActions";
import { logOut } from "./actions/authActions";

const App = () => {
  const dispatch = useDispatch();

  if (localStorage.token) {
    const decoded = jwtDecode(localStorage.token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // auto logout
      localStorage.removeItem("token");
      setAuthToken(false);
      dispatch(logOut);
    } else {
      setAuthToken(localStorage.token);
      dispatch(loadUser());
    }
  }

  return (
    <Router>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Scrollbars>
            <DrawerAppBar />
            <Container
              maxWidth="1536"
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Navigate to="dashboard" />}
                ></Route>
                <Route exact path="/register" element={<Register />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route
                  exact
                  path="/dashboard"
                  element={<PrivateRoute component={Dashboard} />}
                ></Route>
                <Route
                  exact
                  path="/expiration"
                  element={<PrivateRoute component={Expiration} />}
                ></Route>
              </Routes>
            </Container>
            <Footer />
          </Scrollbars>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;

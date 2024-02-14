import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  CssBaseline,
  Paper,
  Box,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { registerUser } from "../actions/authActions";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Call Option "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const Register = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    dispatch(registerUser(newUser, history));
  };

  return (
    <Grid component="main">
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={3}
        margin="auto"
        maxWidth="500px"
        elevation={6}
        square
        component={Paper}
        borderRadius={1}
      >
        <Box
          sx={{
            mt: 13,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
              sx={{
                marginTop: 2,
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="outlined"
              fullWidth
              color="primary"
              sx={{ marginTop: 2, fontSize: 20 }}
            >
              Register
            </Button>
            <Divider />
            <Typography
              variant="body1"
              color="white"
              textAlign="center"
              my={2}
            >
              Already have an account? <Link to="/login">Log In</Link>
            </Typography>
          </form>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;

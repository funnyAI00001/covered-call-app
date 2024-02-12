import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { useMediaQuery } from "@mui/material";
// import { Avatar } from "@mui/material";

// import { getInitials } from "../../utils/usefulFuncs";
import AccountPopover from "../account/accountPopover";

const drawerWidth = 240;
let navItems = [];

function DrawerAppBar(props) {
  if (props.isAuthenticated) {
    navItems = ["What is COVERD?"];
  } else {
    navItems = [];
  }

  const { window } = props;
  // const { user } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  // Set different image sizes based on screen size
  const imageStyle = {
    width: isLg ? "3vw" : isMd ? "4vw" : "5vw",
    marginRight: "1vw",
  };

  const popoverOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // To display whether client is offline or not
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    document.addEventListener("offline", handleOffline);
    document.addEventListener("online", handleOnline);

    return () => {
      document.removeEventListener("offline", handleOffline);
      document.removeEventListener("online", handleOnline);
    };
  }, []);
  //

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <i>Coverd</i>
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item, index) => ( */}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink
              to="https://coverd.io"
              style={{ textDecoration: "none", color: "inherit" }}
              target="_blank"
            >
              <ListItemText primary="What is COVERD?" />
            </NavLink>
          </ListItemButton>
        </ListItem>

        {/* ))} */}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box display={props.isAuthenticated ? "flex" : "none"}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="static"
        sx={{ color: "white", padding: 2 }}
      >
        <Toolbar sx={{ position: "relative", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/dashboard">
            <img
              src="/logo.png"
              alt="logo"
              style={imageStyle}
            />
          </Link>

          <Typography
            variant="h6"
            component="div"
            color="white"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <a
              href="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              <i>COVERD</i>
            </a>
          </Typography>
          <Typography
            variant="h5"
            color="red"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {isOffline && (
              <Box
                display="flex"
                alignItems="center"
                sx={{ backgroundColor: "#444", padding: 1 }}
              >
                <WarningIcon sx={{ marginRight: 1 }} />
                You are currently offline!
              </Box>
            )}
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" }, gap: 2 }}>
            {/* <Button
              color="primary"
              sx={{
                marginRight: 2,
                border: "none",
                color: "white",
              }}
            >
              <EditCalendarIcon sx={{ marginRight: 0.5 }} />
              <Typography variant="h6" fontSize={17}>
                <NavLink
                  to="/expiration"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Expiration
                </NavLink>
              </Typography>
            </Button> */}
            <Button
              color="primary"
              sx={{
                marginRight: 2,
                border: "none",
                color: "white",
              }}
            >
              <InfoIcon sx={{ marginRight: 0.5 }} />
              <Typography variant="h6" fontSize={17}>
                <NavLink
                  to="https://coverd.io"
                  style={{ textDecoration: "none", color: "inherit" }}
                  target="_blank"
                >
                  What is COVERD?
                </NavLink>
              </Typography>
            </Button>
          </Box>
          {/* <Avatar
            src={user && user.avatar}
            sx={{ width: 35, height: 35, cursor: "pointer" }}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            {getInitials(user.name)}
          </Avatar> */}
          <AccountPopover
            open={popoverOpen}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorEl={anchorEl}
            PaperProps={{ sx: { width: 200 } }}
            closePopover={() => {
              setAnchorEl(null);
            }}
          />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(DrawerAppBar);

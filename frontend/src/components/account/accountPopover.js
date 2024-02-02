import React from "react";
import { Popover, Box, Typography } from "@mui/material";
import { connect } from "react-redux";
import { Divider } from "@mui/material";
import { MenuList, MenuItem } from "@mui/material";
import { logOut } from "../../actions/authActions";
import setAuthToken from "../../utils/setAuthToken";
import { useNavigate } from "react-router-dom";

const AccountPopover = (props) => {
  const { open, onClose, anchorEl, user, closePopover, logOut } = props;
  const history = useNavigate();

  const onLogout = () => {
    if (localStorage.token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    setAuthToken(false);
    closePopover();
    logOut(history);
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box p={1} textAlign='center'>
        <Typography variant="h6" fontWeight={500}>
          {user ? user.name : ""}
        </Typography>
      </Box>
      <Divider />
      <MenuList>
        <MenuItem onClick={onLogout} sx={{ fontSize: 13, justifyContent: 'center', padding: 1 }}>Log out</MenuItem>
      </MenuList>
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: (history) => dispatch(logOut(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPopover);

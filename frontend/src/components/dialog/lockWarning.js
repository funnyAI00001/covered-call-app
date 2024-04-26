import React from "react";
import { Dialog, DialogContent, useMediaQuery } from "@mui/material";
import "@fontsource/roboto";

const LockWarning = ({ open, onClose }) => {
  const isSmScreen = useMediaQuery("(min-width:600px)");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          alignItems: "center",
          fontSize: isSmScreen ? 20 : 14,
          backgroundColor: "background.default",
          paddingRight: isSmScreen ? 6 : 4,
          paddingLeft: isSmScreen ? 6 : 4,
          paddingBottom: 1,
          paddingTop: 1,
          border: "solid 3px",
          borderColor: "text.third",
          borderRadius: 0.9,
          maxWidth: 550,
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <p>
          Unlocked for Premium Users! <br></br>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LockWarning;

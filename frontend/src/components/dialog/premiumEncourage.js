import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import "@fontsource/roboto";

const PremiumEncourage = ({ open, onClose }) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery("(min-width:600px)");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      style={{ padding: isSmScreen ? 6 : 2 }}
    >
      <DialogContent
        sx={{
          alignItems: "center",
          fontSize: isSmScreen ? 20 : 14,
          // color: "white",
          backgroundColor: "background.default",
          paddingRight: isSmScreen ? 6 : 4,
          paddingLeft: isSmScreen ? 6 : 4,
          paddingBottom: isSmScreen ? 5 : 3,
          border: "solid 4px",
          borderColor: "text.third",
          borderRadius: 0.9,
          maxWidth: 550,
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <p style={{ marginTop: 0 }}>
          <u
            style={{
              textAlign: "center",
              fontSize: isSmScreen ? 25 : 20,
              fontWeight: 600,
              color: theme.palette.text.third,
            }}
          >
            Go Premium:
          </u>
        </p>
        <p>
          <b style={{ color: theme.palette.text.third }}>Shortlists:</b>{" "}
          <br></br>
          Track and compare up to 10 symbols per list <br></br>
        </p>

        <p>
          <b style={{ color: theme.palette.text.third }}>Filter to Find:</b>{" "}
          <br></br>
          Choose expiry dates and %OTM to suit your personal strategies
        </p>
        <p>
          <b style={{ color: theme.palette.text.third }}>Enhanced Analysis:</b>{" "}
          <br></br>
          Consistently select the right trade, with enhanced confidence{" "}
        </p>
        <p>
          Go Premium: cos why not? <br></br>
          <u>
            <b style={{ color: "white" }}>Don't leave profits on the table!</b>{" "}
          </u>{" "}
        </p>
        <Box sx={{ textAlign: "center" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              window.open("https://premium.coverd.io/", "_blank");
            }}
            sx={{
              textTransform: "none",
              textAlign: "center",
              margin: "auto",
              background: theme.palette.text.third,
              color: "white",
              borderRadius: "5px",
              fontSize: isSmScreen ? 20 : 14,
              marginTop: isSmScreen ? 2 : 1,
              "&:hover": {
                background: theme.palette.text.third,
                border: "solid 1px white",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumEncourage;

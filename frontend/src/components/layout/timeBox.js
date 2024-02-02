import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

const TimeBox = ({ text }) => {
  const theme = useTheme();

  return (
    <Box
      justifyContent="center"
      sx={{
        border: `1px solid ${theme.palette.primary.light}`,
        borderLeft: "0px !important",
        borderRight: "0px !important",
        height: 280,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography textAlign="center" justifyContent="center" variant="h5">
        {text}
      </Typography>
    </Box>
  );
};

export default TimeBox;

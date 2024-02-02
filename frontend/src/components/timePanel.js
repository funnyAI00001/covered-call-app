import React from "react";
import { Box, Typography } from "@mui/material";
import { TimeIcon } from "@mui/x-date-pickers";
import TimeBox from "./layout/timeBox";
// import { timeTexts } from "../utils/texts";
import { useTheme } from "@emotion/react";
import { getTimeTexts } from "../utils/usefulFuncs";

const TimePanel = () => {
  const theme = useTheme();
  const timeTexts = getTimeTexts();

  return (
    <Box>
      <Box
        backgroundColor={theme.header.background}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          border: `${theme.palette.primary.light} solid 1px`,
          borderLeft: "0px",
          borderRight: "0px",
        }}
        padding={2}
      >
        <TimeIcon sx={{ verticalAlign: "bottom" }} />
        <strong>&nbsp;Time </strong>
      </Box>
      <Box
        sx={{
          color: "secondary",
          borderBottom: `1px solid ${theme.palette.primary.light}`,
          borderLeft: "0px",
        }}
      >
        <Box
          sx={{
            border: `1px solid ${theme.palette.primary.light}`,
            borderTop: `1px solid ${theme.palette.primary.light} !important`,
            borderLeft: `0px !important`,
            borderRight: `0px !important`,
            height: 280,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography textAlign="center" variant="h5">
            {/* 8:00 AM */}
            {timeTexts.shift()}
          </Typography>
        </Box>
        {/* {timeTexts.map((text, index) => ( */}
        {timeTexts.map((text, index) => (
          <TimeBox text={text} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default TimePanel;

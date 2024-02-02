import React from "react";
import { Box, Grid } from "@mui/material";
import { connect } from "react-redux";
import StadiumIcon from "@mui/icons-material/Stadium";

const globalSearchbarResultItemForPlayerSchedule = ({ data, index }) => {
  return (
    <>
      <Box
        fontSize={18}
        sx={{
          "&:hover": {
            cursor: "pointer",
            background: "grey",
          },
        }}
      >
        <Grid
          container
          p={0.5}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={1}>
            {index + 1}
          </Grid>
          <Grid item xs={3}>
            {new Date(data.date).getMonth() + 1}/{new Date(data.date).getDate()}
          </Grid>
          <Grid item xs={4} textAlign={"start"} pl={2}>
            {data.player}
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            <StadiumIcon
              sx={{
                marginRight: 0.5,
              }}
            />
            {data.time} {data.court}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  players: state.players.players,
});

export default connect(mapStateToProps)(
  globalSearchbarResultItemForPlayerSchedule
);

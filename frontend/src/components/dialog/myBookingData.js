import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import DatasetIcon from "@mui/icons-material/Dataset";
import { DataGrid } from "@mui/x-data-grid";

function MyBookingDataDialog({
  open,
  onClose,
  title,
  bookingDataOfSelectedPlayer,
}) {
  const [todayData, setTodayData] = useState([]);
  const [tmrwData, setTmrwData] = useState([]);

  const columns = [
    {
      field: "start_time",
      headerName: "Time",
      width: 200,
      editable: false,
    },
    {
      field: "court_name",
      headerName: "Court",
      width: 150,
      editable: false,
    },
  ];

  useEffect(() => {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month
    var day = today.getDate();

    // const todayString =
    //   year +
    //   "-" +
    //   (month < 10 ? "0" : "") +
    //   month +
    //   "-" +
    //   (day < 10 ? "0" : "") +
    //   day;
    var data1 = bookingDataOfSelectedPlayer.filter(
      // (data) => data.start_time.substring(0, 10) === todayString
      (data) =>
        new Date(data.start_time).getFullYear() === year &&
        new Date(data.start_time).getMonth() + 1 === month &&
        new Date(data.start_time).getDate() === day
    );

    data1 = data1.map((obj, index) => {
      const newDate = new Date(obj.start_time);
      const hour = newDate.getHours().toString().padStart(2, "0");
      const min = newDate.getMinutes().toString().padStart(2, "0");
      const time = hour + ":" + min;
      // return { ...obj, id: index + 1, start_time: obj.start_time.substring(11, 19) };
      return { ...obj, id: index + 1, start_time: time };
    });

    var tomorrowDate = new Date(today.getTime() + 86400000);

    // Extract components of tomorrow's date
    year = tomorrowDate.getFullYear();
    month = tomorrowDate.getMonth() + 1; // Add 1 to get the correct month
    day = tomorrowDate.getDate();

    var data2 = bookingDataOfSelectedPlayer.filter(
      (data) =>
        new Date(data.start_time).getFullYear() === year &&
        new Date(data.start_time).getMonth() + 1 === month &&
        new Date(data.start_time).getDate() === day
    );

    data2 = data2.map((obj, index) => {
      const newDate = new Date(obj.start_time);
      const hour = newDate.getHours().toString().padStart(2, "0");
      const min = newDate.getMinutes().toString().padStart(2, "0");
      const time = hour + ":" + min;
      return { ...obj, id: index + 1, start_time: time };
    });
    setTodayData(data1);
    setTmrwData(data2);
  }, [bookingDataOfSelectedPlayer]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle textAlign="center" marginTop={1.2}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <DatasetIcon sx={{ marginRight: 1 }} />{" "}
          <Typography variant="h4" color="initial">
            {title}
          </Typography>
          <DatasetIcon sx={{ marginLeft: 1 }} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Scrollbars autoHeight autoHeightMax={500}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="initial"
                textAlign="center"
                marginBottom={1}
              >
                Today
              </Typography>
              <DataGrid
                rows={todayData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  height: 370,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h6"
                color="initial"
                textAlign="center"
                marginBottom={1}
              >
                Tomorrow
              </Typography>
              <DataGrid
                rows={tmrwData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  height: 370,
                }}
              />
            </Grid>
          </Grid>
        </Scrollbars>
      </DialogContent>
      <DialogActions sx={{ marginRight: 1.8, marginBottom: 1.5 }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MyBookingDataDialog;

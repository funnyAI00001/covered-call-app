import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid } from "@mui/material";
import SearchBar from "../searchBar";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Pagination } from "@mui/material";
import { connect } from "react-redux";

import { changeCurrentPage } from "../../actions/pageAction";
import { setBookingDate } from "../../actions/bookingAction";

const Topbar = ({ changeCurrentPage, currentPage, setBookingDate }) => {
  const handlePageChange = (event, page) => {
    changeCurrentPage(page);
    const baseUrl = window.location.href.split("?")[0];
    // Append the new page query parameter
    const newUrl = `${baseUrl}?page=${page}`;
    // Redirect to the new URL
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const [date, setDate] = useState(dayjs());
  const [today, setToday] = useState(true);

  const changeToday = (event) => {
    setToday(event.target.checked);

    if (event.target.checked) {
      setDate((value) => value.add(-1, "day"));
    } else {
      setDate((value) => value.add(1, "day"));
    }
  };

  useEffect(() => {
    setBookingDate(date.format("YYYY-MM-DDT00:00:00"));
  }, [date, setBookingDate]);

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      maxWidth="xl"
      textAlign="center"
      my={3}
    >
      <Grid item xs={12} sm={6} lg={3} justifyContent="center">
        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={7}>
        <SearchBar />
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={today} onChange={changeToday} name="today" />
              }
              label={today ? "Today" : "Tomorrow"}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} lg={12} mt={2}>
        <Pagination
          page={currentPage}
          count={6}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
  setBookingDate: (date) => dispatch(setBookingDate(date)),
});

const mapStateToProps = (state) => ({
  currentPage: state.page.currentPage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);

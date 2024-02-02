import {
  Box,
  Button,
  Typography,
  Grid,
  MenuItem,
  TextField,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorldFlag from "react-country-flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { alpha3ToAlph2 } from "../../utils/countryCode";
import { updateBook } from "../../actions/bookingAction";
import { currentPageToCourts } from "../../utils/currentPageToCourts";
import { colorScale } from "../../utils/gradientColor";
import { bookingOptionTexts } from "../../utils/texts";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ChipsWithCloseButton from "../chipsWithCloseButton";
import CustomAlert from "../customAlert";
import ImageCard from "../imageCard";
import LoadingOverlay from "./loadingOverlay";
// import GlobalSearchbarResultItem from "../searchBar/globalSearchbarResultItem";
// import Scrollbars from "react-custom-scrollbars-2";
import imageUrlFromPlayerName from "../../utils/usefulFuncs";
import MyBookingDataDialog from "./myBookingData";

const EditDialog = ({
  open,
  close,
  data,
  updateBook,
  players,
  currentPage,
  booking_date,
  total_booking_data,
}) => {
  const withCommonIconStyle = (WrappedComponent) => (props) =>
    (
      <WrappedComponent
        {...props}
        sx={{ marginRight: 1, verticalAlign: "text-bottom" }}
      />
    );

  const CheckCircleWithStyle = withCommonIconStyle(CheckCircleIcon);

  const [timeLength, setTimeLength] = useState(2);
  const [warmupCheckedCount, setWarmupCheckedCount] = useState(0);
  const [chip, setChip] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("test");
  const [maxPlayersCountWarning, setMaxPlayersCountWarning] = useState(false);
  const [noSelectWarning, setNoSelectWarning] = useState(false);
  const [bExistingUser, setExistingUser] = useState(false);
  const [balls, setBalls] = useState([]);
  const [warmups, setWarmups] = useState([]);
  const [selectedPlayerData, setSelectedPlayerData] = useState({});
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [bookingDataOfSelectedPlayer, setBookingDataOfSelectedPlayer] =
    useState([]);
  const [openMyBookingDataDialog, setOpenMyBookingDataDialog] = useState(false);

  const flatOptionProps = {
    options: bookingOptionTexts,
  };

  useEffect(() => {
    if (players.length > 0) {
      if (data.hasOwnProperty("players")) {
        setChip(data.players);
        setTimeLength(data.time_slot);
        setSelectedOption(data.option);
        setWarmups(data.warmups);
        setBalls(data.balls);
        setSelectedPlayer(data.players[0]);

        const index = players.findIndex(
          (player) => player.name === data.players[0]
        );
        setSelectedPlayerData(players[index]);
        setImage(imageUrlFromPlayerName(players[index].name));
      }
    }
  }, [players, data]);

  // Get booking data of selected player
  useEffect(() => {
    if (selectedPlayer === "test") {
      setBookingDataOfSelectedPlayer([]);
    } else {
      const filteredArray = total_booking_data.filter((subData) =>
        subData.players.some((player) =>
          player.toLowerCase().includes(selectedPlayer.toLowerCase())
        )
      );
      setBookingDataOfSelectedPlayer(filteredArray.reverse());
    }
  }, [selectedPlayer, total_booking_data]);

  const flatProps = {
    options: players.map((option) => option.name),
  };

  const onSave = () => {
    let reservation_type = "Practice";
    const warmupCount = warmups.filter((one) => one === true).length;

    if (warmupCount > 0) {
      reservation_type = "Warm Up";
    }

    const { displayedCourtNames } = currentPageToCourts(currentPage);
    const dat = {
      id: data._id,
      time_slot: timeLength,
      players: chip,
      reservation_type: reservation_type,
      court_names: displayedCourtNames,
      date: booking_date,
      balls: balls,
      warmups: warmups,
      option: selectedOption,
    };

    setIsSaving(true);
    updateBook(dat, updateSuccess);
  };

  const handleWarmupCheck = (value) => {
    if (value === true) {
      setWarmupCheckedCount(warmupCheckedCount + 1);
    } else {
      setWarmupCheckedCount(warmupCheckedCount - 1);
    }
  };

  const onChangeTimeLength = (event) => {
    setTimeLength(event.target.value);
  };

  const handleDeleteChip = (chipToDelete) => {
    const chipIndex = chip.findIndex((one) => one === chipToDelete);

    setChip(chip.filter((one) => one !== chipToDelete));

    setWarmups((warmups) => {
      const newWarmups = [...warmups];
      newWarmups.splice(chipIndex, 1);

      return newWarmups;
    });
  };

  const onClose = () => {
    setWarmups(data.warmups); // set warmups again as initial because the user might open edit_dialog again
    setChip(data.players);
    setAlertOpen(false);
    close();
  };

  const updateSuccess = () => {
    setIsSaving(false);
    setAlertOpen(true);

    setTimeout(() => {
      setAlertOpen(false);
      onClose();
    }, 2000);
  };

  const onChangePlayer = (event, newValue) => {
    if (newValue === null) {
      return;
    }

    setSelectedPlayer(newValue);
    const playerData = players.find((player) => player.name === newValue);

    setSelectedPlayerData(playerData);
    setImage(imageUrlFromPlayerName(playerData.name));
  };

  const addPlayer = () => {
    if (selectedPlayer === "") {
      setNoSelectWarning(true);

      setTimeout(() => {
        setNoSelectWarning(false);
      }, 2000);
      return;
    } else if (chip.length >= 4) {
      setMaxPlayersCountWarning(true);

      setTimeout(() => {
        setMaxPlayersCountWarning(false);
      }, 2000);
      return;
    }

    const bFound = chip.find((name) => name === selectedPlayer);

    if (!bFound) {
      setChip([...chip, selectedPlayer]);
      setWarmups([...warmups, false]);
    } else {
      setExistingUser(true);

      setTimeout(() => {
        setExistingUser(false);
      }, 2000);
    }
  };

  const onOptionChange = (event, value) => {
    setSelectedOption(value);
  };

  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      {isSaving && <LoadingOverlay text="Saving..." color="success" />}
      <CustomAlert
        openState={alertOpen}
        text="The reservation has been updated successfully !"
        severity="success"
      />
      <CustomAlert
        openState={maxPlayersCountWarning}
        text="You can book 4 players at max !"
        severity="warning"
      />
      <CustomAlert
        openState={noSelectWarning}
        text="You must select one player at least !"
        severity="warning"
      />
      <CustomAlert
        openState={bExistingUser}
        text="The player already exists !"
        severity="warning"
      />
      <DialogTitle
        fontWeight={600}
        variant="h6"
        marginTop={1}
        textAlign="center"
        style={{
          padding: 0,
          marginBottom: "0px !important",
        }}
      >
        <EditNoteIcon sx={{ verticalAlign: "text-bottom", marginRight: 1 }} />
        <span style={{ fontSize: 25 }}>Edit Reservation</span>
        <EditNoteIcon sx={{ verticalAlign: "text-bottom", marginLeft: 1 }} />
      </DialogTitle>
      {/* <Scrollbars autoHeight autoHeightMin={450}> */}
      <DialogContent style={{ paddingBottom: 0 }}>
        <Grid container color="primary.info" spacing={2}>
          <Grid item xs={7}>
            <Stack spacing={1}>
              <Autocomplete
                {...flatProps}
                value={selectedPlayer}
                onChange={onChangePlayer}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField {...params} label="Players" variant="standard" />
                )}
              />
            </Stack>
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  marginTop={3}
                  variant="h6"
                  alignItems="center"
                  color={colorScale[0]}
                >
                  <CheckCircleIcon
                    sx={{ marginRight: 1, verticalAlign: "text-bottom" }}
                  />
                  {selectedPlayer}
                </Typography>
                <Typography
                  marginTop={2}
                  marginBottom={2}
                  alignItems="center"
                  variant="h6"
                  color={colorScale[1]}
                >
                  <CheckCircleWithStyle />
                  Seeded: {selectedPlayerData.tournament_seed}
                </Typography>
                <Typography
                  component={"span"}
                  variant="h6"
                  style={{ marginRight: 30 }}
                  color={colorScale[2]}
                >
                  <CheckCircleWithStyle />
                  {selectedPlayerData.natl}
                </Typography>
                <WorldFlag
                  countryCode={alpha3ToAlph2[selectedPlayerData.natl]}
                  svg
                  style={{ width: "3em", height: "3em" }}
                />
                <br />
                <Typography variant="h6" marginTop={1} color={colorScale[3]}>
                  <CheckCircleWithStyle />
                  Handiness:{" "}
                  {selectedPlayerData.right_handed ? "Right" : "Left"} <br />
                </Typography>
                <Typography variant="h6" marginTop={2} color={colorScale[4]}>
                  <CheckCircleWithStyle />
                  Status: {selectedPlayerData.status}
                </Typography>
                <Typography variant="h6" marginTop={2} color={colorScale[5]}>
                  <CheckCircleWithStyle />
                  {selectedPlayerData.singles_in ? "Singles In" : "Singles Out"}
                </Typography>
                <Typography variant="h6" marginTop={2} color={colorScale[6]}>
                  <CheckCircleWithStyle />
                  {selectedPlayerData.doubles_in ? "Doubles In" : "Doubles Out"}
                </Typography>
                {/* <img
                    src={"/images/" + selectedPlayerData.atp_wta + ".png"}
                    style={{ width: 100, marginTop: 30, minWidth: 120 }}
                    alt={selectedPlayerData.atp_wta}
                  />{" "}
                  <br></br> */}
              </Grid>
              <Grid
                item
                xs={5}
                textAlign="center"
                paddingTop={2}
                paddingLeft={2}
              >
                <ImageCard
                  image_Url={image}
                  title={selectedPlayer}
                  style={{ marginTop: 1 }}
                />
              </Grid>
              <Grid
                item
                xs={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ paddingLeft: "22px !important" }}
                marginTop={3}
              >
                {/* <div style={{ maxHeight: 500 }}>
                      {bookingDataOfSelectedPlayer.map((item, index) => (
                        <GlobalSearchbarResultItem
                          data={item}
                          index={index}
                          key={index}
                          clickable={false}
                        />
                      ))}
                    </div> */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addPlayer}
                  sx={{
                    marginBottom: 2,
                    paddingTop: 1.8,
                    paddingBottom: 1.8,
                  }}
                  fullWidth
                >
                  <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
                  Add Player
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenMyBookingDataDialog(true);
                  }}
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    paddingTop: 1.8,
                    paddingBottom: 1.8,
                  }}
                  fullWidth
                >
                  <VisibilityIcon sx={{ marginRight: 1 }} />
                  View Books
                </Button>
                <MyBookingDataDialog
                  open={openMyBookingDataDialog}
                  bookingDataOfSelectedPlayer={bookingDataOfSelectedPlayer}
                  onClose={() => {
                    setOpenMyBookingDataDialog(false);
                  }}
                  title="Booking Schedule"
                />
              </Grid>
            </Grid>
            <br />
          </Grid>
          <Grid item xs={5}>
            <Box
              sx={{
                borderRadius: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                marginTop: 3,
              }}
            >
              <fieldset
                style={{ border: "1px solid grey", borderRadius: "10px" }}
              >
                <legend>Settings</legend>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="flex-end"
                >
                  <FormControl variant="filled" sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Reservation Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      value={timeLength}
                      onChange={onChangeTimeLength}
                      label="timeLength"
                    >
                      <MenuItem value={2}>1 hr</MenuItem>
                      <MenuItem value={1}>30 mins</MenuItem>
                      <MenuItem value={4}>2 hrs</MenuItem>
                    </Select>
                  </FormControl>
                  <Stack spacing={1} sx={{ width: "50%" }}>
                    <Autocomplete
                      {...flatOptionProps}
                      value={selectedOption}
                      onChange={onOptionChange}
                      isOptionEqualToValue={(option, value) => {
                        return option.value === value.value;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Options"
                          variant="standard"
                        />
                      )}
                    />
                  </Stack>
                </Box>
              </fieldset>

              <fieldset
                style={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                  minHeight: "230px",
                  marginTop: "20px",
                }}
              >
                <legend>Selected Players</legend>
                <ChipsWithCloseButton
                  chip={chip}
                  handleDeleteChip={handleDeleteChip}
                  handleWarmupCheck={handleWarmupCheck}
                  ball={true}
                  setParentBalls={setBalls}
                  setParentWarmups={setWarmups}
                  parentWarmups={warmups}
                  parentBalls={balls}
                  onChangePlayer={onChangePlayer}
                />
              </fieldset>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      {/* </Scrollbars> */}
      <DialogActions sx={{ paddingRight: 2.7, paddingBottom: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ marginRight: 1.2 }}>
          Close
        </Button>
        <Button onClick={onSave} variant="outlined">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateBook: (data, callback) => dispatch(updateBook(data, callback)),
});

const mapStateToProps = (state) => ({
  currentPage: state.page.currentPage,
  booking_date: state.booking.booking_date,
  total_booking_data: state.booking.total_booking_data,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);

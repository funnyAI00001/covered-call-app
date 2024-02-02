import { Box, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import Scrollbars from "react-custom-scrollbars-2";

import { updateSearchingPlayer } from "../actions/playerActions";
import GlobalSearchbarResultItem from "./searchBar/globalSearchbarResultItem";
import GlobalSearchbarResultItemForPlayerSchedule from "./searchBar/globalSearchbarResultItemForPlayerSchedule";

const SearchBar = ({
  updateSearchingPlayer,
  total_booking_data,
  playerSchedule,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  const handleChange = (event) => {
    const { value } = event.target;
    updateSearchingPlayer(value);
    setSearchTerm(value);
  };

  const [filteredData, setFilteredData] = useState(total_booking_data);
  const [filteredPlayerSchedule, setFilteredPlayerSchedule] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      const filteredArray = total_booking_data.filter((subData) =>
        subData.players.some((player) =>
          player.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filteredArray.reverse());
    }
  }, [total_booking_data, searchTerm]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPlayerSchedule([]);
    } else {
      if (playerSchedule.length > 0) {
        const filteredArray = playerSchedule.filter((item) =>
          item.player.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredPlayerSchedule(filteredArray);
      }
    }
  }, [searchTerm, playerSchedule]);

  return (
    <Box>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        sx={{
          marginTop: 1,
          width: "70%",
        }}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {filteredData.length > 0 && (
        <Box
          backgroundColor={theme.palette.background.default}
          marginLeft="8.5%"
          width="41%"
          position="absolute"
          zIndex={10}
          borderRadius={1}
          color="white"
          border="solid 1px grey"
          maxHeight={400}
          overflow="auto"
        >
          <Scrollbars autoHeightMax={300} autoHeight autoHide>
            {filteredData.map((item, index) => (
              <GlobalSearchbarResultItem
                data={item}
                index={index}
                key={index}
                clickable={true}
              />
            ))}
            {filteredPlayerSchedule.map((item, index) => (
              <GlobalSearchbarResultItemForPlayerSchedule
                data={item}
                index={index + filteredData.length}
                key={index}
              />
            ))}
          </Scrollbars>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  total_booking_data: state.booking.total_booking_data,
  playerSchedule: state.players.playerSchedule,
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchingPlayer: (name) => dispatch(updateSearchingPlayer(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

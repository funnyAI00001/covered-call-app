import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

const ChipsWithCloseButton = ({
  chip,
  handleDeleteChip,
  ball,
  setParentBalls,
  setParentWarmups,
  parentWarmups,
  parentBalls,
  onChangePlayer,
}) => {
  const [chips, setChips] = useState(chip);
  const [balls, setBalls] = useState([false, false, false, false]);
  const [warmups, setWarmups] = useState([false, false, false, false]);

  const handleChange = (event, index) => {
    const newWarmups = [...warmups];
    newWarmups[index] = event.target.checked;

    setWarmups(newWarmups);
    setParentWarmups(newWarmups);
  };

  const handleBallChange = (event, index) => {
    const newBalls = [...balls];
    newBalls[index] = event.target.checked;

    setBalls(newBalls);
    setParentBalls(newBalls);
  };

  useEffect(() => {
    setChips(chip);
    setWarmups(parentWarmups);
    // eslint-disable-next-line
  }, [chip, parentWarmups]);

  useEffect(() => {
    setBalls(parentBalls);
  }, [parentBalls]);

  const onDelete = (chipToDelete) => () => {
    handleDeleteChip(chipToDelete);
  };

  return (
    <div>
      {chips.map((chip, index) => (
        <Box key={index}>
          <Chip
            label={chip}
            onDelete={onDelete(chip)}
            color="primary"
            variant="filled"
            style={{ margin: "7px" }}
            onClick={() => {
              onChangePlayer(null, chip);
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => {
                  handleChange(event, index);
                }}
                checked={!!warmups[index]}
              />
            }
            label="Warm Up"
          />
          {ball ? (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => {
                    handleBallChange(event, index);
                  }}
                  checked={balls[index]}
                />
              }
              label="Ball"
            />
          ) : (
            <></>
          )}
        </Box>
      ))}
    </div>
  );
};

export default ChipsWithCloseButton;

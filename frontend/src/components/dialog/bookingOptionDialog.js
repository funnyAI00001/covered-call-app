import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormControlLabel } from "@mui/material";

import { bookingOptionTexts } from "../../utils/texts";

const BookingOptionDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Booking Options</DialogTitle>
      <DialogContent sx={{ display: "flex", alignItems: "center" }}>
        <Stack>
          {bookingOptionTexts.map((text, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={text}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
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
};

export default BookingOptionDialog;

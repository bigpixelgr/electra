import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
} from "@mui/material";

const Step1 = ({ formData, handleChange, handleNext }) => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>
        Book your Transfer!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Pickup Location"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
          >
            <MenuItem value="Rhodes Airport">Rhodes Airport</MenuItem>
            <MenuItem value="Electra Palace Hotel">
              Electra Palace Hotel
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label="Pickup Date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Pickup Time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
          >
            {[...Array(24).keys()].map((hour) =>
              ["00", "10", "20", "30", "40", "50"].map((min) => (
                <MenuItem key={`${hour}:${min}`} value={`${hour}:${min}`}>
                  {hour.toString().padStart(2, "0")}:{min}
                </MenuItem>
              ))
            )}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Luggage Pieces"
            name="luggage"
            value={formData.luggage}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            fullWidth
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;

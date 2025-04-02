import React from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";

const Step2 = ({ formData, handleChange, handleBack }) => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>
        Booking Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Flight Number"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.addChildSeats}
                onChange={handleChange}
                name="addChildSeats"
              />
            }
            label="Add child seats"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.addNotesForDriver}
                onChange={handleChange}
                name="addNotesForDriver"
              />
            }
            label="Add notes for the driver"
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            fullWidth
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;

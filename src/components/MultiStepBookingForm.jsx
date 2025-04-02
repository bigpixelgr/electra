import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { Container, Paper, Box } from "@mui/material";

const MultiStepBookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    passengers: 1,
    luggage: 1,
    fullName: "",
    email: "",
    phone: "",
    flightNumber: "",
    addChildSeats: false,
    infantCarrier: 0,
    childSeat: 0,
    booster: 0,
    addNotesForDriver: false,
    driverNotes: "",
    bulkyLuggage: false,
    wheelchairAccessible: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
          {step === 1 && (
            <Step1
              formData={formData}
              handleChange={handleChange}
              handleNext={nextStep}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              handleChange={handleChange}
              handleBack={prevStep}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default MultiStepBookingForm;

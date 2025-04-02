import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  sendBookingConfirmationEmail,
  sendAdminNotificationEmail,
} from "./emailService";

// Function to generate time slots every 10 minutes
const generateTimeSlots = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 10) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinutes}`);
    }
  }
  return times;
};

const timeOptions = generateTimeSlots();

const BookingForm = () => {
  const [formData, setFormData] = useState({
    tripType: "one-way",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
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

  const handlePickupChange = (e) => {
    const pickup = e.target.value;
    let dropoff = "";

    if (pickup === "Rhodes Airport") {
      dropoff = "Electra Palace Hotel";
    } else if (pickup === "Electra Palace Hotel") {
      dropoff = "Rhodes Airport";
    }

    setFormData({
      ...formData,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
    });
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNumberChange = (name, delta) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Math.max(0, prev[name] + delta),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "bookings"), formData);
      console.log("Booking confirmed with ID:", docRef.id);

      await sendBookingConfirmationEmail(
        formData.email,
        formData.fullName,
        formData
      );
      await sendAdminNotificationEmail(formData);

      alert(`Booking confirmed! ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error saving booking: ", error);
      alert("Failed to save booking. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Your Transfer</h2>

      <label>Trip Type:</label>
      <div>
        <label>
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={formData.tripType === "one-way"}
            onChange={handleChange}
          />
          One-Way
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={formData.tripType === "round-trip"}
            onChange={handleChange}
          />
          Round-Trip
        </label>
      </div>

      <label>Pickup Location:</label>
      <select name="pickupLocation" onChange={handlePickupChange} required>
        <option value="">Select Pickup Location</option>
        <option value="Rhodes Airport">Rhodes Airport</option>
        <option value="Electra Palace Hotel">Electra Palace Hotel</option>
      </select>

      <label>Dropoff Location:</label>
      <input
        type="text"
        name="dropoffLocation"
        value={formData.dropoffLocation}
        readOnly
      />

      <label>Pickup Date:</label>
      <input
        type="date"
        name="pickupDate"
        value={formData.pickupDate}
        onChange={handleChange}
        required
        min={
          new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
        }
      />

      <label>Pickup Time:</label>
      <select
        name="pickupTime"
        value={formData.pickupTime}
        onChange={handleChange}
        required
      >
        <option value="">Select Pickup Time</option>
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      {formData.tripType === "round-trip" && (
        <>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            min={
              formData.pickupDate
                ? new Date(
                    new Date(formData.pickupDate).getTime() +
                      24 * 60 * 60 * 1000
                  )
                    .toISOString()
                    .split("T")[0]
                : new Date(Date.now() + 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
            }
          />

          <label>Return Time:</label>
          <select
            name="returnTime"
            value={formData.returnTime}
            onChange={handleChange}
          >
            <option value="">Select Return Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </>
      )}

      <label>Passengers:</label>
      <input
        type="number"
        name="passengers"
        min="1"
        value={formData.passengers}
        onChange={handleChange}
        required
      />

      <label>Luggage:</label>
      <input
        type="number"
        name="luggage"
        min="0"
        value={formData.luggage}
        onChange={handleChange}
        required
      />

      <label>Full Name:</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Phone:</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label>Flight Number:</label>
      <input
        type="text"
        name="flightNumber"
        value={formData.flightNumber}
        onChange={handleChange}
        required
      />

      <label>
        <input
          type="checkbox"
          name="addChildSeats"
          checked={formData.addChildSeats}
          onChange={handleChange}
        />
        Add child seats (optional)
      </label>

      {formData.addChildSeats && (
        <>
          <label>Infant Carrier (0-6 months):</label>
          <button
            type="button"
            onClick={() => handleNumberChange("infantCarrier", -1)}
          >
            -
          </button>
          {formData.infantCarrier}
          <button
            type="button"
            onClick={() => handleNumberChange("infantCarrier", 1)}
          >
            +
          </button>

          <label>Child Seat (6 months - 3 years):</label>
          <button
            type="button"
            onClick={() => handleNumberChange("childSeat", -1)}
          >
            -
          </button>
          {formData.childSeat}
          <button
            type="button"
            onClick={() => handleNumberChange("childSeat", 1)}
          >
            +
          </button>

          <label>Booster (3-12 years):</label>
          <button
            type="button"
            onClick={() => handleNumberChange("booster", -1)}
          >
            -
          </button>
          {formData.booster}
          <button
            type="button"
            onClick={() => handleNumberChange("booster", 1)}
          >
            +
          </button>
        </>
      )}

      <label>
        <input
          type="checkbox"
          name="addNotesForDriver"
          checked={formData.addNotesForDriver}
          onChange={handleChange}
        />
        Add notes for the driver (optional)
      </label>

      {formData.addNotesForDriver && (
        <>
          <label>Notes:</label>
          <textarea
            name="driverNotes"
            value={formData.driverNotes}
            onChange={handleChange}
          ></textarea>

          <label>
            <input
              type="checkbox"
              name="bulkyLuggage"
              checked={formData.bulkyLuggage}
              onChange={handleChange}
            />
            Bulky luggage (optional)
          </label>

          <label>
            <input
              type="checkbox"
              name="wheelchairAccessible"
              checked={formData.wheelchairAccessible}
              onChange={handleChange}
            />
            Wheelchair accessible vehicle (optional)
          </label>
        </>
      )}

      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;

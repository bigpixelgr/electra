import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
    };

    fetchBookings();
  }, []);

  return (
    <Paper style={{ padding: 20, marginTop: 20 }}>
      <h2>Admin Dashboard - Bookings</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Full Name</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Phone</strong>
            </TableCell>
            <TableCell>
              <strong>Trip Type</strong>
            </TableCell>
            <TableCell>
              <strong>Pickup</strong>
            </TableCell>
            <TableCell>
              <strong>Dropoff</strong>
            </TableCell>
            <TableCell>
              <strong>Pickup Date</strong>
            </TableCell>
            <TableCell>
              <strong>Pickup Time</strong>
            </TableCell>
            <TableCell>
              <strong>Return Date</strong>
            </TableCell>
            <TableCell>
              <strong>Return Time</strong>
            </TableCell>
            <TableCell>
              <strong>Passengers</strong>
            </TableCell>
            <TableCell>
              <strong>Luggage</strong>
            </TableCell>
            <TableCell>
              <strong>Flight Number</strong>
            </TableCell>
            <TableCell>
              <strong>Child Seats</strong>
            </TableCell>
            <TableCell>
              <strong>Driver Notes</strong>
            </TableCell>
            <TableCell>
              <strong>Bulky Luggage</strong>
            </TableCell>
            <TableCell>
              <strong>Wheelchair Accessible</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.fullName}</TableCell>
              <TableCell>{booking.email}</TableCell>
              <TableCell>{booking.phone}</TableCell>
              <TableCell>{booking.tripType}</TableCell>
              <TableCell>{booking.pickupLocation}</TableCell>
              <TableCell>{booking.dropoffLocation}</TableCell>
              <TableCell>{booking.pickupDate}</TableCell>
              <TableCell>{booking.pickupTime}</TableCell>
              <TableCell>{booking.returnDate || "N/A"}</TableCell>
              <TableCell>{booking.returnTime || "N/A"}</TableCell>
              <TableCell>{booking.passengers}</TableCell>
              <TableCell>{booking.luggage}</TableCell>
              <TableCell>{booking.flightNumber}</TableCell>
              <TableCell>
                {booking.addChildSeats
                  ? `Infant: ${booking.infantCarrier}, Child: ${booking.childSeat}, Booster: ${booking.booster}`
                  : "None"}
              </TableCell>
              <TableCell>{booking.driverNotes || "N/A"}</TableCell>
              <TableCell>{booking.bulkyLuggage ? "Yes" : "No"}</TableCell>
              <TableCell>
                {booking.wheelchairAccessible ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AdminDashboard;

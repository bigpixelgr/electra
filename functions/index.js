const functions = require("firebase-functions");
const axios = require("axios");

exports.sendBookingEmails = functions
  .runWith({ secrets: ["BREVO_API_KEY"] })
  .https.onCall(async (data, context) => {
    const apiKey = process.env.BREVO_API_KEY;
    const SENDER_EMAIL = "info@prestige-travel.gr";
    const ADMIN_EMAIL = "support@bigpixel.gr";

    const { fullName, email, bookingDetails } = data;

    const htmlBody = (recipient) => `
      <h1>${
        recipient === "admin"
          ? "New Booking Alert"
          : `Thank you for your booking, ${fullName}!`
      }</h1>
      <p>${
        recipient === "admin"
          ? "A new booking has been received:"
          : "Here are your booking details:"
      }</p>

      <h3>Personal Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${fullName}</li>
        <li><strong>Email:</strong> ${bookingDetails.email}</li>
        <li><strong>Phone:</strong> ${bookingDetails.phone}</li>
      </ul>

      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Trip Type:</strong> ${bookingDetails.tripType}</li>
        <li><strong>Pickup:</strong> ${bookingDetails.pickupLocation}</li>
        <li><strong>Dropoff:</strong> ${bookingDetails.dropoffLocation}</li>
        <li><strong>Pickup Date:</strong> ${bookingDetails.pickupDate}</li>
        <li><strong>Pickup Time:</strong> ${bookingDetails.pickupTime}</li>
        ${
          bookingDetails.tripType === "round-trip"
            ? `<li><strong>Return Date:</strong> ${bookingDetails.returnDate}</li>
               <li><strong>Return Time:</strong> ${bookingDetails.returnTime}</li>`
            : ""
        }
        <li><strong>Passengers:</strong> ${bookingDetails.passengers}</li>
        <li><strong>Luggage:</strong> ${bookingDetails.luggage}</li>
        <li><strong>Flight Number:</strong> ${bookingDetails.flightNumber}</li>
      </ul>

      ${
        bookingDetails.addChildSeats
          ? `<h3>Child Seats:</h3>
            <ul>
              <li><strong>Infant Carrier:</strong> ${bookingDetails.infantCarrier}</li>
              <li><strong>Child Seat:</strong> ${bookingDetails.childSeat}</li>
              <li><strong>Booster:</strong> ${bookingDetails.booster}</li>
            </ul>`
          : ""
      }

      ${
        bookingDetails.addNotesForDriver
          ? `<h3>Driver Notes:</h3>
            <p>${bookingDetails.driverNotes || "No additional notes"}</p>
            <ul>
              <li><strong>Bulky Luggage:</strong> ${
                bookingDetails.bulkyLuggage ? "Yes" : "No"
              }</li>
              <li><strong>Wheelchair Accessible:</strong> ${
                bookingDetails.wheelchairAccessible ? "Yes" : "No"
              }</li>
            </ul>`
          : ""
      }

      <p>${
        recipient === "admin"
          ? "Check dashboard for more details."
          : "We look forward to serving you!"
      }</p>
    `;

    const recipients = [
      {
        email: email,
        name: fullName,
        subject: "Booking Confirmation",
        htmlContent: htmlBody("user"),
      },
      {
        email: ADMIN_EMAIL,
        name: "Admin",
        subject: "New Booking Received",
        htmlContent: htmlBody("admin"),
      },
    ];

    for (const recipient of recipients) {
      try {
        await axios.post(
          "https://api.brevo.com/v3/smtp/email",
          {
            sender: { name: "Booking System", email: SENDER_EMAIL },
            to: [{ email: recipient.email, name: recipient.name }],
            subject: recipient.subject,
            htmlContent: recipient.htmlContent,
          },
          {
            headers: {
              "api-key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.error(
          `Failed to send email to ${recipient.email}`,
          err.response?.data || err.message
        );
        throw new functions.https.HttpsError(
          "internal",
          "Email sending failed"
        );
      }
    }

    return { success: true };
  });

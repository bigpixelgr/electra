import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "./firebase"; // ή η σωστή διαδρομή στο δικό σου project

const functions = getFunctions(app);
const sendBookingEmails = httpsCallable(functions, "sendBookingEmails");

export const sendBookingConfirmationEmail = async (
  fullName,
  email,
  bookingDetails
) => {
  try {
    const result = await sendBookingEmails({ fullName, email, bookingDetails });
    return result.data;
  } catch (error) {
    console.error("Failed to send booking email:", error);
    throw error;
  }
};

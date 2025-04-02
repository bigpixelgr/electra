import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiStepBookingForm from "./components/BookingForm/MultiStepBookingForm";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div>
        <h1>Booking System</h1>
        <Routes>
          <Route path="/" element={<MultiStepBookingForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

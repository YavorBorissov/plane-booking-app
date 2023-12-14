import BookingsList from "../components/BookingsList";
import { memo } from "react";
import Form from "../components/Form";
import "./HomePage.scss";
import FindBooking from "../components/FindBooking";

const HomePage = () => {
  return (
    <div>
      <div className="bg-image">
        <h1>Book a flight</h1>
        <Form />
      </div>
      <div className="bookings">
        <div className="booking-list-container">
          <BookingsList />
        </div>
        <div className="find-booking-container">
          <FindBooking />
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);

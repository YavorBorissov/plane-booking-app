import BookingList from "../components/BookingList";
import { memo } from "react";
import Form from "../components/Form";

const HomePage = () => {
  return (
    <div>
      <h1>Plane Ticket Booking App</h1>
      <Form />
      <BookingList />
    </div>
  );
};

export default memo(HomePage);

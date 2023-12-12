import BookingList from "components/BookingList";
import Form from "components/Form";
import { memo } from "react";

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

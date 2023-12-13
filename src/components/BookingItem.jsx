import { memo } from "react";

const BookingItem = (props) => {
  return (
    <div className="booking-card">
      <h3>{`Booking ID: ${props.id}`}</h3>
      <p>{`Name: ${props.firstName} ${props.lastName}`}</p>
      <p>{`Departure Airport: ${props.departureAirport}`}</p>
      <p>{`Arrival Airport: ${props.arrivalAirport}`}</p>
      <p>{`Departure Date: ${new Date(props.departureDate).toDateString()}`}</p>
      <p>{`Return Date: ${new Date(props.returnDate).toDateString()}`}</p>
    </div>
  );
};

export default memo(BookingItem);

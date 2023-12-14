import { memo } from "react";
import "./DetailedBookingItem.scss";

const DetailedBookingItem = (props) => {
  return (
    <div className="booking-card-search">
      <div className="id-search">
        <h3>{`Booking ID: \n`}</h3>
        <h1>{props.id}</h1>
      </div>
      <div className="info-search">
        <p>
          <span>Departure airport: </span>
          <span className="bolded-info-search">{props.departureAirport}</span>
        </p>

        <p>
          <span>Arrival airport: </span>
          <span className="bolded-info-search">{props.arrivalAirport}</span>
        </p>

        <p>
          <span>Name: </span>
          <span className="bolded-info-search">{`${props.firstName} ${props.lastName}`}</span>
        </p>

        <p>
          <span>Departure Date: </span>
          <span className="bolded-info-search">
            {new Date(props.departureDate).toDateString()}
          </span>
        </p>

        <p>
          <span>Departure Date: </span>
          <span className="bolded-info-search">
            {new Date(props.returnDate).toDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(DetailedBookingItem);

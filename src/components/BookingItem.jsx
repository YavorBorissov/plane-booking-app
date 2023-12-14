import { memo } from "react";
import "./BookingItem.scss";
import DeleteIcon from "../icons/DeleteIcon";

const BookingItem = (props) => {
  return (
    <div className="booking-card">
      <div className="id">
        <h3>{`Booking ID: \n`}</h3>
        <h1>{props.id}</h1>
      </div>
      <div className="info">
        <div className="airports">
          <div>{props.departureAirport}</div>
          <div>➔</div>
          <div>{props.arrivalAirport}</div>
        </div>

        <div className="other-info">
          <p>
            <span>Name: </span>
            <span className="bolded-info">{`${props.firstName} ${props.lastName}`}</span>
          </p>

          <p>
            <span>Departure Date: </span>
            <span className="bolded-info">
              {new Date(props.departureDate).toDateString()}
            </span>
          </p>

          <p>
            <span>Departure Date: </span>
            <span className="bolded-info">
              {new Date(props.returnDate).toDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className="remove-button">
        <button className="remove" onClick={() => props.onRemove(props.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default memo(BookingItem);

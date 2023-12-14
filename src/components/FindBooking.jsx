import React, { memo, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooking } from "../actions/fetchBooking";
import { selectBookings, setBooking } from "../slices/bookingsSlice";
import "./FindBooking.scss";
import DetailedBookingItem from "./DetailedBookingItem";
import { findAirportNameById } from "../utils/findAirportNameById";
import { selectAirports } from "../slices/airportsSlice";
import SearchIcon from "../icons/SearchIcon";

const FindBooking = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(selectBookings);
  const airports = useSelector(selectAirports);
  const booking = useMemo(() => bookings.booking, [bookings.booking]);
  const [bookingId, setBookingId] = useState("");
  const [userHasSearched, setUserHasSearched] = useState(false);

  const handleInputChange = useCallback((e) => {
    setBookingId(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    setUserHasSearched(true);
    try {
      if (bookingId.trim() !== "") {
        dispatch(fetchBooking(bookingId));
      } else {
        dispatch(setBooking({}));
      }
    } catch (error) {
      console.error("Error fetching booking");
    }
  }, [bookingId, dispatch]);

  return (
    <div>
      <div className="bg-find-booking">
        <h1 className="find-booking-title">Find Booking</h1>
        <div className="search-container">
          <input
            type="text"
            id="bookingId"
            placeholder="Your ID"
            value={bookingId}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} className="searchButton">
            <SearchIcon />
          </button>
        </div>
        {Object.keys(booking).length === 0 || !booking ? (
          userHasSearched ? (
            <h3>Booking not found</h3>
          ) : (
            <h3>Bookings will appear here</h3>
          )
        ) : (
          <DetailedBookingItem
            id={booking.id}
            firstName={booking.firstName}
            lastName={booking.lastName}
            departureAirport={findAirportNameById(
              booking.departureAirportId,
              airports
            )}
            arrivalAirport={findAirportNameById(
              booking.arrivalAirportId,
              airports
            )}
            departureDate={booking.departureDate}
            returnDate={booking.returnDate}
            key={booking.id}
          />
        )}
      </div>
    </div>
  );
};

export default memo(FindBooking);

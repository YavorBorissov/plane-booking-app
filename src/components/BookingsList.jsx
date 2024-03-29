import React, { useEffect, useCallback, memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBookings,
  selectBookings,
  setPageIndex,
} from "../slices/bookingsSlice";
import { fetchBookings } from "../actions/fetchBookings";
import BookingItem from "./BookingItem";
import { selectAirports } from "../slices/airportsSlice";
import { debounce } from "../utils/debounce";
import { removeBooking } from "../actions/removeBooking";
import "./BookingsList.scss";
import { findAirportNameById } from "../utils/findAirportNameById";

const BookingsList = () => {
  const dispatch = useDispatch();
  const airports = useSelector(selectAirports);
  const bookings = useSelector(selectBookings);
  const totalCount = useMemo(() => bookings.totalCount, [bookings.totalCount]);
  const pageIndex = useMemo(() => bookings.pageIndex, [bookings.pageIndex]);
  const pageSize = useMemo(() => bookings.pageSize, [bookings.pageSize]);
  const shouldFetchBookings = useMemo(
    () => bookings.shouldFetchBookings,
    [bookings.shouldFetchBookings]
  );

  useEffect(() => {
    dispatch(fetchBookings({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize, shouldFetchBookings]);

  const handleScroll = debounce(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (
      scrollTop + windowHeight >= documentHeight - 100 &&
      pageIndex < totalCount / pageSize - 1
    ) {
      dispatch(setPageIndex(pageIndex + 1));
    }
  }, 10);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleRemoveBooking = useCallback(
    async (bookingId) => {
      try {
        await dispatch(removeBooking(bookingId));

        await dispatch(resetBookings());

        await dispatch(fetchBookings({ pageIndex, pageSize }));
      } catch (error) {
        console.error(`Error removing booking with ID ${bookingId}`, error);
      }
    },
    [dispatch, pageIndex, pageSize]
  );

  return (
    <div>
      <div className="bg-booking">
        <h1 className="booking-list-title">Bookings List</h1>
        {bookings?.bookings ? (
          bookings?.bookings?.map((b) => (
            <BookingItem
              id={b.id}
              firstName={b.firstName}
              lastName={b.lastName}
              departureAirport={findAirportNameById(
                b.departureAirportId,
                airports
              )}
              arrivalAirport={findAirportNameById(b.arrivalAirportId, airports)}
              departureDate={b.departureDate}
              returnDate={b.returnDate}
              onRemove={handleRemoveBooking}
              key={b.id}
            />
          ))
        ) : (
          <h3 className="no-bookings">No bookings</h3>
        )}
      </div>
    </div>
  );
};

export default memo(BookingsList);

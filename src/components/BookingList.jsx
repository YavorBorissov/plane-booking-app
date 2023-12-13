import React, { useEffect, useCallback, memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBookings, setPageIndex } from "../slices/bookingsSlice";
import { fetchBookings } from "../actions/fetchBookings";
import BookingItem from "./BookingItem";
import { selectAirports } from "../slices/airportsSlice";
import { debounce } from "../utils/debounce";

const BookingList = () => {
  const dispatch = useDispatch();
  const airports = useSelector(selectAirports);
  const bookings = useSelector(selectBookings);
  const totalCount = useMemo(() => bookings.totalCount, [bookings.totalCount]);
  const pageIndex = useMemo(() => bookings.pageIndex, [bookings.pageIndex]);
  const pageSize = useMemo(() => bookings.pageSize, [bookings.pageSize]);

  useEffect(() => {
    dispatch(fetchBookings({ pageIndex, pageSize }));
  }, [dispatch, pageIndex, pageSize]);

  const handleScroll = debounce(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (
      scrollTop + windowHeight >= documentHeight - 100 &&
      pageIndex < totalCount / pageSize
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

  const findAirportNameById = useCallback(
    (id) => airports.find((a) => a.id === id)?.title || "Unknown Airport",
    [airports]
  );

  return (
    <div>
      <h1>Booking List</h1>
      {bookings?.bookings?.map((b) => (
        <BookingItem
          id={b.id}
          firstName={b.firstName}
          lastName={b.lastName}
          departureAirport={findAirportNameById(b.departureAirportId)}
          arrivalAirport={findAirportNameById(b.arrivalAirportId)}
          departureDate={b.departureDate}
          returnDate={b.returnDate}
          key={b.id}
        />
      ))}
    </div>
  );
};

export default memo(BookingList);

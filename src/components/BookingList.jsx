import { memo } from "react";
import BookingItem from "./BookingItem";

const BookingList = () => {
  return (
    <div>
      <h2>BookingList</h2>
      <BookingItem />
    </div>
  );
};

export default memo(BookingList);

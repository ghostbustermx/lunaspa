import { useState } from "react";
import BookingModal from "./BookingModal";

export default function ViewBookButton({ treatment }) {
  const [booking, setBooking] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginTop: 16 }}
        onClick={() => setBooking(true)}
      >
        {"View & Book"}
      </button>
      {booking && (
        <BookingModal treatment={treatment} onClose={() => setBooking(false)} />
      )}
    </>
  );
}
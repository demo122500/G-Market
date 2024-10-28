import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents = [], isLoading } = useSelector((state) => state.events);

  if (isLoading) {
    return <p className="text-center text-neutral-500">Loading events...</p>
  }

  // Improve 10/21/2024
  return (
    <div className={styles.section}>
      <div className={styles.heading}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid mb-12">
        {allEvents.length > 0 ? (
          <EventCard data={allEvents[0]} />
        ) : (
          <h4 className="text-neutral-500 pl-2">No Events Found!</h4>
        )}
      </div>
    </div>
  );
};

export default Events;
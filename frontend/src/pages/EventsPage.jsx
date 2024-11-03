import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";
import { assets } from "../Assests/assets";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div>
            {allEvents && allEvents.length > 0 ? (
              allEvents.map((event) => (
                <EventCard key={event._id} active={true} data={event} />
              ))
            ) : (
              <p 
                className="text-3xl font-semibold uppercase h-[50vh] flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(121deg, rgba(115, 189, 58, 0.30) 0%, rgba(115, 189, 58, 0.20) 46%, rgba(115, 189, 58, 0.10) 100%), url(${assets.g_large})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "100",
                }}
              >No active events as of now.</p>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default EventsPage;

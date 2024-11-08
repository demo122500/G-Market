import axios from "axios";
import { server } from "../../server";

// create event
export const createevent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const response = await axios.post(`${server}/event/create-event`, data);
    console.log("Response from create event:", response);

    dispatch({
      type: "eventCreateSuccess",
      payload: response.data.event,
    });
  } catch (error) {
    console.error("Error creating event:", error);

    dispatch({
      type: "eventCreateFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });

    const response = await axios.get(`${server}/event/get-all-events/${id}`);
    // console.log("Response from get all events of a shop:", response);

    dispatch({
      type: "getAlleventsShopSuccess",
      payload: response.data.events,
    });
  } catch (error) {
    console.error("Error getting events of a shop:", error);

    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteeventRequest" });

    // Add logging to see the id and URL being used
    console.log("Deleting event with id:", id);
    console.log("Delete request URL:", `${server}/event/delete-shop-event/${id}`);

    const response = await axios.delete(`${server}/event/delete-shop-event/${id}`, { withCredentials: true });
    console.log("Response from delete event:", response);

    dispatch({
      type: "deleteeventSuccess",
      payload: { id, message: response.data.message },
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    dispatch({
      type: "deleteeventFailed",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};


// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const response = await axios.get(`${server}/event/get-all-events`);
    // console.log("Response from get all events:", response);

    dispatch({
      type: "getAlleventsSuccess",
      payload: response.data.events,
    });
  } catch (error) {
    console.error("Error getting all events:", error);

    dispatch({
      type: "getAlleventsFailed",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

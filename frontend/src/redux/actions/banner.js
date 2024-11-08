import axios from "axios";
import { server } from "../../server";

// Create banner
export const createBanner =
  (title, license, image, description, duration, shopId) => async (dispatch) => {
    try {
      dispatch({
        type: "bannerCreateRequest",
      });

      const { data } = await axios.post(`${server}/banner/create-banner`, {
        title,
        license,
        description,
        duration,
        image,
        shopId,
      });

      dispatch({
        type: "bannerCreateSuccess",
        payload: data.banner,
      });
    } catch (error) {
      dispatch({
        type: "bannerCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// Get all banners
export const getAllBanners = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllBannersRequest",
    });

    const { data } = await axios.get(`${server}/banner/get-banners`);
    // console.log("API response for getAllBanners:", data);
    dispatch({
      type: "getAllBannersSuccess",
      payload: data.banners,
    });
  } catch (error) {
    dispatch({
      type: "getAllBannersFailed",
      payload: error.response.data.message,
    });
  }
};

// Delete banner
export const deleteBanner = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteBannerRequest",
    });

    const { data } = await axios.delete(`${server}/banner/delete/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteBannerSuccess",
      payload: { message: data.message, id },
    });
  } catch (error) {
    dispatch({
      type: "deleteBannerFailed",
      payload: error.response?.data.message || "Failed to delete banner",
    });
  }
};

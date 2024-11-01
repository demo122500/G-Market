import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const bannerReducer = createReducer(initialState, {
  // Create banner
  bannerCreateRequest: (state) => {
    state.isLoading = true;
  },
  bannerCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.banner = action.payload;
    state.success = true;
  },
  bannerCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get all banners
  getAllBannersRequest: (state) => {
    state.isLoading = true;
  },
  getAllBannersSuccess: (state, action) => {
    state.isLoading = false;
    state.banners = action.payload;
  },
  getAllBannersFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete banner
  deleteBannerRequest: (state) => {
    state.isLoading = true;
  },
  deleteBannerSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload.message;
    state.banners = state.banners.filter((banner) => banner._id !==  action.payload.id);
  },
  deleteBannerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Clear errors
  clearErrors: (state) => {
    state.error = null;
  },
});

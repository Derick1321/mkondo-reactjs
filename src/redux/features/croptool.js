import { createSlice, createAction } from '@reduxjs/toolkit';


const initialState = {
  cropped: null,
};

// reducers
const croptoolSlice = createSlice({
  name: 'croptool',
  initialState,
  reducers: {
    updateCroppedImage: (state, action) => {
      return action.payload;
    },
    hideModal: () => initialState,
  },
});

// actions
export const { hideModal } = croptoolSlice.actions;

// export const updateCroppedImage = createAction(SHOW_MODAL, function prepare(type, modalProps) {
//   return {
//     payload: {
//       type,
//       modalProps,
//     },
//   }
// });
export const { updateCroppedImage } = croptoolSlice.actions;
export default croptoolSlice.reducer;

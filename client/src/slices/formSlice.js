import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
  forms: []   // store all forms here
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {

    setFormData(state, action) {
      state.formData = action.payload;
    },

    clearFormData(state) {
      state.formData = {};
    },

    setForms(state, action) {
      state.forms = action.payload;
    }

  },
});

export const { setFormData, clearFormData, setForms } = formSlice.actions;
export default formSlice.reducer;
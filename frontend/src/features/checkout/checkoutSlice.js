import { createSlice } from '@reduxjs/toolkit';
import { SHIPPING_OPTIONS } from '@/constants';

const initialState = {
  shippingAddress: {
    fullName: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: 'credit_card',
  shippingMethod: SHIPPING_OPTIONS[0].id,
  notes: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateShippingAddress: (state, action) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
    setOrderNotes: (state, action) => {
      state.notes = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  updateShippingAddress,
  setPaymentMethod,
  setShippingMethod,
  setOrderNotes,
  resetCheckout,
} = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;





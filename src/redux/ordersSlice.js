import { createSlice, nanoid } from '@reduxjs/toolkit';
import { loadState, saveState } from '../utils/localStorage';
import mockOrders from '../data/data.json';

let initialState = loadState('orders');
if (!initialState || initialState.length === 0) {
  initialState = mockOrders;
  saveState('orders', initialState);
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: {
      reducer(state, action) {
        state.push(action.payload);
        saveState('orders', state);
      },
      prepare(order) {
        return { payload: { ...order, id: nanoid() } };
      },
    },
    updateOrder(state, action) {
      const index = state.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveState('orders', state);
      }
    },
    deleteOrder(state, action) {
      const index = state.findIndex(o => o.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveState('orders', state);
      }
    },
  },
});

export const { addOrder, updateOrder, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
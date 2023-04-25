import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface GameState {
  value: number;
}

// Define the initial state using that type
const initialState: GameState = {
  value: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = gameSlice.actions;

export default gameSlice.reducer;

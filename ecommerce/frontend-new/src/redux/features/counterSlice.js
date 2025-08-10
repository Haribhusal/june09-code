import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}
export const counterSlice = createSlice({
    name: "counter-slice",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByNumber: (state, action) => {
            state.value += action.payload
        },
        decrementByNumber: (state, action) => {
            state.value -= action.payload;
        }
    }
})

export const { increment, decrement, incrementByNumber, decrementByNumber } = counterSlice.actions;
export default counterSlice.reducer;
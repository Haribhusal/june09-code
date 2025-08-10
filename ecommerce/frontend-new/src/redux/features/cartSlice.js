import { createSlice } from "@reduxjs/toolkit";
import generateSlug from "../../utils/generateSlug";

const initialState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name: "cart-reducer",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;
            // find existing item by id
            const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);

            if (existingItem) {
                // increase quantity if already exists
                existingItem.quantity += 1;
            } else {
                // add new item with quantity 1
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                // increase quantity if already exists
                existingItem.quantity += 1;
            }
        }
    }

})
export const { addItemToCart, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
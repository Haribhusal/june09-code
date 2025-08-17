import { createSlice } from "@reduxjs/toolkit";
import generateSlug from "../../utils/generateSlug";
import { toast } from "sonner";

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
            const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);

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
            const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);
            if (existingItem) {
                // increase quantity if already exists
                existingItem.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);
            if (existingItem) {


                // increase quantity if already exists
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== item._id);
                    toast.success('Item also removed')
                }
            }

        },
        deleteItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);
            if (existingItem) {
                state.cartItems = state.cartItems.filter(cartItem => cartItem._id !== item._id);

            }
        }
    }

})
export const { addItemToCart, incrementQuantity, decrementQuantity, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
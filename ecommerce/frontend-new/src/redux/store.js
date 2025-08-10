import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counterSlice'
import cartSlice from './features/cartSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        cart: cartSlice
    },
})
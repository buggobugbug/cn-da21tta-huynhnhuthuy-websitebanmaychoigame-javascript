import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slider/CounterSlider'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})
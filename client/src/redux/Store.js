import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/feature/authSlice';
import tourReducer from '../redux/feature/tourSlice';


export default configureStore({
    reducer: {
        auth: authReducer,
        tour: tourReducer,
    },
})
import { configureStore } from '@reduxjs/toolkit'

import contactReducer from '../redux/slices/contact';
import searchInputReducer from '../redux/slices/searchInput';

export const store = configureStore({
    reducer: {
        contacts: contactReducer,
        searchInput: searchInputReducer
    },
    devTools: true
})
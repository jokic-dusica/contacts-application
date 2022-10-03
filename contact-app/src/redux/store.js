import { configureStore } from '@reduxjs/toolkit'

import contactReducer from '../redux/slices/contact';
import searchInputReducer from '../redux/slices/searchInput';
import labelReducer from '../redux/slices/labels';

export const store = configureStore({
    reducer: {
        contacts: contactReducer,
        searchInput: searchInputReducer,
        labels: labelReducer
    },
    devTools: true
})
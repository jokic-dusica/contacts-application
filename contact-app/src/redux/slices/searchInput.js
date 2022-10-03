import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchInput: ""
}

export const searchInputSlice = createSlice({
    name: 'searchInput',
    initialState,
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
    },
})

export const { setSearchInput } = searchInputSlice.actions;

export default searchInputSlice.reducer;
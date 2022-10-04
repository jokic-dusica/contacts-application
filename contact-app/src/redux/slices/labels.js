import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    labels: [
        {
            id: 1,
            label:"Work",
        },
        {
            id:2,
            label:"Friends",
        },
        {
            id:3,
            label:"Family",
        },
    ] 
}

export const labelSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        createLabel: (state, action) => {
            state.labels.push(action.payload);
        },
    },
})

export const { createLabel } = labelSlice.actions;

export default labelSlice.reducer;
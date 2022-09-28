import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    labels: [
        {
            label:"Work",
            contactID:"1"
        },
        {
            label:"Family",
            contactID:"2",
        },
        {
            contactID:"2",
            label:"Friends"
        },
    ],
};

export const labelSlice = createSlice({
    name: 'labels',
    initialState,
    reducers: {
        createLabel: (state, action) => {
            state.labels.push(action.payload);
        },
    },
})

export const { createLabel } = labelSlice.actions

export default labelSlice.reducer;
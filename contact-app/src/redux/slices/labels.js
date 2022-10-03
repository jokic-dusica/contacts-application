import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    labels: [
        {
            id: 1,
            label: "Work",
        },
        {
            id: 2,
            label: "Friends",
        },
        {
            id: 3,
            label: "Family",
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
        deleteLabel: (state, action) => {
            const deletedLabel = state.labels.filter(label => label.id !== action.payload);
            state.labels = deletedLabel;
        }
    },
})

export const { createLabel, deleteLabel } = labelSlice.actions;

export default labelSlice.reducer;
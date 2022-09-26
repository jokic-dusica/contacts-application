import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    contacts: [
        {
            id: 0,
            name: "John Doe",
            email:"johndoe@gmail.com",
            number: "9988998899",
            img: "1"
        },
        {
            id: 1,
            name: "Robert Doe",
            email:"robertdoe@gmail.com",
            number: "1111111",
            img: "2"
        },
        {
            id: 2,
            name: "Martin Doe",
            email:"martindoe@gmail.com",
            number: "5555555",
            img: "3"
        },
        {
            id: 3,
            name: "Christine Doe",
            email:"christinedoe@gmail.com",
            number: "44444444",
            img: "4"
        }
    ]
};

export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        editContact: (state, action) => {
            const updatedContact = state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact);
            state = updatedContact;
        },
        deleteContact: (state, action) => {
            const newDeleted = state.contacts.filter(contact => contact.id !== action.payload);
            state.contacts = newDeleted;
        },       
    },
})

export const { addContact, deleteContact, editContact } = contactSlice.actions

export default contactSlice.reducer
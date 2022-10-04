import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: [
        {
            id: 0,
            name: "John Test",
            email: "johndoe@gmail.com",
            phone: "9988998899",
            img: "1",
            labels: ["Work", "Friends"]
        },
        {
            id: 1,
            name: "Robert Doe",
            email: "robertdoe@gmail.com",
            phone: "1111111",
            img: "2",
            labels: ["Friends"]
        },
        {
            id: 2,
            name: "Martin Doe",
            email: "martindoe@gmail.com",
            phone: "5555555",
            img: "3",
            labels: ["Family"]
        },
        {
            id: 3,
            name: "Christine Doe",
            email: "christinedoe@gmail.com",
            phone: "44444444",
            img: "4",
            labels: ["TestLabel"]
        },
    ],
    favoritesContacts: [2, 3]
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
            state.contacts = updatedContact;
        },
        deleteContact: (state, action) => {
            const newDeleted = state.contacts.filter(contact => contact.id !== action.payload);
            state.favoritesContacts = state.favoritesContacts.filter(favID => favID !== action.payload)
            state.contacts = newDeleted;
        },
        addRemoveContactFromFavorites: (state, action) => {
            const exist = state.favoritesContacts.includes(action.payload);
            if (exist) {
                state.favoritesContacts = state.favoritesContacts.filter(favID => favID !== action.payload)
            } else {
                state.favoritesContacts.push(action.payload)
            }
        },
        removeLabelFromUser: (state, action) => {
            const removedLabel = state.contacts.map(contact => {
                if (contact.id === action.payload.id) {
                    return { ...contact, labels: contact.labels.filter(label => label !== action.payload.label) }
                } else {
                    return contact;
                }
            })
            state.contacts = removedLabel;
        }
    },
})

export const { addContact, editContact, deleteContact, addRemoveContactFromFavorites, removeLabelFromUser } = contactSlice.actions

export default contactSlice.reducer;
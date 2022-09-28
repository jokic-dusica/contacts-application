import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    contacts: [
        {
            id: 0,
            name: "John Doe",
            email:"johndoe@gmail.com",
            phone: "9988998899",
            img: "1",
        },
        {
            id: 1,
            name: "Robert Doe",
            email:"robertdoe@gmail.com",
            phone: "1111111",
            img: "2",
        },
        {
            id: 2,
            name: "Martin Doe",
            email:"martindoe@gmail.com",
            phone: "5555555",
            img: "3",
        },
        {
            id: 3,
            name: "Christine Doe",
            email:"christinedoe@gmail.com",
            phone: "44444444",
            img: "4"
        },
    ],
    favoritesContacts: [
        {
            id: 7,
            name: "Test Favorites",
            email:"testFav@gmail.com",
            phone: "067876543",
            img: "1"
        },
        {
            id: 8,
            name: "Test Favorites 1",
            email:"testFav@gmail.com",
            phone: "067876543",
            img: "1"
        },
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
            state.contacts = updatedContact;
        },
        deleteContact: (state, action) => {
            const newDeleted = state.contacts.filter(contact => contact.id !== action.payload);
            state.contacts = newDeleted;
        }, 
        addContactToFavorites: (state,action) => {
            console.log("State fav",current(state.favoritesContacts))
            state.favoritesContacts.push(action.payload)
            // const data = state.favoritesContacts.find(item => item.id === action.payload);
            // state.favoritesContacts = data;
        },
        deleteContactFromFavorites: (state,action) => {
            const deletedContact = state.favoritesContacts.filter(item => item.id !== action.payload);
            state.favoritesContacts = deletedContact;
        } 
    },
})

export const { addContact, editContact, deleteContact, addContactToFavorites, deleteContactFromFavorites } = contactSlice.actions

export default contactSlice.reducer;
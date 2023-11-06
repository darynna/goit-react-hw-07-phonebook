import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const phonebookInitialState = {
    contacts: [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
    filter: ""
  };

const phonebookSlice = createSlice({
  name: "contacts",
  initialState: phonebookInitialState,
  reducers: {
    addContacts(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContacts(state, action) {
      state.contacts = state.contacts.filter(task => task.id !== action.payload);
    },
   setFilter(state, action) {
        state.filter = action.payload
      },
  },
});

const persistConfig = {
    key: 'contacts',
    storage,
    blacklist: ['filter']
  };
  
 export const persistedReducer = persistReducer(
    persistConfig,
    phonebookSlice.reducer
  );
  

export const { addContacts, deleteContacts, setFilter } = phonebookSlice.actions;

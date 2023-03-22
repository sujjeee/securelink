import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const localStorageSlice = createSlice({
    name: 'localStorage',
    initialState,
    reducers: {
        addLink: (state, action) => {
            state.push(action.payload);
        }
    },
});

export const { addLink } = localStorageSlice.actions;
export default localStorageSlice.reducer;

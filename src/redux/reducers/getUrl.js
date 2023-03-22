import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const getUrlSlice = createSlice({
    name: 'getUrl',
    initialState,
    reducers: {
        setUrl(state, action) {
            return action.payload;
        },
    },
});

export const { setUrl } = getUrlSlice.actions;
export default getUrlSlice.reducer;

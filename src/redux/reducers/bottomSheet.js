import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const bottomSheetSlice = createSlice({
    name: 'bottomSheet',
    initialState,
    reducers: {
        toggle(state) {
            return !state
        },
    },
})

export const { toggle } = bottomSheetSlice.actions
export default bottomSheetSlice.reducer
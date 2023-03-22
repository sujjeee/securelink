import { configureStore } from '@reduxjs/toolkit'
import bottomSheetReducer from './reducers/bottomSheet'
import getUrlReducer from './reducers/getUrl'
import localStorageReducer from './reducers/localStorage'


export const store = configureStore({
    reducer: {
        bottomSheet: bottomSheetReducer,
        getUrl: getUrlReducer,
        localStorage: localStorageReducer
    }
})

import { configureStore } from '@reduxjs/toolkit'
import viewTypeMainReducer from './reducers/view-type-for-main'
import dataReducer from './reducers/data'

export const store = configureStore({
  reducer: {
    viewTypeMain: viewTypeMainReducer,
    dataReducer: dataReducer
  },
})
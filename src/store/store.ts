import { configureStore } from '@reduxjs/toolkit'

import characterReducer from './slice/characterSlice'
import pagingReducer from './slice/pagingSlice'
import locationReducer from './slice/locationSlice'
import episodeReducer from './slice/episodeSlice'
import errorReducer from './slice/errorSlice'

export const store = configureStore({
  reducer: {
    character: characterReducer,
    paging: pagingReducer,
    location: locationReducer,
    episode: episodeReducer,
    error: errorReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

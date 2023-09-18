import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLocationDetail, fetchLocationResidents } from "../../services/locationService"

import { RootState } from "../store"
import { Character, LocationDetail } from "../../types/API"

export const getLocationDetail = createAsyncThunk(
  "location/getLocationDetail",
  async (id: number) => {
    const locationDetail = await fetchLocationDetail(id)
    return locationDetail
  }
)

export const getLocationResidents = createAsyncThunk(
  "location/getLocationResidents",
  async (residentsUrls: string[]) => {
    const residents = await fetchLocationResidents(residentsUrls)
    return residents
  }
);

interface LocationState {
  detail: LocationDetail
  residents: Character[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: LocationState = {
  detail: {} as LocationDetail,
  residents: [],
  loading: 'idle'
}

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLocationDetail.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getLocationDetail.fulfilled, (state, action) => {
        state.detail = action.payload
        state.loading = 'succeeded'
      })
      .addCase(getLocationDetail.rejected, (state) => {
        state.loading = 'failed'
      })
      .addCase(getLocationResidents.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getLocationResidents.fulfilled, (state, action) => {
        state.residents = action.payload
        state.loading = 'succeeded'
      })
      .addCase(getLocationResidents.rejected, (state) => {
        state.loading = 'failed'
      })
  }
})

export const selectLocationDetail = (state: RootState) => state.location
export default locationSlice.reducer
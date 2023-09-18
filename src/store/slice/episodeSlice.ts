import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchEpisodeDetail, fetchEpisodeCharacters } from "../../services/episodeService"
import { RootState } from "../store"
import { EposideDetail, Character } from "../../types/API"

export const getEpisodeDetail = createAsyncThunk(
  "location/getLocationDetail",
  async (id: number) => {
    const episodeDetail = await fetchEpisodeDetail(id)
    return episodeDetail
  }
)

export const getEpisodeCharacters = createAsyncThunk(
  "location/getEpisodeCharacters",
  async (charactersUrls: string[]) => {
    const characters = await fetchEpisodeCharacters(charactersUrls)
    return characters
  }
)

interface LocationState {
  detail: EposideDetail
  characters: Character[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: LocationState = {
  detail: {} as EposideDetail,
  characters: [],
  loading: 'idle'
}

export const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getEpisodeDetail.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getEpisodeDetail.fulfilled, (state, action) => {
        state.detail = action.payload
        state.loading = 'succeeded'
      })
      .addCase(getEpisodeDetail.rejected, (state) => {
        state.loading = 'failed'
      })
      .addCase(getEpisodeCharacters.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getEpisodeCharacters.fulfilled, (state, action) => {
        state.characters = action.payload
        state.loading = 'succeeded'
      })
      .addCase(getEpisodeCharacters.rejected, (state) => {
        state.loading = 'failed'
      })
  }
})

export const selectEpisodeDetail = (state: RootState) => state.episode
export default episodeSlice.reducer
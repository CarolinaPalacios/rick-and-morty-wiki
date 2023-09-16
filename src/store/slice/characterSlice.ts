import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCharacterCollection, FetchCharacterCollectionArgs, fetchCharacterDetailById } from '../../services/characterService'
import { setPagingInfo } from './pagingSlice'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { Character } from '../../types/API'

export const getCharacterCollection = createAsyncThunk(
  'character/getCharacterCollection',
  async ({ name, page }: FetchCharacterCollectionArgs, thunkAPI) => {
    const { collection, paging } = await fetchCharacterCollection({
      name,
      page
    })
    thunkAPI.dispatch(setPagingInfo(paging))

    return collection
  }
)

export const getCharacterDetailById = createAsyncThunk(
  'character/getCharacterDetailById',
  async (id: number) => {
    const character = await fetchCharacterDetailById(id)
    return character
  }
)

interface CharacterState {
  collection: Character[]
  detail: Character
  targeted: string
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: CharacterState = {
  collection: [],
  detail: {} as Character,
  targeted: '',
  loading: 'idle'
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setTargetedCharacter: (state, action: PayloadAction<string>) => {
      state.targeted = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(
        getCharacterCollection.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.collection = action.payload
          state.loading = 'succeeded'
        }
      )
      .addCase(getCharacterCollection.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getCharacterCollection.rejected, (state) => {
        state.loading = 'failed'
      })
      .addCase(getCharacterDetailById.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getCharacterDetailById.fulfilled, (state, action: PayloadAction<Character>) => {
        state.detail = action.payload
        state.loading = 'succeeded'
      })
      .addCase(getCharacterDetailById.rejected, (state) => {
        state.loading = 'failed'
      })
  }
})

export const { setTargetedCharacter } = characterSlice.actions

export const selectCharacter = (state: RootState) => state.character

export default characterSlice.reducer
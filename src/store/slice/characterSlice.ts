import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCharacterCollection, FetchCharacterCollectionArgs, fetchCharacterDetailById } from '../../services/characterService'
import { setPagingInfo } from './pagingSlice'
import { isSerializedError } from '../../utils/utils'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { Character, SerializedError } from '../../types/API'
import { AxiosError } from 'axios'

export const getCharacterCollection = createAsyncThunk(
  'character/getCharacterCollection',
  async ({ name, page }: FetchCharacterCollectionArgs, thunkAPI) => {
    try {
      const { collection, paging } = await fetchCharacterCollection({
        name,
        page
      })

      thunkAPI.dispatch(setPagingInfo(paging))
      thunkAPI.dispatch(cleanError())

      return collection
    }
    catch (error) {
      if (error instanceof AxiosError) {
        return thunkAPI.rejectWithValue({
          message: error.response?.data.error,
          status: error.response?.status ?? 404
        } satisfies SerializedError)
      }
      return thunkAPI.rejectWithValue({
        message: 'Unfortunately, something went wrong!',
        status: 500
      } satisfies SerializedError)
    }
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
  error?: SerializedError
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
    },
    cleanError: state => {
      state.error = undefined
    }
  },
  extraReducers: builder => {
    builder
      .addCase(
        getCharacterCollection.fulfilled,
        (state, action: PayloadAction<Character[] | undefined>) => {
          if (action.payload !== undefined) {
            state.collection = action.payload
          }
          state.loading = 'succeeded'
        }
      )
      .addCase(getCharacterCollection.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getCharacterCollection.rejected, (state, action) => {
        if (action.meta.rejectedWithValue) {
          if (isSerializedError(action.payload)) {
            state.error = action.payload
          }
        }
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

export const { setTargetedCharacter, cleanError } = characterSlice.actions

export const selectCharacter = (state: RootState) => state.character

export default characterSlice.reducer
import type { Species, Gender, Status, Type } from '../types/API'

export interface FetchCharacterCollectionArgs {
  name?: string | null
  page?: number | null
  species?: Species | null
  type?: Type | null
  gender?: Gender | null
  status?: Status | null
  [key: string]: string | number | null | undefined
}

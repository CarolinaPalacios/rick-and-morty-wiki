import { useCallback } from 'react'
import { debounce } from 'lodash'

import { useAppDispatch } from '../store/hooks/useStore'
import { setFilterBy } from '../store/slice/characterSlice'
import { resetPagingInfo } from '../store/slice/pagingSlice'

export const useSearch = () => {
  const dispatch = useAppDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((characterName: string) => {
      dispatch(resetPagingInfo())
      dispatch(setFilterBy({ by: 'name', value: characterName }))
    }, 500),
    [dispatch]
  )

  const searchCharacter = (targetedCharacter: string) => {
    debouncedSearch(targetedCharacter)
  }

  return { searchCharacter }
}

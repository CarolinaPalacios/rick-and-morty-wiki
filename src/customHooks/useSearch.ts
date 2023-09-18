import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks/useStore'
import {
  selectCharacter,
  setTargetedCharacter
} from '../store/slice/characterSlice'
import { resetPagingInfo } from '../store/slice/pagingSlice'
import { debounce } from 'lodash'


export const useSearch = () => {
  const dispatch = useAppDispatch()
  const { targeted: characterName } = useAppSelector(selectCharacter)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((characterName: string) => {
      dispatch(resetPagingInfo())
      dispatch(setTargetedCharacter(characterName))
    }, 1000),
    [debounce]
  );


  const searchCharacter = (targetedCharacter: string) => {
    debouncedSearch(targetedCharacter)
  }

  return {
    characterName,
    searchCharacter
  }
}
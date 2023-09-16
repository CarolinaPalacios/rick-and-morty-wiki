import { useState, useCallback } from 'react'
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
  const [searchTerm, setSearchTerm] = useState('')

  const searchCharacter = (targetedCharacter: string) => {
    dispatch(resetPagingInfo())
    dispatch(setTargetedCharacter(targetedCharacter))
  }

  const debouncedSearch = useCallback(
    debounce((characterName: string) => {
      searchCharacter(characterName);
    }, 1000),
    [debounce]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchTerm(value)
    debouncedSearch(value)
  }

  return {
    characterName,
    handleChange,
    searchTerm
  }
}
import { useAppDispatch, useAppSelector } from '../store/hooks/useStore'
import {
  selectCharacter,
  setTargetedCharacter
} from '../store/slice/characterSlice'
import { resetPagingInfo } from '../store/slice/pagingSlice'


export const useSearch = () => {
  const dispatch = useAppDispatch()
  const { targeted: characterName } = useAppSelector(selectCharacter)

  const searchCharacter = (targetedCharacter: string) => {
    dispatch(resetPagingInfo())
    dispatch(setTargetedCharacter(targetedCharacter))
  }

  return {
    characterName,
    searchCharacter
  }
}
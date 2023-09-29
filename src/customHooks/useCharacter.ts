import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks/useStore'
import { getCharacterCollection, selectCharacter, getCharacterDetail } from "../store/slice/characterSlice";
import { selectPagingInfo } from "../store/slice/pagingSlice";

export const useGetCharacterCollection = () => {
  const dispatch = useAppDispatch();
  const { collection, filterBy, loading } = useAppSelector(selectCharacter)
  const { current: page } = useAppSelector(selectPagingInfo)


  useEffect(() => {
    dispatch(getCharacterCollection({ ...filterBy, page }))
  }, [filterBy, page, dispatch])

  const isUninitialized = loading === "idle"
  const isLoading = loading === "pending"
  const isSuccess = loading === "succeeded"
  const isError = loading === "failed"

  return {
    collection,
    filterBy,
    isLoading,
    isSuccess,
    page,
    isUninitialized,
    isError
  }
}

export const useGetCharacterDetail = (id: number) => {
  const dispatch = useAppDispatch();
  const { detail, loading } = useAppSelector(selectCharacter)

  useEffect(() => {
    dispatch(getCharacterDetail(id))
  }, [id, dispatch])

  const isUninitialized = loading === "idle"
  const isLoading = loading === "pending"
  const isError = loading === "failed"
  const isSuccess = loading === "succeeded"

  return {
    detail,
    isLoading,
    isError,
    isSuccess,
    isUninitialized
  }
}
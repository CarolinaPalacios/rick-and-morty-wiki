import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks/useStore'
import { getCharacterCollection, selectCharacter, getCharacterDetailById } from "../store/slice/characterSlice";
import { selectPagingInfo } from "../store/slice/pagingSlice";

export const useGetCharacterCollection = () => {
  const dispatch = useAppDispatch();
  const { collection, targeted: name, loading, error } = useAppSelector(selectCharacter)
  const { current: page } = useAppSelector(selectPagingInfo)


  useEffect(() => {
    dispatch(getCharacterCollection({ name, page }))
  }, [name, page, dispatch])

  const isUninitialized = loading === "idle"
  const isLoading = loading === "pending"
  const isSuccess = loading === "succeeded"

  return {
    collection,
    isLoading,
    error,
    isSuccess,
    isUninitialized
  }
}

export const useGetCharacterDetail = (id: number) => {
  const dispatch = useAppDispatch();
  const { detail, loading } = useAppSelector(selectCharacter)

  useEffect(() => {
    dispatch(getCharacterDetailById(id))
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
import { useEffect, } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks/useStore'
import { getLocationDetail, selectLocationDetail, getLocationResidents } from '../store/slice/locationSlice'

export const useLocation = (locationUrl: string | null) => {
  const dispatch = useAppDispatch();
  const { detail, loading, residents } = useAppSelector(selectLocationDetail)


  useEffect(() => {
    if (locationUrl) {
      const locationId = locationUrl.split('/').pop()
      dispatch(getLocationDetail(parseInt(locationId!)))
    }
  }, [dispatch, locationUrl])

  useEffect(() => {
    if (detail?.residents) {
      const residentsUrls = detail.residents;
      dispatch(getLocationResidents(residentsUrls));
    }
  }, [dispatch, detail]);

  const isUninitialized = loading === "idle"
  const isLoading = loading === "pending"
  const isError = loading === "failed"
  const isSuccess = loading === "succeeded"

  return {
    detail,
    isLoading,
    isError,
    isSuccess,
    isUninitialized,
    residents
  }
}
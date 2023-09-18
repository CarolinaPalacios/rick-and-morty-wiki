import { useEffect, } from "react";
import { useAppDispatch, useAppSelector } from '../store/hooks/useStore'
import { getEpisodeDetail, selectEpisodeDetail, getEpisodeCharacters } from '../store/slice/episodeSlice'

export const useEpisode = (episodeUrl: string | null) => {
  const dispatch = useAppDispatch();
  const { detail, loading, characters } = useAppSelector(selectEpisodeDetail)


  useEffect(() => {
    if (episodeUrl) {
      const locationId = episodeUrl.split('/').pop()
      dispatch(getEpisodeDetail(parseInt(locationId!)))
    }
  }, [dispatch, episodeUrl])

  useEffect(() => {
    if (detail?.characters) {
      const charactersUrls = detail.characters;
      dispatch(getEpisodeCharacters(charactersUrls));
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
    characters
  }
}
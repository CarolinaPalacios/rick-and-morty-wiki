import { useParams } from "react-router-dom"
import { useEpisode } from "../customHooks/useEpisode"
import CharacterGrid from "../components/CharacterGrid";


const EpisodeDetail = () => {
  const { detail, isLoading, isError, characters } = useEpisode(useParams().id!)

  if (isError) return <p>Error...</p>
  return (
    <div>
      {isLoading ? <p>Loading...</p> : (
        <div>
          <div className="flex flex-col justify-center pt-10 text-center text-2xl">

            <h3>Name: {detail.name}</h3>
            <h3>Air Date: {detail.air_date}</h3>
            <h3>Episode: {detail.episode}</h3>
            <h3>Characters in this episode:</h3>
          </div>

          <CharacterGrid collection={characters} isInEpisodeOrLocationDetail={true} />
        </div>
      )}
    </div>
  )
}

export default EpisodeDetail
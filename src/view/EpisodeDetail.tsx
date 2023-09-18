import CharacterGrid from "../components/CharacterGrid";
import { useEpisode } from "../customHooks/useEpisode"
import { useParams } from "react-router-dom"


const EpisodeDetail = () => {
  const { detail, isLoading, isError, characters } = useEpisode(useParams().id!)

  if (isError) return <p>Error...</p>
  return (<div>
    {isLoading ? <p>Loading...</p> : (
      <div>
        <h3>Name: {detail.name}</h3>
        <h3>Air Date: {detail.air_date}</h3>
        <h3>Episode: {detail.episode}</h3>
        <h3>Characters in this episode:</h3>
        {
          characters.map((character) => {
            return <CharacterGrid key={character.id} characters={[character]} />
          })
        }
      </div>
    )}
  </div>)
}

export default EpisodeDetail
import type { Character } from '../types/API'
import { useNavigate } from 'react-router-dom'

interface Props {
  characters: Character[]
}

const CharacterGrid = ({ characters }: Props) => {
  const navigate = useNavigate()


  return (
    <ul>
      {characters.map((character) => {
        return (
          <li key={character.id}>
            <h2>{character.name}</h2>
            <h3>
              {character.status} — {character.species}
            </h3>
            <img src={character.image} alt={`Photo of ${character.name}`} />
            <h3
              onClick={() => {
                if (character.episode) {
                  const episodeId = character.episode[0].split('/').pop();
                  navigate(`/episode/${episodeId}`);
                }
              }}>
              First seen in: {character.firstSeenIn}</h3>
            <h3 onClick={() => {
              if (character.location?.url) {
                const locationId = character.location.url.split('/').pop();
                navigate(`/location/${locationId}`);
              }
            }}>
              Last known location: {character.location?.name}</h3>
            <button onClick={() => navigate(`/character/${character.id}`)}>
              View More
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default CharacterGrid

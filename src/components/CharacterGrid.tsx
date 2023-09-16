import type { Character } from '../types/API'
import { useNavigate } from 'react-router-dom'

interface Props {
  characters: Character[]
}

const CharacterGrid = ({ characters }: Props) => {
  const navigate = useNavigate()

  return (
    <div>
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <h3>
              {character.status} — {character.species}
            </h3>
            <img src={character.image} alt={`Photo of ${character.name}`} />
            <h3>First seen in: {character.firstSeenIn}</h3>
            <h3>Last known location: {character.location?.name}</h3>
            <button onClick={() => navigate(`/character/${character.id}`)}>
              View More
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default CharacterGrid

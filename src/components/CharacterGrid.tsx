import type { Character } from '../types/API'
import CharacterCard from './CharacterCard';

interface CharacterGridProps {
  collection: Character[]
  isInEpisodeOrLocationDetail?: boolean;
}

const CharacterGrid = ({ collection, isInEpisodeOrLocationDetail }: CharacterGridProps) => {
  return (
    <ul className='grid grid-cols-1 md:grid-cols-3 gap-4  m-10 p-10'>
      {collection?.map((character) =>
        <CharacterCard key={character.id} character={character} isInEpisodeOrLocationDetail={isInEpisodeOrLocationDetail} />
      )
      }
    </ul>
  )
}

export default CharacterGrid

import { useGetCharacterDetail } from "../customHooks/useCharacter"
import { useParams } from "react-router-dom"
const CharacterDetail = () => {
  const { detail, isLoading, isError } = useGetCharacterDetail(parseInt(useParams().id!))

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  return (
    <div>
      <h1>{detail.name}</h1>
      <img src={detail.image} alt={`Photo of ${detail.name}`} />
      <h3>Status: {detail.status}</h3>
      <h3>Species: {detail.species}</h3>
      <h3>Gender: {detail.gender}</h3>
      <h3>{detail.type && `Type: ${detail.type}`}</h3>
      <h3>First seen in: {detail.firstSeenIn}</h3>
      <h3>Last known location: {detail.location?.name}</h3>
    </div>
  )
}

export default CharacterDetail
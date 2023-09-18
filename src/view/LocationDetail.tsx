import CharacterGrid from "../components/CharacterGrid";
import { useLocation } from "../customHooks/useLocation"
import { useParams } from "react-router-dom"


const LocationDetail = () => {
  const { detail, isLoading, isError, residents } = useLocation(useParams().id!)


  if (isError) return <p>Error...</p>
  return (<div>
    {isLoading ? <p>Loading...</p> : (
      <div>
        <h3>Name: {detail.name}</h3>
        <h3>Type: {detail.type}</h3>
        <h3>Dimension: {detail.dimension}</h3>
        <h3>Residents in this location:</h3>
        {
          residents.map((resident) => {
            return <CharacterGrid key={resident.id} characters={[resident]} />
          })
        }
      </div>
    )}
  </div>)
}

export default LocationDetail
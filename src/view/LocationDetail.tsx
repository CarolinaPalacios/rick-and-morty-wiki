import { useParams } from "react-router-dom"
import { useLocation } from "../customHooks/useLocation"
import CharacterGrid from "../components/CharacterGrid";


const LocationDetail = () => {
  const { detail, isLoading, isError, residents } = useLocation(useParams().id!)


  if (isError) return <p>Error...</p>
  return (
    <div>
      {isLoading ? <p>Loading...</p> : (
        <div>
          <div className="flex flex-col justify-center pt-10 text-center text-2xl">
            <h3>Name: {detail.name}</h3>
            <h3>Type: {detail.type}</h3>
            <h3>Dimension: {detail.dimension}</h3>
            <h3 className="mt-10 font-bold">Residents in this location:</h3>
          </div>
          <CharacterGrid collection={residents} isInEpisodeOrLocationDetail={true} />
        </div>
      )}
    </div>
  )
}

export default LocationDetail
import CharacterGrid from "../components/CharacterGrid"
import Paging from "../components/Paging"
import SearchBar from "../components/SearchBar"
import { useGetCharacterCollection } from "../customHooks/useCharacter"

const Home = () => {
  const { collection, isLoading, isError } = useGetCharacterCollection()

  if (isError) {
    return <div>Unfortunately, something went wrong!</div>
  }

  return (
    <div>
      <h1>Rick and Morty Wiki</h1>
      <SearchBar />
      {isLoading ? <p>Loading...</p>
        : (
          <>
            <Paging />
            <CharacterGrid characters={collection} />
          </>
        )
      }
    </div>

  )
}

export default Home
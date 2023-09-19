import CharacterGrid from "../components/CharacterGrid"
import Paging from "../components/Paging"
import SearchBar from "../components/SearchBar"
import { useGetCharacterCollection } from "../customHooks/useCharacter"

const Home = () => {
  const { collection, isLoading, error } = useGetCharacterCollection()

  if (error?.status === 500) {
    return <div>{error?.message}</div>
  }


  return (
    <div>
      <h1>Rick and Morty Wiki</h1>
      <SearchBar />
      {isLoading ? <p>Loading...</p>
        : (
          <>
            <Paging />
            <CharacterGrid characters={collection} error={error} />
          </>
        )
      }
    </div>

  )
}

export default Home
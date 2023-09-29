import CharacterGrid from '../components/CharacterGrid'
import Filter from '../components/Filter'
import Paging from '../components/Paging'
import SearchBar from '../components/SearchBar'
import ActiveFilters from '../components/ActiveFilters'
import Error from '../components/Error'
import { useError } from '../customHooks/useError'

import { useGetCharacterCollection } from '../customHooks/useCharacter'
const Home = () => {
  const { collection, filterBy, isLoading } = useGetCharacterCollection()
  const { errorStatus } = useError()

  return (
    <>
      <SearchBar />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {errorStatus !== null && <Error />}
          <Paging />
          <ActiveFilters activeFilters={filterBy} />
          <CharacterGrid collection={collection} />
          <Filter />
        </>
      )}
    </>
  )
}

export default Home

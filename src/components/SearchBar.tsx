import { useSearch } from '../customHooks/useSearch'

const SearchBar = () => {
  const { searchTerm, handleChange } = useSearch()


  return <input type='text' value={searchTerm} onChange={handleChange} />
}

export default SearchBar
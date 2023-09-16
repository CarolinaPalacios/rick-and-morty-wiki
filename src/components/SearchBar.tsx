import { useSearch } from '../customHooks/useSearch'

const SearchBar = () => {
  const { characterName, searchCharacter } = useSearch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchCharacter(event.target.value)
  }

  return <input type='text' value={characterName} onChange={handleChange} />
}

export default SearchBar
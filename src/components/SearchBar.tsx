import { useState } from 'react'
import { useSearch } from "../customHooks/useSearch"

const SearchBar = () => {
  const [characterName, setCharacterName] = useState('')
  const { searchCharacter } = useSearch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setCharacterName(value)
    searchCharacter(value)
  }

  return <input type='text' value={characterName} onChange={handleChange} />
}

export default SearchBar
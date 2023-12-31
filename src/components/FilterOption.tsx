import { useFilter } from '../customHooks/useFilter'
import type { TFilterOption, TFilterValues, TFilterValue } from '../utils/filter'

interface FilterOptionProps {
  option: TFilterOption
  values: TFilterValues
}

const FilterOption = ({ option, values }: FilterOptionProps) => {
  const { filterBy, filterCharacterCollection } = useFilter()

  return (
    <div>
      <p style={{ textTransform: 'capitalize' }}>{option}</p>
      <select
        onChange={e =>
          filterCharacterCollection({
            by: option,
            value: e.target.value as TFilterValue
          })
        }
        value={String(filterBy[option])}
      >
        <option value='None'></option>
        {values.map((value, index) => (
          <option
            key={index}
            value={value}
            style={{ textTransform: 'capitalize' }}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
export default FilterOption

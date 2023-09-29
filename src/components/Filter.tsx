import { characterFilterMap } from '../utils/filter'
import FilterOption from './FilterOption'

const Filter = () => {
  return (
    <div>
      {Array.from(characterFilterMap).map(
        ([filterOption, possibleValues], index) => (
          <FilterOption
            key={index}
            option={filterOption}
            values={possibleValues}
          />
        )
      )}
    </div>
  )
}

export default Filter

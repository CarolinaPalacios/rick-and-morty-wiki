import { usePaging } from '../customHooks/usePaging'
const Paging = () => {
  const { pagingInfo, useSetNextPage, useSetPrevPage } = usePaging()
  if (pagingInfo.count !== 0) {
    return (
      <div>
        {pagingInfo.prev.page && <button onClick={useSetPrevPage}>Prev</button>}
        {pagingInfo.current} of {pagingInfo.pages}
        {pagingInfo.next.page && <button onClick={useSetNextPage}>Next</button>}
      </div>
    )
  }
}

export default Paging
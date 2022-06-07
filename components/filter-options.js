function VenueCheckbox({ venue, checked, onChange }) {
  return(<div className='mr-2'>
    <label>
      <span className='mr-1'><input type='checkbox' value={venue} checked={checked} onChange={onChange} /></span>
      <span>{venue}</span>
    </label>
  </div>)
}

function VenueList({ allVenues, selectedVenues, updateFilters }) {
  const onChange = ({ target }) => {
    const updatedSelectedVenues = target.checked ?
      [...selectedVenues, target.value] :
      selectedVenues.filter((venue) => venue !== target.value)

    updateFilters({ venues: updatedSelectedVenues })
  }

  return (
    <div className='grow flex flex-row flex-wrap'>
      {allVenues.map((venue) => <VenueCheckbox venue={venue} checked={selectedVenues.includes(venue)} onChange={onChange} />)}
    </div>
  )
}

function DateSelector({ days, updateFilters, selectedDate }) {
  const findDateIndex = (date) => days.findIndex((day) => day.getDate() === date.getDate())

  const yesterdayOnClick = () => {
    const yesterdayDateIdx = findDateIndex(selectedDate) - 1

    if(yesterdayDateIdx >=0) {
      updateFilters({ date: days[yesterdayDateIdx] })
    }
  }

  const tomorrowOnClick = () => {
    const tomorrowDateIdx = findDateIndex(selectedDate) + 1

    if(tomorrowDateIdx < days.length) {
      updateFilters({ date: days[tomorrowDateIdx] })
    }
  }

  return(<div className='flex-none flex flex-row items-center px-4'>
    <a className='pr-2 text-sm text-sky-500' href='#' onClick={yesterdayOnClick}>Yesterday</a>
    <h3 className='text-2xl font-medium'>{selectedDate.toDateString()}</h3>
    <a className='pl-2 text-sm text-sky-500' href='#' onClick={tomorrowOnClick}>Tomorrow</a>
  </div>)
}

const venuesFromEvents = (events) => [...new Set(events.map(({ venue }) => venue))].sort()

const timestampToDate = (timestamp) => new Date(timestamp).setHours(0, 0, 0, 0)
const daysFromEvents = (events) => [...new Set(
  events.map(({ start_date }) => timestampToDate(start_date))
)].sort().map((ts) => new Date(ts))

export default function FilterOptions({ events, filters, setFilters }) {
  const allVenues = venuesFromEvents(events)
  const days = daysFromEvents(events)

  const updateFilters = (updatedValues) => {
    setFilters({
      ...filters,
      ...updatedValues
    })
  }

  return (
    <div className='flex flex-row p-2 h-20 w-full items-center fixed bottom-0 left-0'>
      <DateSelector days={days} updateFilters={updateFilters} selectedDate={filters.date} />
      <VenueList allVenues={allVenues}  updateFilters={updateFilters} selectedVenues={filters.venues} />
    </div>
  )
}

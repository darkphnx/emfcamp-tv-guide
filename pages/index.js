import Head from 'next/head'
import Image from 'next/image'
import { parse } from 'postcss'
import ScheduleGrid from '../components/schedule-grid'
import FilterOptions from '../components/filter-options'

import { useEffect, useState } from 'react'

const SCHEDULE_URL = 'https://www.emfcamp.org/schedule/2022.json'
const OFFICIAL_VENUES = ['Stage A', 'Stage B', 'Stage C', 'Workshop 1', 'Workshop 2', 'Workshop 3', 'Workshop 4', 'Workshop 5']
const OFFICIAL_START_DATE = new Date(2022, 5, 3)

export default function Home() {
  const [events, setEvents] = useState([])
  const [filters, setFilters] = useState({
    venues: OFFICIAL_VENUES,
    date: OFFICIAL_START_DATE,
  })

  const fetchEvents = async () => {
    const res = await fetch(SCHEDULE_URL)
    const parsedEvents = await res.json()

    setEvents(parsedEvents)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const filterByVenue = ({ venue }) => (
    filters.venues.includes(venue)
  )

  const filterByDate = ({ start_date }) => (
    new Date(start_date).getDate() === filters.date.getDate()
  )

  const filteredEvents = events
    .filter(filterByVenue)
    .filter(filterByDate)

  return (
    <div className='container mx-0'>
      <Head>
        <title>emfcamp tv guide</title>
        <meta name="description" content="emfcamp schedule in a tv guide format" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ScheduleGrid events={filteredEvents} />

      <FilterOptions events={events} filters={filters} setFilters={setFilters} />
    </div>
  )
}

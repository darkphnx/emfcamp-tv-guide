import Head from 'next/head'
import Image from 'next/image'
import { parse } from 'postcss'
import ScheduleGrid from '../components/schedule-grid'
// import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react'

export default function Home() {
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    const res = await fetch('https://www.emfcamp.org/schedule/2022.json')
    const parsedEvents = await res.json()

    setEvents(parsedEvents)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const todaysEvents = events.filter((event) => {
    const parsedStartDate = new Date(event.start_date)
    const now = new Date('2022-01-03')

    return parsedStartDate.getDate() === now.getDate()
  })

  return (
    <div className='container mx-0'>
      <Head>
        <title>emfcamp tv guide</title>
        <meta name="description" content="emfcamp schedule in a tv guide format" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ScheduleGrid events={todaysEvents} />
    </div>
  )
}

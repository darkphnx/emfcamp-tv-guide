import EventCard from './schedule-grid/event-card'
import GridHeading from './schedule-grid/grid-heading'

const START_HOUR = 9 // 9am
const END_HOUR = 26 // 2am
const HOURS_IN_DAY = 24
const MINUTES_IN_HOUR = 60
const WIDTH_PER_COLUMN = "0.75rem"

function HourName({ hour }) {
  const fullTime = `${String(hour).padStart(2, '0')}:00`

  const positioningStyle = {
    gridRow: 'hours',
    gridColumn: `time-${fullTime.replace(':', '')} / span ${MINUTES_IN_HOUR}`,
    position: 'sticky',
    top: 0,
  }

  return <div style={positioningStyle}>
    <GridHeading name={fullTime} direction='row'></GridHeading>
  </div>
}

export function VenueName({ venue }) {
  const venueRow = venue.replace(/\s/g, '-')
  const positioningStyle = {
    gridColumn: 'venue',
    gridRow: venueRow,
    position: 'sticky',
    left: 0,
  }

  return <div style={positioningStyle}>
    <GridHeading name={venue} direction='column' />
  </div>
}

function EventPosition({ start_time, end_time, venue, children }) {
  const startColumn = `time-${start_time.replace(':', '')}`
  const endColumn = `time-${end_time.replace(':', '')}`
  const venueRow = venue.replace(/\s/g, '-')

  const positioningStyle = {
    gridColumn: `${startColumn} / ${endColumn}`,
    gridRow: `${venueRow}`
  }

  return (
    <div style={positioningStyle}>
      {children}
    </div>
  )
}

const venuesFromEvents = (events) => [...new Set(events.map((event) => event.venue))].sort()

const hoursInSchedule = () => {
  const hours = []

  for(let hour = START_HOUR; hour < END_HOUR; hour++) {
    const adjustedHour = hour % HOURS_IN_DAY // allows for 2am to be hour 26 for example
    hours.push(adjustedHour)
  }

  return hours
}

const minutesInSchedule = (scheduleHours) => {
  const minutes = []

  scheduleHours.forEach((adjustedHour) => {
    for(let minute = 0; minute < MINUTES_IN_HOUR; minute += 1) {
      const timestamp = String(adjustedHour).padStart(2, '0') + String(minute).padStart(2, '0')

      minutes.push(timestamp)
    }
  })

  return minutes
}

export default function ScheduleGrid({ events }) {
  const venues = venuesFromEvents(events)
  const scheduleHours = hoursInSchedule()
  const scheduleMinutes = minutesInSchedule(scheduleHours)

  // Create a row for every venue in the schedule
  const venueTemplateRows = venues.map((venue) => {
    const venueId = venue.replace(/\s/g, '-')
    return `[${venueId}] 1fr`
  })
  const gridTemplateRows = ['[hours] min-content', ...venueTemplateRows]

  const timeTemplateColumns = scheduleMinutes.map((timestamp) => `[time-${timestamp}] ${WIDTH_PER_COLUMN}`)
  const gridTemplateColumns = ['[venue] max-content', ...timeTemplateColumns]

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns.join(' '),
    gridTemplateRows: gridTemplateRows.join(' '),
  }

  return (
    <div style={gridStyle} className="items-stretch justify-items-stretch w-max bg-sky-100">
      {venues.map((venue) => <VenueName venue={venue} />)}
      {scheduleHours.map((hour) => <HourName hour={hour} />)}
      {events.map((event) => <EventPosition {...event}><EventCard {...event} /></EventPosition>)}
    </div>
  )
}

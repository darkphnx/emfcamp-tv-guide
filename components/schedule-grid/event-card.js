export default function EventCard({ title, start_time, end_time, venue, speaker }) {
  return(
    <div className='h-full w-full flex flex-col p-2 border-solid border-2 border-sky-500 bg-sky-200 text-sky-900' title={title}>
      <h3 className='text-sm font-medium truncate'>{title}</h3>
      <p className='text-sm mb-2 truncate'>{speaker}</p>
      <p className='text-xs mt-auto'>
        <span className='font-bold mr-1'>{venue}</span>
        {start_time} &mdash; {end_time}
      </p>
    </div>
  )
}

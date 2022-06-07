export default function GridHeading({ name, direction }) {
  const borderWidth = direction === 'column' ? 'border-r-2' : 'border-b-2'
  const textAlign = direction === 'column' ? 'text-right' : 'text-left'

  return(
    <div className={`h-full w-full flex flex-col justify-center p-2 border-dashed ${borderWidth} border-sky-500 bg-sky-100 text-sky-900 ${textAlign}`}>
      <h3 className='text-base font-medium'>{name}</h3>
    </div>
  )
}

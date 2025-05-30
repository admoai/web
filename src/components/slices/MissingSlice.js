export default function MissingSlice({ slice }) {
  if (!slice) return null
  return (
    <section className='flex justify-center items-center h-24 mb-8 relative'>
      <div className='absolute inset-0 bg-green animate-pulse' />
      <div className='relative font-mono text-24'>
        The slice <strong>{slice._type}</strong> is missing
      </div>
    </section>
  )
}

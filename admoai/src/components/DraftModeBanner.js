export default function DraftModeBanner() {
  return (
    <div className='fixed bottom-2 text-center left-1/2 -translate-x-1/2 bg-black rounded-md text-white font-sans z-[9999] p-2 px-3'>
      🚧 Draft mode enabled 🚧
      <a href='/api/disable-draft' className='inline-block ml-2 underline'>
        click here to disable
      </a>
    </div>
  )
}

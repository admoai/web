export default function Caption({ caption }) {
  if (!caption) return null
  return <figcaption className='text-[0.75rem] mt-2'>{caption}</figcaption>
}

import getPageDataById from './../../server/getPageDataById'
import { use } from 'react'

export const getData = async (preview) => {
  return getPageDataById('error-page-404', preview)
}

export default function Error() {
  const pageData = use(getData())
  if (!pageData?.page) return null
  const {
    page: { title }
  } = pageData

  return (
    <div>
      <h1>{title}</h1>
      <h2>Something went wrong! Page not found!</h2>
    </div>
  )
}

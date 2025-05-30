import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import ErrorBoundary from './ErrorBoundary'
import MissingSlice from './MissingSlice'

export default function groupSlices(page, slices, components) {
  const groups = []
  let group = { slices: [] }
  let index = 0
  let chapterNumber = 1
  let hasChapters = false

  // Start with just one group with no slices
  groups.push(group)

  forEach(slices, (slice) => {
    if (!components[slice._type]) {
      // Add missing slice component
      const component = <MissingSlice key={`section-${index}`} slice={slice} />
      group.slices.push(component)
    }
    const Component = components[slice._type]
    index += 1
    if (Component) {
      const component = (
        <ErrorBoundary key={`slice-${page._id}-${slice._key}`}>
          <Component
            key={`slice-${index}`}
            data={slice}
            page={page}
            colorData={group.colorData}
            first={index === 1}
            firstInGroup={group.slices.length === 0}
            sliceIndex={index}
          />
        </ErrorBoundary>
      )
      group.slices.push(component)
    }
  })

  // If there are chapters, add the chapter count to the page object
  if (hasChapters) page.chapterCount = chapterNumber - 1

  return filter(groups, ({ slices }) => slices.length > 0)
}

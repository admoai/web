import { useCallback } from 'react'
import debounce from 'lodash/debounce'

const DEFAULT_OPTIONS = { leading: false, trailing: true }
const useDebouncedCallback = (fn, wait = 200, dependencies = [], options = DEFAULT_OPTIONS) => useCallback(debounce(fn, wait, options), dependencies) /* eslint-disable-line */

export default useDebouncedCallback

import { atom } from 'jotai'

export const _formOpenAtom = atom(false)
export const formOpenAtom = atom(
  (get) => get(_formOpenAtom),
  (get, set, value) => {
    set(_formOpenAtom, value)
  }
)

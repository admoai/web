import { atom } from 'jotai'

export const _isMenuOpenAtom = atom(false)
export const isMenuOpenAtom = atom(
  (get) => get(_isMenuOpenAtom),
  (get, set, value) => {
    set(_isMenuOpenAtom, value)
  }
)

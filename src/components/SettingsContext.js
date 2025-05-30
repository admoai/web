'use client'

import React, { useContext } from 'react'

export const SettingsContext = React.createContext()

export const useSettings = () => {
  return useContext(SettingsContext)
}

export function SettingsContextProvider ({ settings, ...props }) {
  return <SettingsContext.Provider value={settings} {...props} />
}

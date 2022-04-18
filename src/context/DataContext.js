import React, { useState, createContext } from 'react'

const DataContext = createContext()

export default DataContext

export function DataContextProvider({ children }) {

    // change theme
    const [themeBg, setThemeBg] = useState("")
    const [iconColor, setIconColor] = useState("")

    return (
        <DataContext.Provider value={{
            themeBg,
            iconColor,
            setIconColor,
            setThemeBg,
        }} >
            {children}
        </DataContext.Provider>
    )
}







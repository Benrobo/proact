import React, { useState, createContext } from 'react'

const DataContext = createContext()

export default DataContext

export function DataContextProvider({ children }) {

    // change theme
    const [themeBg, setThemeBg] = useState("")

    return (
        <DataContext.Provider value={{
            themeBg,
            setThemeBg,
        }} >
            {children}
        </DataContext.Provider>
    )
}







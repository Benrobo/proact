import React from 'react'
import { useContext } from 'react'
import DataContext from '../context/DataContext'
import style from "./style.css"

export default function Layout({ children }) {
    const { themeBg } = useContext(DataContext);

    return (
        <div className="main-layout" style={{
            background: themeBg,
        }}>
            {children}
        </div>
    )
}



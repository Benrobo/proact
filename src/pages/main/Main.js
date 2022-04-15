import React, { useState, useEffect, useContext } from 'react'
import FloatingBar from '../../components/FloatingBar/FloatingBar'
import DataContext from '../../context/DataContext';
import Fitness from '../fitness/Fitness';
import Quotes from '../quotes/Quotes';
import "./style.css"


function Main() {
    const { setThemeBg, themeBg, } = useContext(DataContext)
    const [activename, setActiveName] = useState("quotes")

    let element;

    if (activename === "quotes") {
        element = <Quotes />
        setThemeBg("var(--dark3)")
    }
    else if (activename === "fitness") {
        element = <Fitness />
        setThemeBg("var(--fitness-bg)")
    }

    return (
        <div className="main-page">
            {element}
            <FloatingBar setActiveName={setActiveName} activename={activename} themeBg={themeBg} />
        </div>
    )
}

export default Main


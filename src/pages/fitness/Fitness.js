import React, { useState, useEffect, useContext } from 'react'
import DataContext from '../../context/DataContext'
import OnBoarding from './OnBoarding'
import { FitnessDB } from '../../db/DB'
import "./style.css"
import Dashboard from './Dashboard'

const FitDB = new FitnessDB()
FitDB.init();


function Fitness() {
    const { themeBg } = useContext(DataContext)
    const [onboardingVis, setOnboardingVisi] = useState(null);

    let fitnessData = localStorage.getItem("proact-fitness");

    useEffect(() => {
        if (fitnessData !== null) {
            let { userInfo } = JSON.parse(fitnessData)
            if (Object.entries(userInfo).length > 0) {
                return setOnboardingVisi(false);
            }
            setOnboardingVisi(true);
        }
        else {
            setOnboardingVisi(true);
        }
    }, [])

    return (
        <div className="fitness-cont">

            {onboardingVis && <OnBoarding setOnboardingVisi={setOnboardingVisi} />}
            {onboardingVis === false && <Dashboard />}

            {false && <FlashScreen />}
        </div>
    )
}

export default Fitness


function FlashScreen() {

    return (
        <div className="flash-screen">
            <p>FitBro</p>
        </div>
    )
}
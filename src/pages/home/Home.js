import React from 'react'
import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home-cont p-3">
            <Link to={"/dashboard"}>
                <button className="btn btn-primary">Dashboard</button>
            </Link>
        </div>
    )
}

export default Home
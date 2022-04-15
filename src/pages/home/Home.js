import React from 'react'
import { Link } from "react-router-dom"
import "./style.css"

import mockup from "../../assets/img/mockup.png"

function Home() {
    return (
        <div className="home-cont">
            <div className="main">
                <div className="left-cont">
                    <ion-icon name="reorder-three-outline" class="icon"></ion-icon>

                    <div className="bottom">
                        <div className="line"></div>
                        <div className="count active">1</div>
                        <div className="count">2</div>
                        <div className="count">3</div>
                        <div className="line"></div>
                    </div>
                </div>

                <div className="right-cont">
                    <p className='brand'>Proactive</p>
                    <div className="bx-cont">
                        <div className="con">
                            <h1>Making Life Less Ordinary.</h1>
                            <p>

                                The one and only app you would ever need to stay motivated 🥰. ProAct can be classified to be a standalone `App` 😉, unique and efficient `Tools` meant to give you motivation at the right time 🔥.
                            </p>
                            <br />
                            <Link to="/dashboard">
                                <button className="btn start">Get Started</button>
                            </Link>
                        </div>
                    </div>
                    <div className="bx-cont bg-image">
                        <img src={mockup} alt="" />
                    </div>
                </div>
            </div>
            <Features />
            <Section />
        </div>
    )
}

export default Home

function Features() {

    return (
        <div className="features-cont">
            <div className="top-head">
                <div className="line"></div>
                <p>Proactive Features</p>
                <div className="line"></div>
            </div>
            <div className="features-lists">
                <div className="bx">
                    <div className="left m-bg"></div>
                    <div className="right">
                        <div className="top">
                            <p>Motivational Quotes.</p>
                        </div>
                        <div className="body">
                            <span>Make your day feel less ordinary by getting motivation and inspire quotes right at your mail inbox.</span>
                        </div>
                    </div>
                </div>
                <div className="bx">
                    <div className="left">
                        <div className="top">
                            <p>Mood Melody.</p>
                        </div>
                        <div className="body">
                            <span>
                                Music is the soul of life. Listen to heart warming nature feel motivation background music which would drive inspiration into you each day.
                            </span>
                        </div>
                    </div>
                    <div className="right md-bg"></div>
                </div>
                <div className="bx">
                    <div className="left md-bg"></div>
                    <div className="right">
                        <div className="top">
                            <p>Daily Fitness.</p>
                        </div>
                        <div className="body">
                            <span>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus voluptatibus ab autem corrupti doloribus blanditiis, quas eaque quam unde eveniet.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Section() {

    return (
        <div className="section-cont">

        </div>
    )
}
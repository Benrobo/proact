import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import "./style.css"

import mockup from "../../assets/img/mockup.png"
import avatar from "../../assets/img/avatar.png"

function Home() {
    const [pageName, setPageName] = useState("home")

    // open sidebar
    let sidebar;
    const validPageName = ["#home", "#features", "about"]

    const { hash } = window.location
    // console.log(hash);
    useEffect(() => {
        console.log(validPageName.includes(hash));
        if (validPageName.includes(hash) === true) {
            setPageName(hash.replace("#", ""))
        }
        window.location = "#home"
    }, [])

    function openSidebar() {
        sidebar = document.querySelector(".home-sidebar-cont")
        if (sidebar !== undefined) {
            console.log(sidebar);
            sidebar.classList.remove("close")
        }
    }


    return (
        <div className="home-cont">
            <div className="main">
                <div className="left-cont">
                    <ion-icon name="reorder-three-outline" class="icon" onClick={() => openSidebar()}></ion-icon>

                    <div className="bottom">
                        <div className="line"></div>
                        <div className={pageName === "home" ? "count active" : "count"}>1</div>
                        <div className={pageName === "features" ? "count active" : "count"}>2</div>
                        <div className={pageName === "about" ? "count active" : "count"}>3</div>
                        <div className="line"></div>
                    </div>
                </div>

                {pageName === "home" && <div className="right-cont">
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
                </div>}
                {pageName === "features" && <Features />}
                {pageName === "about" && <Section />}
            </div>
            <SideBar setPageName={setPageName} />
        </div>
    )
}

export default Home

function SideBar({ setPageName }) {

    let sidebarRef = useRef()

    const close = () => {
        let { current } = sidebarRef;
        current.classList.add("close")
    }

    function handlePageCont(e) {
        let tgt = e.target.dataset;
        if (Object.entries(tgt).length > 0) {
            const { page } = tgt;
            window.location = `#${page}`;
            setPageName(page);
            close()
        }
    }


    return (
        <div className="home-sidebar-cont close" ref={sidebarRef}>
            <ion-icon name="close" onClick={() => close()} class="icon"></ion-icon>
            <div className="list">
                <li data-page="home" onClick={(e) => {
                    handlePageCont(e)
                }} href="#home">
                    Home
                </li>
                <li data-page="features" onClick={(e) => {
                    handlePageCont(e)
                }} href="#features">
                    Features
                </li>
                <li data-page="about" onClick={(e) => {
                    handlePageCont(e)
                }} href="#about">
                    About
                </li>
            </div>
        </div>
    )
}

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
                    <div className="left m-bg">
                        <div className="count">1</div>
                    </div>
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
                    <div className="right">
                        <div className="count">2</div>
                    </div>
                </div>
                <div className="bx">
                    <div className="left">
                        <div className="count">3</div>
                    </div>
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
        <div className="about-cont">
            <img src={avatar} alt="" />
            <br />
            <h4>Created By <kbd>BENAIAH aka (BENROBO) 🔥</kbd> </h4>
            <br />
            <small>Nothing much about me 🔥.</small>
            <br />
            <button className="btn" onClick={() => window.location = "https://github.com/benrobo"}>Follow Me</button>
        </div>
    )
}
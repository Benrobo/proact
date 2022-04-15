import React, { useState, useEffect, useRef } from 'react'

import "./sidebar.css"

function Sidebar({ hideSidebar, rvis, cvis, fvis, vrvis }) {


    return (
        <div className="sidebar-cont">
            <div className="top-head">
                <ion-icon name="arrow-back" onClick={() => hideSidebar()} class="icon"></ion-icon>
                <p>Motivation</p>
            </div>
            <br />
            <div className="list-cont">
                <div className="head">
                    <p>Application</p>
                </div>
                <div className="list">
                    <li onClick={() => {
                        hideSidebar()
                        rvis(true)
                    }}>
                        <div className="left">
                            <ion-icon name="notifications" class="icon"></ion-icon>
                            <p>Set Reminders</p>
                        </div>
                        <div className="right">
                            <ion-icon name="chevron-forward" class="icon"></ion-icon>
                        </div>
                    </li>
                    <li onClick={() => {
                        hideSidebar()
                        vrvis(true)
                    }}>
                        <div className="left">
                            <ion-icon name="notifications" class="icon"></ion-icon>
                            <p>View Reminders</p>
                        </div>
                        <div className="right">
                            <ion-icon name="chevron-forward" class="icon"></ion-icon>
                        </div>
                    </li>
                    <li onClick={() => {
                        hideSidebar()
                        cvis(true)
                    }}>
                        <div className="left">
                            <ion-icon name="grid" class="icon"></ion-icon>
                            <p>Categories</p>
                        </div>
                        <div className="right">
                            <ion-icon name="chevron-forward" class="icon"></ion-icon>
                        </div>
                    </li>
                    <li onClick={() => {
                        hideSidebar()
                        fvis(true)
                    }}>
                        <div className="left">
                            <ion-icon name="heart" class="icon"></ion-icon>
                            <p>Favorites</p>
                        </div>
                        <div className="right">
                            <ion-icon name="chevron-forward" class="icon"></ion-icon>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
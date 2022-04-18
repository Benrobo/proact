import React, { useEffect, useState } from "react";
import "./style.css";

function $(elm) {
    return document.querySelector(elm);
}

function $all(elm) {
    return Array.from(document.querySelectorAll(elm));
}

function FloatingBar({
    setActiveName,
    activename,
    themeBg,
}) {
    const [active, setActive] = useState(true);

    useEffect(() => {
        // toggle floatign bar
        (() => {
            let burger = document.querySelector(".burger");
            let flbar = document.querySelector(".floating-list");

            if (burger !== null && flbar !== null) {
                burger.addEventListener("click", (e) => {
                    console.log(active);
                    if (active === true) {
                        flbar.style.right = "10px";
                        flbar.style.transition = ".2s ease";
                        setActive(false);
                    } else if (active === false) {
                        flbar.style.right = "-200px";
                        flbar.style.transition = ".2s ease";
                        setActive(true);
                    }
                });
            }
        })();
    }, []);

    return (
        <div className="floating-bar">
            {/* <ion-icon name="grid" class="burger"></ion-icon> */}

            <ul
                className="list floating-list"
                style={{
                    background: themeBg,
                }}
            >
                <li>
                    <ion-icon
                        name="recording"
                        data-classname="quotes"
                        class={
                            activename === "quotes"
                                ?
                                "icon active md hydrated"
                                :
                                "icon md hydrated"
                        }
                        onClick={(e) => {
                            let name = e.target.dataset.classname;

                            if (name !== undefined) {
                                setActiveName(name);
                            }
                        }}
                    ></ion-icon>
                    <div className="tool-tip">Daily Quotes</div>
                </li>
                <li>
                    <ion-icon
                        name="play"
                        data-classname="mood"
                        class={
                            activename === "mood"
                                ? "icon active md hydrated"
                                : "icon md hydrated"
                        }
                        onClick={(e) => {
                            let name = e.target.dataset.classname;

                            if (name !== undefined) {
                                setActiveName(name);
                            }
                        }}
                    ></ion-icon>
                    <span className="tool-tip">Mood</span>
                </li>
                <li>
                    <ion-icon
                        name="bicycle"
                        class={
                            activename === "fitness"
                                ? "icon active md hydrated"
                                : "icon md hydrated"
                        }
                        data-classname="fitness"
                        onClick={(e) => {
                            let name = e.target.dataset.classname;

                            if (name !== undefined) {
                                setActiveName(name);
                            }
                        }}
                    ></ion-icon>
                    <span className="tool-tip">Daily Fitness</span>
                </li>
            </ul>
        </div>
    );
}

export default FloatingBar;

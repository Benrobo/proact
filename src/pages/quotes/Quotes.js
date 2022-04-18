import React, { useState, useEffect, useRef } from "react";
import { toJpeg } from "html-to-image";
import "./style.css";
import Fetch from "../../helpers/fetch";
import quotesData from "../../data/quotes.json";
import quotesTags from "../../data/tags.json";
import Sidebar from "./Sidebar";
import { Reminders, ViewReminders } from "./Reminders";
import Categories from "./Categories";
import Favorites from "./Favorites";
import { RemindersDB, FavoriteDB } from "../../db/DB";
import Notification from "../../helpers/notyf";
import avatar from "../../assets/img/avatar.png"

const notif = new Notification(3000);

// initialized db
const FDB = new FavoriteDB();
const RDB = new RemindersDB();
RDB.init();
FDB.init();

const quotesImages = [
    "quotes-img/1.jpg",
    "quotes-img/2.jpg",
    "quotes-img/3.jpg",
    "quotes-img/4.jpg",
    "quotes-img/5.jpg",
    "quotes-img/6.jpg",
];

const fonts = ["--quote1", "--quote2", "--quote3", "--poppin"];

const QUOTES_FONTSIZE = "20px";

function Quotes() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        // disable active after 5sec
        setTimeout(() => {
            setActive(true);
        }, 4000);
    }, []);

    return <>{active ? <MainScreen /> : <FlashScreen />}</>;
}

export default Quotes;

function MainScreen() {
    const [quoteimage, setQuoteImage] = useState("");
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [catdata, setCategoriesData] = useState([]);
    const [tags, setTags] = useState("");
    const [fontname, setFontName] = useState("");
    const [quoteId, setQuoteId] = useState("");
    const [quotebgimage, setQuoteBgImage] = useState("");
    const [downloadCompVisibility, setDownloadCompVisibility] = useState(false);

    // visibilities
    // view reminders visibility => vrvis
    // reminder visibility => rvis
    // category visibility => cvis
    // favourites visibility => fvis
    const [Rvisibility, setRVisibility] = useState(false);
    const [Cvisibility, setCVisibility] = useState(false);
    const [Fvisibility, setFVisibility] = useState(false);
    const [VRvisibility, setVRVisibility] = useState(false);

    // random images
    function randomImages() {
        let path = "";
        quotesImages.map((img) => {
            let rand = Math.floor(Math.random() * quotesImages.length);
            path = quotesImages[rand];
        });

        setQuoteImage(path);
    }

    function randomFonts() {
        let fontName = "";
        fonts.map((i) => {
            let rand = Math.floor(Math.random() * fonts.length);
            fontName = fonts[rand];
        });
        setFontName(fontName);
    }

    useEffect(() => {
        randomImages();
        randomFonts();
        // get some quotes data
        function getData() {
            if (quotesData.length > 0) {
                let rand = Math.floor(Math.random() * quotesData.length);
                let data = quotesData[rand];
                setData([data]);
                setQuoteId(data.authorId);
            }
        }
        getData();
    }, []);

    // handle random quotes data onclicked
    function handleRandomQuotes() {
        if (quotesData.length > 0) {
            let rand = Math.floor(Math.random() * quotesData.length);
            let data = quotesData[rand];
            setData([data]);
            randomImages();
            randomFonts();
        }
    }

    // Handle Download of quotes
    function handleQuoteDownload(e) {
        setQuoteId(data[0]._id);
        let dataset = e.target.parentElement.parentElement.parentElement.dataset;

        if (Object.entries(dataset).length > 0) {
            let path = dataset.bg_image;
            setQuoteBgImage(path);
            setDownloadCompVisibility(true);
        }
    }

    // show sidebar
    function showSidebar() {
        let sidebar = document.querySelector(".sidebar-cont");
        sidebar.classList.add("visible");
    }

    // hide sidebar
    function hideSidebar() {
        let sidebar = document.querySelector(".sidebar-cont");
        sidebar.classList.remove("visible");
    }

    // function add quote to favorites
    function addFavorites(e) {
        let tgt =
            e.target.parentElement.parentElement.querySelector(
                ".quote-text-cont"
            ).dataset;
        let tgtImage = e.target.parentElement.parentElement.parentElement.dataset;

        if (Object.entries(tgt).length > 0) {
            let { bg_image } = tgtImage;
            let { id, quote_text } = tgt;

            const filtData = data.filter((quote) => quote._id === id)[0];

            const savedData = {
                _id: filtData._id,
                category: filtData.tags[0],
                image: bg_image,
                text: quote_text,
                font: fontname,
                author: filtData.author
            };

            const savedResult = FDB.postData(savedData);

            if (savedResult) {
                if (savedResult.error === true) {
                    return notif.error(savedResult.message);
                }

                if (savedResult.addedStatus === false) {
                    return setFavorites({});
                }
                setFavorites(savedResult.addedQuote)
            }
        }
    }

    // show sharecont
    function toggleShareCont() {
        let shareCont = document.querySelector(".share-cont")
        let main = document.querySelector(".share-main-cont")
        setTimeout(() => {
            shareCont.style.display = "flex"
        }, 200);
        setTimeout(() => {
            main.classList.add("visibility")
        }, 300);
    }

    return (
        <div className="main-screen">
            <div
                className="quote-box"
                style={{
                    backgroundImage: `url(${quoteimage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                data-bg_image={quoteimage}
            >
                <div className="ovl">
                    <div className="top">
                        <ion-icon
                            name="menu"
                            onClick={() => {
                                showSidebar(true);
                            }}
                            class="icon menu"
                        ></ion-icon>
                    </div>
                    <div className="main-text-screen">
                        {data && data.length === 0 ? (
                            <p>No quotes Available</p>
                        ) : (
                            data.map((list) => {
                                return (
                                    <div
                                        key={list._id}
                                        className="quote-text-cont"
                                        data-id={list._id}
                                        data-quote_text={list.content}
                                    >
                                        <p
                                            className="quote"
                                            style={{
                                                fontSize: `${list.content.length > 150 ? QUOTES_FONTSIZE : ""
                                                    }`,
                                                fontFamily: `var(${fontname})`,
                                            }}
                                        >
                                            {list.content}
                                        </p>
                                        <span className="author">
                                            {" "}
                                            - by: <b>{list.author}</b>
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="bottom">
                        <ion-icon name="notifications" class="bell icon" onClick={() => setRVisibility(true)}></ion-icon>
                        <ion-icon
                            name="play-forward"
                            onClick={() => {
                                handleRandomQuotes();
                            }}
                            class="icon next"
                        ></ion-icon>
                        <ion-icon name="share" onClick={() => toggleShareCont()} class="icon share"></ion-icon>
                    </div>
                    <div className="right">
                        <ion-icon
                            name={
                                Object.entries(favorites).length === 0 ?
                                    "heart-outline"
                                    :
                                    Object.entries(favorites).length > 0 && data.length > 0 ?
                                        favorites._id === data[0]._id ?
                                            "heart"
                                            :
                                            "heart-outline"
                                        :
                                        "heart-outline"
                            }
                            onClick={(e) => addFavorites(e)}
                            class="icon heart"
                        ></ion-icon>
                        <ion-icon
                            name="download"
                            class="icon download"
                            onClick={(e) => handleQuoteDownload(e)}
                        ></ion-icon>
                    </div>
                </div>
            </div>

            {/* Download component */}
            {downloadCompVisibility && (
                <ImageDownload
                    quoteid={quoteId}
                    quoteFont={fontname}
                    quotebgimage={quotebgimage}
                    setVisibility={setDownloadCompVisibility}
                />
            )}
            <Sidebar
                rvis={setRVisibility}
                cvis={setCVisibility}
                fvis={setFVisibility}
                vrvis={setVRVisibility}
                hideSidebar={hideSidebar}
            />
            {Rvisibility && <Reminders rvis={setRVisibility} />}
            {Cvisibility && <Categories cvis={setCVisibility} />}
            {Fvisibility && <Favorites fvis={setFVisibility} />}
            {VRvisibility && <ViewReminders vrvis={setVRVisibility} />}
            <ShareQuote />
        </div>
    );
}

function ImageDownload({ quoteid, quoteFont, quotebgimage, setVisibility }) {
    const [data, setData] = useState([]);
    const quoteRef = useRef(null);
    // get quotes based on id
    useEffect(() => {
        function getQuoteData() {
            const quoteData = quotesData.filter((quotes) => quotes._id === quoteid);
            setData(quoteData);
            console.log(quoteData);
        }
        getQuoteData();
    }, []);

    function handleQuoteDownload() {
        // const comp = document.querySelector(".quote-download");
        toJpeg(quoteRef.current)
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.download = "motivational-quote.png";
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error("oops, something went wrong!", error);
            });
    }

    return (
        <div className="download-section">
            <div
                className="quote-download"
                style={{
                    backgroundImage: `url(${quotebgimage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                data-bg_image={quotebgimage}
                ref={quoteRef}
            >
                <div className="ovl">
                    <div className="main-text-screen">
                        {data && data.length == 0 ? (
                            <p>No quotes Available</p>
                        ) : (
                            data.map((list) => {
                                return (
                                    <div key={list._id} data-id={list._id}>
                                        <p
                                            className="quote"
                                            style={{
                                                fontSize: `${list.content.length > 150 ? QUOTES_FONTSIZE : ""
                                                    }`,
                                                fontFamily: `var(${quoteFont})`,
                                            }}
                                        >
                                            {list.content}
                                        </p>

                                        <span className="author">
                                            {" "}
                                            - by: <b>{list.author}</b>
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* download section */}
            <div className="actions">
                <ion-icon
                    name="download"
                    class="icon download"
                    onClick={(e) => handleQuoteDownload(e)}
                ></ion-icon>
                <ion-icon
                    name="close"
                    class="icon close-btn"
                    onClick={() => setVisibility(false)}
                ></ion-icon>
            </div>
        </div>
    );
}

function FlashScreen() {
    return (
        <div className="q-flash-screen">
            <div className="bx">
                <ion-icon name="ellipse" class="icon"></ion-icon>
                <h4>
                    {" "}
                    <span className="clr">Q</span>uotey
                </h4>
            </div>
        </div>
    );
}

function ShareQuote() {

    const modalRef = useRef()
    const mainRef = useRef()
    let modal = modalRef.current
    let main = mainRef.current

    function close() {

        setTimeout(() => {
            modal.style.display = "none"
        }, 200);
        main.classList.toggle("visibility")
    }

    return (
        <div className="share-cont" ref={modalRef}>
            <div className="main share-main-cont" ref={mainRef}>
                <div className="head">
                    <img src={avatar} alt="" className="img" />
                </div>
                <br />
                <h2>Sorry feature not available.</h2>
                <small>Try downloading as image then share as pics.</small>
                <br />
                <button className="btn close-btn" onClick={() => close()}>Close</button>
            </div>
        </div>
    )
}
import React, { useState, useEffect, useRef } from 'react'
import { toJpeg } from 'html-to-image';
import quotesData from "../../data/quotes.json"
import quotesTags from "../../data/tags.json"
import "./CFR.css"
import { requestForToken } from "../../firebase/firebase"
import Notification from '../../helpers/notyf'
import { validateEmail } from '../../helpers/util'
import { FavoriteDB } from '../../db/DB'
import { UUID } from '../../helpers/util'

const FDB = new FavoriteDB()

const notif = new Notification(3000)

const quotesImages = [
    "quotes-img/1.jpg",
    "quotes-img/2.jpg",
    "quotes-img/3.jpg",
    "quotes-img/4.jpg",
    "quotes-img/5.jpg",
    "quotes-img/6.jpg",
]

const fonts = [
    "--quote1",
    "--quote2",
    "--quote3",
    "--poppin",
]
const QUOTES_FONTSIZE = "30px"


function Favorites({ fvis }) {

    const [favData, setFavData] = useState([])
    const [error, setError] = useState("")
    const [modal, setModal] = useState(false)
    const [bgimage, setBgImage] = useState("")
    const [font, setFont] = useState("")
    const [qid, setQid] = useState("")

    const modalRef = useRef()

    function getData() {
        const result = FDB.getfavorites;
        console.log(result);
        if (result && result.error === true) {
            setError(result.message);
            return setFavData([])
        }
        setFavData(result.data.favorites)
    }

    useEffect(() => {
        getData()
    }, [])


    function handleTargetQuote(e) {
        let tgt = e.target;
        if (tgt.classList.contains("ovl")) {
            let child = tgt.parentElement;
            const dataset = child.dataset;

            if (Object.entries(dataset).length > 0) {
                const { bg_image, font, id } = dataset;
                setFont(font)
                setBgImage(bg_image)
                setQid(id);
                setModal(true)
            }
        }
    }

    return (
        <div className="fav-cont">
            <div className="top-head">
                <ion-icon name="arrow-back" onClick={() => fvis(false)} class="icon"></ion-icon>
                <p>Favourites</p>
            </div>
            <div className="fav-body">
                {
                    favData && favData.length === 0 ?
                        <p className="p-4">No Favorite Quote Available</p>
                        :
                        favData.map((fav) => {
                            return (
                                <div className="f-card"
                                    style={{
                                        backgroundImage: `url(${fav.image})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                    onClick={(e) => handleTargetQuote(e)}
                                    data-id={fav._id}
                                    data-font={fav.font}
                                    data-bg_image={fav.image}
                                >
                                    <div className="ovl" >
                                        <div className="main-text">
                                            <h1 className='quote' style={{
                                                fontFamily: `var(${fav.font})`
                                            }}>{fav.text}</h1>
                                            <p className='author'> -{fav.author}</p>
                                        </div>

                                        <span className="category">
                                            {fav.category}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>

            {modal && <FavouriteModal setFavData={setFavData} setVisibility={setModal} quoteFont={font} quotebgimage={bgimage} quoteid={qid} />}
        </div>
    )
}

export default Favorites

function FavouriteModal({ quoteid, quoteFont, quotebgimage, setVisibility, setFavData }) {
    const [data, setData] = useState([]);
    const quoteRef = useRef(null)
    // get quotes based on id
    useEffect(() => {
        function getQuoteData() {
            const quoteData = quotesData.filter((quotes) => quotes._id === quoteid)
            console.log(quoteData);
            setData(quoteData)
        }
        getQuoteData()

    }, [])

    function handleQuoteDownload() {
        toJpeg(quoteRef.current)
            .then(function (dataUrl) {
                const link = document.createElement('a')
                link.download = 'motivational-quote.png'
                link.href = dataUrl
                link.click()

                notif.success("Downloaded...")
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }


    function deleteFavorite() {

        const res = FDB.deleteById(quoteid);
        if (res && res.error === true) {
            notif.error(res.message)
            return
        }
        setFavData(res.data.favorites)
        setVisibility(false)
        notif.success(res.message)
    }

    return (
        <div className="download-section">
            <div className="quote-download" style={{
                backgroundImage: `url(${quotebgimage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} data-bg_image={quotebgimage} ref={quoteRef}>
                <div className="ovl">
                    <div className="main-text-screen">
                        {
                            data && data.length == 0 ?
                                <p>No quotes Available</p>
                                :
                                data.map((list) => {
                                    return (
                                        <div key={list._id} data-id={list._id}>
                                            <h1 className='quote' style={{
                                                fontSize: `${list.content.length > 20 ? QUOTES_FONTSIZE : ""}`,
                                                fontFamily: `var(${quoteFont})`
                                            }}>
                                                {list.content}
                                            </h1>

                                            <span className="author"> - by: <b>{list.author}</b></span>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>

            {/* download section */}
            <div className="actions">
                <ion-icon name="trash-bin" class="icon close-btn" onClick={(e) => {
                    deleteFavorite()
                }}></ion-icon>
                <ion-icon name="download" class="icon download" onClick={(e) => handleQuoteDownload(e)}></ion-icon>
                <ion-icon name="close" class="icon close-btn" onClick={() => setVisibility(false)}></ion-icon>
            </div>
        </div>
    )
}
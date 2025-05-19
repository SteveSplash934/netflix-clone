import React, { useRef, useEffect, useState } from 'react'
import './TitleCard.css'
import card_data from '../../assets/cards/Cards_data';

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDMxOTM4NDMxY2U2ZTA3ZWIwOWYyMDQ5MTcxZjM5NCIsIm5iZiI6MTc0NzY2MzAzNi43ODMsInN1YiI6IjY4MmIzOGJjYjYwMGI1YmU0NThjMDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TbgqQfRswmKfrzNeP9LeEHh8EGYbdaDle5RD5KrYZFA'
        }
    };

    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));
        cardsRef.current.addEventListener('wheel', handleWheel);
    }, []);

    return (
        <div className="title-cards">
            <h2 className='card-category-title'>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {
                    apiData.map((card, index) => {
                        return <div className="card" key={index}>
                            <img src={"https://image.tmdb.org/t/p/w500/" + card.backdrop_path} alt="" />
                            <p>{card.original_title}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default TitleCards

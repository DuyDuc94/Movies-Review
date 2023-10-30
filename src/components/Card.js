import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API_IMAGE_BASE_URL } from "../config/DotEnv"
import CardStyle from "./css/Card.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default function Card({ movie }) {

    return (
        <>
            {
                
                <div className={CardStyle.card}>
                    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <img className={CardStyle.card_img} src={movie && (API_IMAGE_BASE_URL + '/original' + movie.poster_path)} alt={movie.title} />
                        <div className={CardStyle.card_overlay}>
                            <div className={CardStyle.card_title}>{movie && movie.original_title}</div>
                            <div className={CardStyle.card_release_date}>
                                {movie && movie.release_date}
                                <span className={CardStyle.card_rating}>{movie && movie.vote_average}<FontAwesomeIcon icon={faStar} /></span>
                            </div>
                            <div className={`${CardStyle.card_description} ${CardStyle.crop_text_3}`}>
                                {movie && movie.overview}
                            </div>
                        </div>
                    </Link>
                </div>
            }
        </>
    );
}
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import movieAPI from "../api/MovieAPI"
import { Col, Container, Row } from "react-bootstrap"
import MovieListStyle from "./css/MovieList.module.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import CardStyle from "../components/css/Card.module.css"

export default function MovieList() {

    const { type } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
    }, [type]);

    useEffect(() => {
        setTimeout(() => {
            movieAPI.get(`/movie/${type}?language=en-US`)
                .then(res => {
                    setMovieList(res.data.results)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }, 500)
    }, [isLoading])

    return (
        <Container>
            <Row>
                <h2 className={MovieListStyle.list_title}>{type.toUpperCase()}</h2>
            </Row>
            <Row>
                <Col className={MovieListStyle.list_cards}>
                    {
                        isLoading ?
                            <ListSkeleton /> :
                            (movieList.length !== 0 && movieList.map((movie) => (
                                <Card movie={movie} key={movie.id} />
                            )))
                    }
                </Col>
            </Row>
        </Container>
    )
}

function ListSkeleton({ number = 10 }) {
    let cards = Array(number).fill(0);
    return (
        <>
            {
                cards.map((card, index) => {
                    return (
                        <SkeletonTheme key={index} baseColor="#202020" highlightColor="#444">
                            <div className={CardStyle.card_skeleton}>
                                <Skeleton height={'40vh'} />
                            </div>
                        </SkeletonTheme>
                    );
                })
            }
        </>
    );
}

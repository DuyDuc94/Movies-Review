import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import movieAPI from "../api/MovieLocalDbAPI"
import { Col, Container, Pagination, Row } from "react-bootstrap"
import MovieListStyle from "./css/MovieList.module.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import CardStyle from "../components/css/Card.module.css"

export default function MovieList() {

    const { type } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        movieAPI.get(`/movies?_page=${page}&_limit=10`)
            .then(res => {
                console.log(res);
                setMovieList(res.data);
                setTotalPage(Math.ceil(parseInt(res.headers['x-total-count']) / 10));
            })
            .catch(err => console.log(err))
            .finally(() =>
                setTimeout(() => setLoading(false), 1000)
            )
    }, [])

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
            <Row className="mt-5">
                <Col>
                    <Pagination>
                        <Pagination.First/>
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis disabled />

                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{page}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>

                        <Pagination.Ellipsis disabled />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
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

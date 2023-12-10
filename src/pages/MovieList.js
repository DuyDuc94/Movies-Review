import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import movieAPI from "../api/MovieLocalDbAPI"
import { Col, Container, Pagination, Row } from "react-bootstrap"
import MovieListStyle from "./css/MovieList.module.css"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import CardStyle from "../components/css/Card.module.css"

export default function MovieList() {
    const { genreId } = useParams();

    const [isLoading, setLoading] = useState(false);
    const [genre, setGenre] = useState(undefined);
    const [pagination, setPagination] = useState({
        'movieList': [],
        'totalPage': 0,
        'limit': 8,
        'activePage': 1,
    });

    useEffect(() => {
        setLoading(true);
        movieAPI.get(`/genres/${genreId}`)
            .then(res => {
                setGenre(res.data);
                setPagination(pre => ({
                    ...pre,
                    'activePage': 1
                }));
            })
            .catch(err => console.log(err))
    }, [genreId]);

    useEffect(() => {
        getMovieList();
    }, [genre, pagination.activePage, pagination.limit])

    function getMovieList() {
        setLoading(true);
        movieAPI.get(`/movies?genreId_like=${genreId}&_page=${pagination.activePage}&_limit=${pagination.limit}`)
            .then(res => {
                if (res.data.length !== 0) {
                    setPagination(pre => ({
                        ...pre,
                        'movieList': res.data,
                        'totalPage': Math.ceil(parseInt(res.headers['x-total-count']) / pagination.limit)
                    }));
                } else {
                    setPagination(pre => ({
                        ...pre,
                        'movieList': [],
                        'totalPage': 0
                    }));
                }
            })
            .catch(err => console.log(err))
            .finally(() =>
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            );
    };

    function handleChangePage(e) {
        setPagination(pre => ({
            ...pre,
            'activePage': parseInt(e.target.innerText)
        }));
    }

    return (
        <>
            <Row className="flex-column">
                <h2 className={MovieListStyle.list_header}>{genre && genre.name.toUpperCase()}</h2>
                <p className={MovieListStyle.list_header}>
                    {`Showing ${pagination.movieList.length !== 0 ? pagination.activePage : 0} of ${pagination.totalPage}`}
                </p>
            </Row>
            <Row>
                <Col className={MovieListStyle.list_cards}>
                    {
                        isLoading ?
                            <ListSkeleton number={pagination.limit} /> :
                            (
                                pagination.movieList.length !== 0 ? pagination.movieList.map((movie) => (
                                    <Card movie={movie} key={movie.id} />
                                ))
                                    :
                                    <div className={MovieListStyle.list_no_result}>
                                        <h3>No movies found</h3>
                                    </div>
                            )
                    }
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Pagination className="justify-content-center">
                        {
                            Array.from({ length: pagination.totalPage }, (_, index) => {
                                return (
                                    <Pagination.Item key={index} active={pagination.activePage === index + 1} onClick={handleChangePage}> {index + 1} </Pagination.Item>
                                );
                            })
                        }
                    </Pagination>
                </Col>
            </Row>
        </>
    )
}

function ListSkeleton({ number = 8 }) {
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

import { useEffect, useState } from "react";
import movieAPI from "../api/MovieAPI";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import CarouselStyle from './css/Home.module.css';
import { API_IMAGE_BASE_URL } from "../config/DotEnv";

export default function Home(params) {
	const [popularMovies, setPopularMovies] = useState([])

	useEffect(() => {
		movieAPI.get("/movie/popular?language=en-US")
			.then(res => setPopularMovies(res.data.results))
			.catch(err => console.log(err))
	}, [])



	return (
		<>
			<Carousel
				showThumbs={false}
				autoPlay={true}
				transitionTime={3}
				infiniteLoop={true}
				showStatus={false}
			>
				{
					popularMovies.map(movie => (
						<Link key={movie.id} style={{ textDecoration: 'none', color: 'white' }} to={`/movie/${movie.id}`} >
							<div className={CarouselStyle.carousel}>
								<img src={API_IMAGE_BASE_URL + '/original' + (movie && movie.backdrop_path)} alt={movie.title} />
							</div>
							<div className={CarouselStyle.carousel_overlay}>
								<div className={CarouselStyle.carousel_title}>
									{movie && movie.original_title}
								</div>
								<div className={CarouselStyle.carousel_release_date}>
									{movie && movie.release_date}
									<span className={CarouselStyle.carousel_rating}>
										{movie && movie.vote_average}
										<i className="fas fa-star" />{" "}
									</span>
								</div>
								<div className={CarouselStyle.carousel_description}>
									{movie && movie.overview}
								</div>
							</div>
						</Link>
					))
				}
			</Carousel>
			{/* <MovieList /> */}
		</>
	)
};
import { useEffect, useState } from "react";
import movieAPI from "../api/MovieAPI";
import { Carousel } from 'react-responsive-carousel';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { API_IMAGE_BASE_URL } from "../config/DotEnv";
import CarouselStyle from './css/Home.module.css';

export default function Home() {
	const [popularMovies, setPopularMovies] = useState([])

	useEffect(() => {
		setTimeout(() => {
			movieAPI.get("/movie/popular?language=en-US")
				.then(res => setPopularMovies(res.data.results))
				.catch(err => console.log(err))
		}, 1000)
	}, [])

	return (
		<>
			<Carousel
				autoPlay={true}
				transitionTime={3}
				infiniteLoop={true}
				showStatus={false}
				useKeyboardArrows={true}
			>
				{
					popularMovies.length !== 0 ?
						popularMovies.map(movie => (
							<Link key={movie.id} style={{ textDecoration: 'none', color: 'white' }} to={`/movie/${movie.id}`} >
								<div className={CarouselStyle.carousel}>
									<img src={API_IMAGE_BASE_URL + '/original' + (movie && movie.backdrop_path)} alt={movie.title} />
									<div className={CarouselStyle.carousel_top_overlay}>
									</div>
									<div className={CarouselStyle.carousel_bottom_overlay}>
										<div className={CarouselStyle.carousel_title}>
											{movie && movie.original_title}
										</div>
										<div className={CarouselStyle.carousel_release_date}>
											{movie && movie.release_date}
											<span className={CarouselStyle.carousel_rating}>
												{movie && movie.vote_average} <FontAwesomeIcon icon={faStar} />
											</span>
										</div>
										<div className={CarouselStyle.carousel_description}>
											{movie && movie.overview}
										</div>
									</div>
								</div>
							</Link>
						)) : SkeletonCarousel()
				}
			</Carousel>
		</>
	)
};

function SkeletonCarousel() {
	return (
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<div className={CarouselStyle.carousel}>
				<Skeleton height={'90vh'}/>
			</div>
		</SkeletonTheme>
	);
}

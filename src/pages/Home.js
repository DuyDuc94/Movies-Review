import { useEffect, useState } from "react";
import movieAPI from "../api/MovieLocalDbAPI";
import { Carousel } from 'react-responsive-carousel';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { API_IMAGE_BASE_URL } from "../config/DotEnv";
import CarouselStyle from './css/Home.module.css';

export default function Home() {
	const [popularMovies, setPopularMovies] = useState([])

	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		getPopularMovie();
	}, [])

	function getPopularMovie() {
		setLoading(true);
		movieAPI.get("/movies?_sort=view_count&_order=desc&_limit=15")
			.then(res => {
				setPopularMovies(res.data)
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false));
	}

	return (
		<>
			<Carousel
				autoPlay={true}
				showThumbs={false}
				transitionTime={3}
				infiniteLoop={true}
				showStatus={false}
				useKeyboardArrows={true}
			>
				{
					isLoading ? SkeletonCarousel() :
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
						))
				}
			</Carousel>
		</>
	)
};

function SkeletonCarousel() {
	return (
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<div className={CarouselStyle.carousel}>
				<Skeleton height={'90vh'} />
			</div>
		</SkeletonTheme>
	);
}

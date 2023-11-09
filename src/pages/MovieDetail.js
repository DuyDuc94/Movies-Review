import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_IMAGE_BASE_URL } from "../config/DotEnv";
import movieAPI from "../api/MovieLocalDbAPI";
import { Button, Card, Col, Form, Media, Pagination, Row } from "react-bootstrap";
import MovieDetailStyle from "./css/MovieDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHeart, faRefresh, faShare, faStar } from "@fortawesome/free-solid-svg-icons";
import "./css/comment.css";

export default function MovieDetail({ user }) {
	const { id } = useParams();
	const [movieDetail, setMovieDetail] = useState();
	const [genres, setGenres] = useState([]);
	const [users, setUsers] = useState([]);

	const [newComment, setNewComment] = useState({
		'movieId': parseInt(id),
		'userId': user && user.id,
		'rating': 0,
		'comment': "",
		'comment_date': ''
	});

	const [commentsPagination, setComments] = useState({
		'comments': [],
		'limit': 5,
		'totalComments': 0,
		'totalPage': 0,
		'activePage': 1,
	});

	useEffect(() => {
		getUsers().then(() => {
			getGenre().then(() => {
				getMovieDetail().then(() => {
					getComments();
				})
			});
		});
	}, [user])

	useEffect(() => {
		getComments();
	}, [commentsPagination.activePage, movieDetail]);

	async function getGenre() {
		const res = await movieAPI.get('/genres');
		setGenres(res.data);
	}

	async function getMovieDetail() {
		const res = await movieAPI.get('/movies/' + id);
		setMovieDetail(res.data);
	}

	async function getUsers() {
		const res = await movieAPI.get('/users');
		setUsers(res.data);
	}

	async function getComments() {
		const res = await movieAPI.get('/comments?movieId=' + id + `&_page=${commentsPagination.activePage}&_limit=${commentsPagination.limit}&_sort=comment_date,id&_order=desc,desc`);
		setComments(pre => ({
			...pre,
			'comments': res.data,
			'totalComments': parseInt(res.headers['x-total-count']),
			'totalPage': Math.ceil(parseInt(res.headers['x-total-count']) / commentsPagination.limit)
		}));

	}

	function handleChangeComment(e) {
		setNewComment({
			...newComment,
			[e.target.name]: e.target.value
		})
	}

	function handleChangePage(e) {
		setComments(pre => ({
			...pre,
			'activePage': parseInt(e.target.innerText)
		}));
	}

	function handleSubmitComment(e) {
		e.preventDefault();
		movieAPI.post('/comments', {
			...newComment,
			'rating': parseInt(newComment.rating),
			'comment_date': new Date().toISOString().slice(0, 10)
		})
			.then(res => {
				if (res.status === 201) {
					movieAPI.patch('/movies/' + id, {
						'vote_average': Math.round(((movieDetail.vote_average * movieDetail.vote_count) + parseInt(newComment.rating)) / (movieDetail.vote_count + 1) * 1000) / 1000,
						'vote_count': movieDetail.vote_count + 1
					}).then(() => {
						console.log('get new movie');
						getMovieDetail();
					})
					setNewComment({
						'movieId': parseInt(id),
						'userId': user && user.id,
						'rating': 0,
						'comment': "",
						'comment_date': ''
					})
				}
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			<Row className='d-flex flex-column align-items-center'>
				<div className={MovieDetailStyle.movie_intro}>
					<img className='w-100' alt="backdrop" src={`${API_IMAGE_BASE_URL}/original${movieDetail && movieDetail.backdrop_path}`} />
					<div>
					</div>
				</div>
				<Row className={MovieDetailStyle.movie_detail}>
					<Col md={4} className={MovieDetailStyle.movie_detail_left}>
						<img alt="poster" src={`${API_IMAGE_BASE_URL}/original${movieDetail && movieDetail.poster_path}`} />
					</Col>
					<Col md={8} className={MovieDetailStyle.movie_detail_right}>
						<div className={MovieDetailStyle.movie_name}>{movieDetail ? movieDetail.original_title : ""}</div>
						<div className={MovieDetailStyle.movie_rating}>
							{movieDetail && movieDetail.vote_average} <FontAwesomeIcon icon={faStar} />
							<span className={MovieDetailStyle.movie_voteCount}>{movieDetail && `(${movieDetail.vote_count}) votes`}</span>
						</div>
						<div className={MovieDetailStyle.movie_releaseDate}>{movieDetail && "Release date: " + movieDetail.release_date}</div>
						<div className={MovieDetailStyle.movie_genres}>
							{
								movieDetail && movieDetail.genreId.map(g => (
									<span className={MovieDetailStyle.movie_genre} key={g}>{genres && genres.find(genre => genre.id === g).name}</span>
								))
							}
						</div>
						<div className={MovieDetailStyle.synopsis_text}>Synopsis</div>
						<div>{movieDetail && movieDetail.overview}</div>
					</Col>
				</Row>
			</Row>
			<Row className="my-3">
				<Col md={8}>
					<div style={{ borderRadius: '10px', overflow: 'hidden' }}>
						<iframe width={'100%'} height='300' src="https://www.youtube.com/embed/IcNbh3T_tEI" title="Wxrdie - CẦN GÌ NÓI IU [feat. 2pillz] | OFFICIAL MV" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
					</div>
				</Col>
				<Col md={4} className={MovieDetailStyle.action_btn_group}>
					<Button size="lg" className={MovieDetailStyle.action_btn} style={{ border: '1px solid red' }}>
						<FontAwesomeIcon icon={faHeart} /> Add To Favorites
					</Button>
					<Button size="lg" className={MovieDetailStyle.action_btn} style={{ border: '1px solid green' }}>
						<FontAwesomeIcon icon={faShare} /> Share
					</Button>
					<Button size="lg" className={MovieDetailStyle.action_btn}>
						Add To Favorites
					</Button>
				</Col>
			</Row>
			<Row className="my-3">
				{user === undefined ?
					<>
						<Col className="text-center">
							<h4><Link to={'/login'}>Login</Link> to comment</h4>
						</Col>
					</>
					:
					<Col>
						<Row>
							<Col md={2} className="d-flex justify-content-center align-items-center pr-0">
								<img className="rounded-circle" src="https://vaumc.org/wp-content/uploads/2021/06/PicturePlaceholder-1.jpg" alt="user" width={'100px'} />
							</Col>
							<Col className=" pl-0">
								<Form onSubmit={handleSubmitComment}>
									<div className="comment-box ml-2">
										<h4>Add a comment</h4>
										<div className="rating">
											<input type="radio" name="rating" value={10} id="10" onChange={handleChangeComment} checked={newComment.rating === '10'} /><label htmlFor="10">☆</label>
											<input type="radio" name="rating" value={9} id="9" onChange={handleChangeComment} checked={newComment.rating === '9'} /><label htmlFor="9">☆</label>
											<input type="radio" name="rating" value={8} id="8" onChange={handleChangeComment} checked={newComment.rating === '8'} /><label htmlFor="8">☆</label>
											<input type="radio" name="rating" value={7} id="7" onChange={handleChangeComment} checked={newComment.rating === '7'} /><label htmlFor="7">☆</label>
											<input type="radio" name="rating" value={6} id="6" onChange={handleChangeComment} checked={newComment.rating === '6'} /><label htmlFor="6">☆</label>
											<input type="radio" name="rating" value={5} id="5" onChange={handleChangeComment} checked={newComment.rating === '5'} /><label htmlFor="5">☆</label>
											<input type="radio" name="rating" value={4} id="4" onChange={handleChangeComment} checked={newComment.rating === '4'} /><label htmlFor="4">☆</label>
											<input type="radio" name="rating" value={3} id="3" onChange={handleChangeComment} checked={newComment.rating === '3'} /><label htmlFor="3">☆</label>
											<input type="radio" name="rating" value={2} id="2" onChange={handleChangeComment} checked={newComment.rating === '2'} /><label htmlFor="2">☆</label>
											<input type="radio" name="rating" value={1} id="1" onChange={handleChangeComment} checked={newComment.rating === '1'} /><label htmlFor="1">☆</label>
										</div>
										<div className="comment-area">
											<Form.Control as="textarea" rows={'2'} placeholder="Tell us your opinion?" name="comment" onChange={handleChangeComment} value={newComment.comment} required></Form.Control>
										</div>
										<div className="comment-btn">
											<Button className="mx-1" variant="primary" type="reset"><FontAwesomeIcon icon={faRefresh} /> Reset</Button>
											<Button className="mx-1" variant="warning" type="submit"><FontAwesomeIcon icon={faEdit} /> Comment</Button>
										</div>
									</div>
								</Form>
							</Col>
						</Row>
					</Col>
				}
			</Row>
			<Row className="d-flex justify-content-center my-1">
				<Col>
					<Card className="comment-list-card">
						<Card.Header className="comment-list-card-header text-center">
							<h4 className="card-title">Latest Comments</h4>
							<p className="float-right">{commentsPagination.totalComments} comments</p>
						</Card.Header>
						<Card.Body className="comment-list-card-body">
							{
								commentsPagination.comments.map(c => (
									<div key={c.id} className="d-flex flex-row align-content-stretch comment-row">
										<div>
											<img src="https://vaumc.org/wp-content/uploads/2021/06/PicturePlaceholder-1.jpg" alt="user" width="50" className="rounded-circle" />
										</div>
										<div className="comment-text w-100">
											<h5>{
												users && users.find(u => u.id === c.userId).username
											}</h5>
											<span className="m-b-15 d-block">{c.comment}</span>
											<div className="comment-footer mt-1">
												<span className="text-muted float-left">{c.rating}<FontAwesomeIcon icon={faStar} /></span>
												<span className="text-muted float-right">{c.comment_date}</span>
											</div>
										</div>
									</div>
								))
							}
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Pagination className="justify-content-center">
						{
							Array.from({ length: commentsPagination.totalPage }, (_, index) => {
								return (
									<Pagination.Item key={index} active={commentsPagination.activePage === index + 1} onClick={handleChangePage}> {index + 1} </Pagination.Item>
								);
							})
						}
					</Pagination>
				</Col>
			</Row>
		</>
	)
};
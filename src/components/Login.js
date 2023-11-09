import { faFacebookSquare, faGooglePlusSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faKey, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LoginStyle from './css/Login.module.css';
import Register from './Register';

export default function Login({ setUser }) {

	const [userLogin, setUserLogin] = useState({
		'username': localStorage.getItem('username') || '',
		'password': localStorage.getItem('password') || '',
		'remember': localStorage.getItem('username') !== null ? true : false
	});
	const [message, setMessage] = useState('');
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;
		setUserLogin(pre => ({
			...pre,
			[name]: value
		}));
	}

	function handleLogin(e) {
		e.preventDefault();
		setLoading(true);
		setMessage('');
		axios.get(`http://localhost:9999/users?username=${userLogin.username}&password=${userLogin.password}`)
			.then(res => {
				if (res.data[0] !== undefined) {
					setUser(res.data[0]);

					//Handle Remember me (local storage)
					if (userLogin.remember) {
						localStorage.setItem('username', userLogin.username);
						localStorage.setItem('password', userLogin.password);
					} else {
						localStorage.removeItem('username');
						localStorage.removeItem('password');
					}

					//Handle redirect
					setTimeout(() => {
						navigate('/');
					}, 1000);
				}
			})
			.catch(err => console.log(err))
			.finally(() => {
				setTimeout(() => {
					setMessage('Username or password is incorrect');
					setLoading(false)
				}, 1000);
			});
	}

	return (
		<Row className='flex-fill'>
			<Col className="d-flex justify-content-center align-items-center">
				<Card className={LoginStyle.card}>
					<Card.Header>
						<h3>Sign In</h3>
					</Card.Header>
					<Card.Body className='pb-0'>
						<Form onSubmit={handleLogin}>
							<Form.Group>
								<InputGroup>
									<InputGroup.Prepend className={LoginStyle.input_group_prepend}>
										<span>
											<FontAwesomeIcon icon={faUser} />
										</span>
									</InputGroup.Prepend>
									<Form.Control type="text" name="username" placeholder="Enter your username" onChange={handleChange} value={userLogin.username.length !== 0 ? userLogin.username : ''} required />
								</InputGroup>
							</Form.Group>
							<Form.Group>
								<InputGroup>
									<InputGroup.Prepend className={LoginStyle.input_group_prepend}>
										<span>
											<FontAwesomeIcon icon={faKey} />
										</span>
									</InputGroup.Prepend>
									<Form.Control type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={userLogin.password.length !== 0 ? userLogin.password : ''} required />
								</InputGroup>
							</Form.Group>
							<Form.Check type="checkbox" id='Remember Me' label='Remember Me' checked={userLogin.remember} onChange={e => setUserLogin({
								...userLogin,
								'remember': e.target.checked
							})} />
							<div className='pb-3' style={{ textAlign: 'right' }}>
								<Button className={LoginStyle.btn_submit} type='submit'>
									{
										isLoading ? <Spinner as='span' animation="border" size='sm' />
											:
											<>
												<span>
													<FontAwesomeIcon icon={faRightToBracket} /> Sign In
												</span>
											</>
									}
								</Button>
							</div>
						</Form>
						{message.length !== 0 ? <Alert variant='danger' className='text-center'>{message}</Alert> : ''}
					</Card.Body>
					<Card.Footer>
						<div className="d-flex justify-content-center">
							<span>
								Don't have an account? <Link to={'/register'}> Sign Up</Link>
							</span>
						</div>
						<div className="d-flex justify-content-center">
							<Link to={'/'}>Forgot your password?</Link>
						</div>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	);
}

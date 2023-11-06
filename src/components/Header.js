import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form, Button, Nav, Dropdown, InputGroup, Container, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import HeaderStyle from './css/Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import movieAPI from '../api/MovieLocalDbAPI';
import TextStyle from '../assets/css/Text.module.css';


export default function Header() {

	const [genres, setGenres] = useState([]);

	const [notification, setNotification] = useState([]);

	useEffect(() => {
		movieAPI.get("/genres")
			.then(res => setGenres(res.data))
			.catch(err => console.log(err))
	}, []);

	return (
		<Navbar expand={'md'} sticky='top' variant='dark' className={HeaderStyle.header}>
			<Navbar.Brand as={Link} to={'/'}>
				<img className={HeaderStyle.logo} src={logo} alt='logo' />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbar-collapse" />
			<Navbar.Collapse id="navbar-collapse">
				<Nav className='mr-auto'>
					<Nav.Link as={NavLink} to='/popular' style={({ isActive }) => styleActiveLink(isActive)}>Popular</Nav.Link>
					<Nav.Link as={NavLink} to='/top-rated' style={({ isActive }) => styleActiveLink(isActive)}>Top Rated</Nav.Link>
					<Nav.Link as={NavLink} to='/upcoming' style={({ isActive }) => styleActiveLink(isActive)}>Upcoming</Nav.Link>
					<NavDropdown title="Genres" id="basic-nav-dropdown">
						{
							genres.length !== 0 &&
							genres.map(genre => (
								<NavDropdown.Item key={genre.id} as={Link} to={`/genre/${genre.id}`}>{genre.name}</NavDropdown.Item>
							))
						}
						{/* <NavDropdown.Divider /> */}
					</NavDropdown>
				</Nav>
				<RightNav />
			</Navbar.Collapse>
		</Navbar>
	);
}

function styleActiveLink(isActive) {
	return {
		fontWeight: isActive ? "bold" : "",
		textDecoration: 'none',
	};
}

function RightNav() {
	return (
		<>
			<Nav.Link as={Button} className='btn-circle'>
				<FontAwesomeIcon icon={faSearch} />
			</Nav.Link>
			<Dropdown>
				<Dropdown.Toggle as={Button} className="btn-circle">
					<FontAwesomeIcon icon={faBell} />
				</Dropdown.Toggle>
				<Dropdown.Menu align={'right'}>
					<Dropdown.Item href="#">
						<Row style={{ width: '300px' }}>
							<Col md={2}>
								<FontAwesomeIcon icon={faBell} />
							</Col>
							<Col md={10}>
								<h5>
									Notification 1
								</h5>
								<div className={TextStyle.crop_text_2}>
									Notification 1 description
								</div>
							</Col>
						</Row>
					</Dropdown.Item>
					<Dropdown.Item href="#">Settings</Dropdown.Item>
					<Dropdown.Item href="#">Help</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item href="#">Clear</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown>
				<Dropdown.Toggle as={Button} className="btn-circle">
					<FontAwesomeIcon icon={faUser} />
				</Dropdown.Toggle>
				<Dropdown.Menu align={'right'}>
					<Dropdown.Item href="#">Home</Dropdown.Item>
					<Dropdown.Item href="#">Settings</Dropdown.Item>
					<Dropdown.Item href="#">Help</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item href="#">Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
}

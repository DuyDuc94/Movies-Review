import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form, Button, Nav, Dropdown, InputGroup, Container, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import HeaderStyle from './css/Header.module.css';
import { Link } from 'react-router-dom';


export default function Header() {
	return (
		<Navbar expand={'md'} sticky='top' variant='dark' className={HeaderStyle.header}>
			<Navbar.Brand as={Link} to={'/'}>
				<img className={HeaderStyle.logo} src={logo} alt='logo' />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbar-collapse" />
			<Navbar.Collapse id="navbar-collapse">
				<Nav className='mr-auto'>
					<Nav.Link as={Link} to='/popular'>Popular</Nav.Link>
					<Nav.Link as={Link} to='/top_rated'>Top Rated</Nav.Link>
					<Nav.Link as={Link} to='/upcoming'>Upcoming</Nav.Link>
					<NavDropdown title="Other" id="basic-nav-dropdown">
						<NavDropdown.Item as={Link} to={'/1'}>Action</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={'/2'}>Another action</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={'/3'}>Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to={'/4'}>Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<RightNav />
			</Navbar.Collapse>
		</Navbar>
	);
}

function RightNav() {
	return (
		<>
			<Nav.Link as={Button} className='btn-circle'>
				<FontAwesomeIcon icon={faSearch} />
			</Nav.Link>
			<Nav.Link as={Button} className='btn-circle'>
				<FontAwesomeIcon icon={faBell} />
			</Nav.Link>
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

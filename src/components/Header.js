import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form, Button, Nav, Dropdown, InputGroup, Container } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<Container fluid style={{ minHeight: "10vh" }}>
			<Row className='justify-content-around'>
				<Col style={{ margin: '0px 5px' }} >
					<Link to='/'>
						<img src={logo} alt='logo' style={{ height: '75px' }} />
					</Link>
				</Col>
				<Col style={{ margin: '0px 5px' }} className='d-flex flex-column justify-content-center'>
					<InputGroup>
						<Form.Control type='text' placeholder='Search' />
						{/* dropped InputGroupPrepend and InputGroupAppend. Buttons and InputGroupText can now be added as direct children. */}
						<Button variant="outline-secondary" className="btn-circle">
							<FontAwesomeIcon icon={faSearch} />
						</Button>
					</InputGroup>
				</Col>
				<Col style={{ margin: '0px 5px' }} className='d-flex flex-column justify-content-center'>
					<Nav className='justify-content-end'>
						<Nav.Item style={{ margin: '5px 10px' }}>
							<Nav.Link as={Button} className='btn-circle'><FontAwesomeIcon icon={faSearch} /></Nav.Link>
						</Nav.Item>
						<Nav.Item style={{ margin: '5px 10px' }}>
							<Nav.Link as={Button} className='btn-circle'><FontAwesomeIcon icon={faBell} /></Nav.Link>
						</Nav.Item>
						<Nav.Item style={{ margin: '5px 10px' }}>
							<Nav.Link as={Button} className='btn-circle'><FontAwesomeIcon icon={faUser} /></Nav.Link>
						</Nav.Item>
						<Nav.Item style={{ margin: '5px 10px' }}>
							<Dropdown>
								<Dropdown.Toggle as={Button} className="btn-circle">
									<FontAwesomeIcon icon={faBars} />
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item href="#">Home</Dropdown.Item>
									<Dropdown.Item href="#">Settings</Dropdown.Item>
									<Dropdown.Item href="#">Help</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Nav.Item>
					</Nav>
				</Col>
			</Row>
		</Container>
	);
} 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form, Button, Nav, Dropdown } from 'react-bootstrap';
import logo from '../assets/images/logo.png';

export default function Header() {
	return (
		<Row style={{ padding: '15px 30px' }} className='justify-content-around'>
			<Col style={{ margin: '0px 5px' }} >
				<img src={logo} alt='logo' style={{ height: '75px' }} />
			</Col>
			<Col style={{ margin: '0px 5px' }} className='d-flex flex-column justify-content-center'>
				<Form.Control type="text" placeholder="Search" />
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
	);
} 

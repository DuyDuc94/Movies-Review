import { Col, Row, Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col sm={3}></Col>
            <Col sm={2}>
            {/* <img src={LogoImage} /> */}
                <Navbar.Brand href="#home">Disnap</Navbar.Brand>
            </Col>
            <Col sm={2}>
                <Form inline >
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Col>
            <Col sm={2}>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Notification   </Nav.Link>
                        <Nav.Link href="#courses">Search   </Nav.Link>
                        <Nav.Link href="#courses">Profile   </Nav.Link>
                        <Nav.Link href="#courses">About  </Nav.Link>    
                    </Nav>
                </Navbar.Collapse>
            </Col>
            <Col sm={3}></Col>
        </Row>
    )
}
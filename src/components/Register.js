import { faFacebookSquare, faGooglePlusSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faCakeCandles, faEnvelope, faKey, faPenToSquare, faRepeat, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Col, Form, InputGroup, Overlay, Row, Spinner, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterStyle from './css/Register.module.css';

export default function Register() {

    const target = useRef(null);

    const [register, setRegister] = useState({
        'username': '',
        'password': '',
        'email': '',
        'dob': '',
    });

    const [message, setMessage] = useState({
        'usernameError': '',
        'emailError': '',
        'rePasswordError': '',
        'createSuccess': false,
    });

    const [isLoading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setRegister(pre => ({
            ...pre,
            [name]: value
        }));
    }

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        setMessage(pre => ({
            'usernameError': '',
            'emailError': '',
            'rePasswordError': '',
            'createSuccess': false,
        }));
        const isUsernameExist = await checkUsernameExist();
        const isEmailExist = await checkEmailExist();
        if (!isUsernameExist && !isEmailExist) {
            axios.post('http://localhost:9999/users', register)
                .then(res => {
                    if (res.status === 201) {
                        setTimeout(() => {
                            setMessage(pre => ({
                                ...pre,
                                'usernameError': '',
                                'emailError': '',
                                'createSuccess': true
                            }));
                            setLoading(false);
                        }, 1000)
                    }
                })
                .catch(err => console.log(err));
        } else {
            setTimeout(() => {
                setMessage(pre => ({
                    ...pre,
                    'usernameError': isUsernameExist ? 'Username already exist' : '',
                    'emailError': isEmailExist ? 'Email already exist' : '',
                }));
                setLoading(false);
            }, 1000);
        }
    }

    async function checkUsernameExist() {
        try {
            const response = await axios.get(`http://localhost:9999/users?${'username'}=${register.username}`);
            if (response.status === 200 && response.data.length === 0) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
            return true;
        }
    }

    async function checkEmailExist() {
        try {
            const response = await axios.get(`http://localhost:9999/users?${'email'}=${register.email}`);
            if (response.status === 200 && response.data.length === 0) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.log(error);
            return true;
        }
    }

    return (
        <Row className='flex-fill'>
            <Col className="d-flex justify-content-center align-items-center">
                <Card className={RegisterStyle.card}>
                    <Card.Header>
                        <h3>Register</h3>
                    </Card.Header>
                    <Card.Body className='pb-0'>
                        <Form onSubmit={handleRegister}>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend className={RegisterStyle.input_group_prepend}>
                                        <span>
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="username" placeholder="Enter your username" required onChange={handleChange} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend className={RegisterStyle.input_group_prepend}>
                                        <span>
                                            <FontAwesomeIcon icon={faKey} />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="password" name="password" placeholder="Enter your password" required onChange={handleChange} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend className={RegisterStyle.input_group_prepend}>
                                        <span>
                                            <FontAwesomeIcon icon={faRepeat} />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="password" name="re-password" placeholder="Re-enter your password" required
                                        onChange={(e) => {
                                            setMessage(pre => ({
                                                ...pre,
                                                'rePasswordError': (e.target.value === register.password || e.target.value === '') ? '' : 'Password does not match'
                                            }));
                                        }} ref={target} />
                                </InputGroup>
                            </Form.Group>
                            <Overlay target={target.current} show={message.rePasswordError.length !== 0} placement="bottom">
                                {(props) => (
                                    <Tooltip {...props}>
                                        <strong>Password</strong> does not match
                                    </Tooltip>
                                )}
                            </Overlay>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend className={RegisterStyle.input_group_prepend}>
                                        <span>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" name="email" placeholder="Enter your email" required onChange={handleChange} />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend className={RegisterStyle.input_group_prepend}>
                                        <span>
                                            <FontAwesomeIcon icon={faCakeCandles} />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="date" name="dob" required onChange={handleChange} />
                                </InputGroup>
                            </Form.Group>
                            <div className='pb-3' style={{ textAlign: 'right' }}>
                                <Button className={RegisterStyle.btn_submit} type='submit'>
                                    {
                                        isLoading ? <Spinner as='span' animation="border" size='sm' />
                                            :
                                            <>
                                                <span>
                                                    <FontAwesomeIcon icon={faPenToSquare} /> Register
                                                </span>
                                            </>
                                    }
                                </Button>
                            </div>
                        </Form>
                        {message.createSuccess && <Alert variant='success' className='text-center'>Registration completed successfully! <br /> <Link to={'/login'}>Login to continue</Link></Alert>}
                        {message.usernameError.length !== 0 && <Alert variant='danger' className='text-center'>{message.usernameError}</Alert>}
                        {message.emailError.length !== 0 && <Alert variant='danger' className='text-center'>{message.emailError}</Alert>}
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex justify-content-center">
                            <span>
                                Have an account? <Link to={'/register'}> Sign In</Link>
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

import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './template/Login.css';
import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

export default function Login() {
    return (
        // Sử dụng Grid sysstem của Bootstrap để căn giữa 
        <div className="login-container" >
            <div className="login-box" style={{ width: '500px' }}>


                <h3>Login to Disnap</h3>
                <h3>Don't Have An Account?<Link to={'/SignUp'}>Create A Free Account</Link></h3>

                <div style={{ textAlign: 'center' }}>
                    <Button variant="outline-primary">
                        <FaGoogle /> Sign in with Google
                    </Button>
                    <Button variant="outline-primary">
                        <FaFacebook />
                    </Button>
                    <Button variant="outline-primary">
                        <FaApple />
                    </Button>
                </div>

                <div style={{ textAlign: 'center' }}>----------------------or Sign in with----------------------</div>

                <div className="user-box">
                    <Form.Control type="text" placeholder="Your Name" />
                    <Form.Label></Form.Label>
                </div>

                <Form >
                    <div className="user-box">
                        <Form.Control type="text" placeholder="Your Email" />
                        <Form.Label></Form.Label>
                    </div>

                    <div className="user-box">
                        <Form.Control type="password" placeholder="Password" />
                        <Form.Label></Form.Label>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Form.Group className="d-flex justify-content-between" >
                            <Form.Check label="Remember Me" />
                        </Form.Group>
                        <a href='/ForgotPassword'>Forgot Password</a>
                    </div>


                    <span></span>

                    <div style={{ textAlign: 'center' }}>
                        <Button variant="primary" type="submit" style={{ textAlign: 'center', marginLeft: '10px', width: '200px', height: '35px' }}>

                            Login
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}
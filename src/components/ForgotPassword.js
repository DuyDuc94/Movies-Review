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


                <h1 style={{textAlign:'center'}}>Forgot Password?</h1>
                           

                <div style={{textAlign:'Left'}}>Enter your sign up email</div>

                <div className="user-box">
                    <Form.Control type="text" placeholder="Your Name" />
                    <Form.Label></Form.Label>
                </div>


                    <div style={{ textAlign: 'center' }}>
                        <Button variant="primary" type="submit" style={{ textAlign: 'center', marginLeft: '10px', width: '200px', height: '35px' }}>

                            Get OTP
                        </Button>
                    </div>

                
            </div>
        </div>
    )
}
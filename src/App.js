import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import EnterOTP from './components/EnterOTP'
function App() {
  return (
    <BrowserRouter>
    
    <EnterOTP/>

     <Container>
        <Row>        
          <Col>
            <Routes>
              <Route path={'/login'} element={<Login/>} />                     
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
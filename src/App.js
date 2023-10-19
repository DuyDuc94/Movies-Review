import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Container>
          <Header />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
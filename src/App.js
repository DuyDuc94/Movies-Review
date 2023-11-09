import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Login, Register } from './components/Index';
import Error404 from './pages/404';
import { Home, MovieDetail, MovieList, Test } from './pages/Index';

function App() {

  const [user, setUser] = useState(sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : undefined);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Home type={'popular'} />} />
          <Route path="/top-rated" element={<Home type={'top-rated'} />} />
          <Route path="/upcoming" element={<Home type={'upcoming'} />} />
          <Route path="/*" element={
            <>
              <Container className='d-flex flex-column' style={{ minHeight: '90vh' }}>
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login setUser={setUser} />} />
                  <Route path="/genre/:genreId" element={<MovieList />}></Route>
                  <Route path="/movie/:id" element={<MovieDetail user={user} />}></Route>
                  <Route path="/test" element={<Test />}></Route>
                  <Route path="/*" element={<Error404 />}></Route>
                </Routes>
              </Container>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
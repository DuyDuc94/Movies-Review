import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Test from './pages/Test';
import { Container } from 'react-bootstrap';
import Error404 from './pages/404';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Home type={'popular'} />} />
          <Route path="/top-rated" element={<Home type={'top-rated'} />} />
          <Route path="/upcoming" element={<Home type={'upcoming'} />} />
          <Route path="/*" element={
            <>
              <Container style={{ minHeight: '80vh' }}>
                <Routes>
                  <Route path="/genre/:genreId" element={<MovieList />}></Route>
                  <Route path="/movie/:id" element={<MovieDetail />}></Route>
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
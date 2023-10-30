import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Home />}></Route>
            {/* <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route> */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        {/* <Test /> */}
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/:type" element={<MovieList />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
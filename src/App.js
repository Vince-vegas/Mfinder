import { Fragment } from 'react';
import MovieRoutes from './Routes/MovieRoutes';
import './Styles/main.scss';
import './Styles/loader.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <MovieRoutes />
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;

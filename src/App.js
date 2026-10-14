import { Fragment } from 'react';
import Routes from './Routes/Routes';
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
        <Routes />
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;

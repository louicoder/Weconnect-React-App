import React, { Component } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routes from './helper/Routes';

class App extends Component {
  render() {
    return (
      <div>
          <Header/>
          <Routes/>
          <Footer/>
      </div>
    );
  }
}

export default App;

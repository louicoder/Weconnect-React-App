import React, { Component } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
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

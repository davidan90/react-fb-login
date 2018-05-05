import React, { Component } from 'react';
import LoginButton from './LoginButton';

const Home = () => (
  <div>
      <span>My App</span>
  </div>
);

class App extends Component {
  state = {
    logged: false,
  };

  componentWillMount() {
      document.addEventListener('onFbLogin', (e) => {
         this.setState({logged: true});
      }, false);
  }

  render() {
      const {logged} = this.state;
      return !logged ? <LoginButton/> : <Home/>;
  }
}

export default App;

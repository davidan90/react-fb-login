import {Component } from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './loginComponent';


class App extends Component {
    static state = {
        logged: false,
    }
    
    render() {
        return (
            <LoginButton />
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app-root'));
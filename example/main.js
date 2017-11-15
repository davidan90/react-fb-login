import { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginButton from './loginComponent';

const AppContainer = () => (
    <div>
        <span>My App</span>
    </div>
);

class App extends Component {
    constructor() {
        super();
        this.state = {
            logged: false,
        };
    }

    componentWillMount() {
        document.addEventListener('onFbLogin', (e) => {
           this.setState({logged: true});
        }, false);
    }

    render() {
        const {logged} = this.state;
        return !logged ? <LoginButton /> : <AppContainer/>;
    }
}


ReactDOM.render(<App />, document.getElementById('app-root'));
# **react-fb-login**

## **Description**
This is a higher order component to help you using their login plugin, using React.js.

---
## **Install**

```javascript
npm i react-fb-login
```

---

## **Example**

```javascript

/*********** FILE app.js ***********/
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
 
 ```

 ```javascript
 
/*********** FILE loginComponent.js ***********/
import {Component} from 'react';
import {FBLogin} from 'hoc-fb-login';
 
const params = {
    appId: '{your_app_id}',
    scope: 'public_profile',
    cookie: false,
    language: 'en_US',
    version: 'v2.8',
    xfbml: false,
}
 
const onFbLoginEvent = () => {
    const fbLoginEvent = new Event('onFbLogin');
    document.dispatchEvent(fbLoginEvent);
}
 
const loggedCb = (response) => {
    console.info('Already logged: ', response);
    onFbLoginEvent();
};
 
const notLoggedCb = (response) => {
    console.log('You are not logged: ', response);
};
 
const obj = {
    params,
    loggedCb,
    notLoggedCb,
};
 
@FBLogin(obj)
export default class LoginButton extends Component {
    render() {
        return (
            <button style={this.props.fbCSS}>
                Login
            </button>
        );
    }
}

```

If you want to run example code:

```javascript
npm start
```

---

## **License**
This code has MIT license.
# **react-fb-login**

## **Description**
This is a higher order component to help you using their login plugin, using React.js.

---
## **Install**

```javascript
npm i react-fb-login
```

---

## **Parameters**

| Params        | Values        | default value  |
| ------------- |:-------------:| :--------------:|
| appId | string | isRequired |
| autoLoad | boolean | true |
| fbCSS | object | object |
| scope | string | 'public_profile' |
| cookie | boolean | false |
| language | string | navigator.language |
| redirect_uri | string | undefined |
| version | string | 'v2.11' |
| xfbml | boolean | false |
| loginCb | function | isRequired |
| notLoginCb | function | undefined |
| clickCb | function | undefined |

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
import React, { Component } from 'react';
import {FBLogin} from 'react-fb-login';

const params = {
    appId: 'your_facebook_app_id',
    scope: 'public_profile',
    cookie: false,
    language: 'en_US',
    version: 'v3.0',
    xfbml: true,
}

const onFbLoginEvent = () => {
    const fbLoginEvent = new Event('onFbLogin');
    document.dispatchEvent(fbLoginEvent);
}

const loginCb = (response) => {
    console.info('Already logged: ', response);
    onFbLoginEvent();
};

const notloginCb = (response) => {
    console.error('You are not logged: ', response);
};

const obj = {
    params,
    loginCb,
    notloginCb,
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
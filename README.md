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

const loggedCb = (response) => {
    console.log('Already logged: ', response);
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
            <button>
                Log with FB
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
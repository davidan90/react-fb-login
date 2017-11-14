import {Component} from 'react';
import {FBLogin} from './hoc-fb-login.js';

const params = {
    appId: '1661744763846761',
    scope: 'public_profile',
    cookie: false,
    language: 'en_US',
    version: 'v2.8',
    xfbml: false,
}

const loggedCb = (response) => {
    console.info('Already logged: ', response);
};

const notLoggedCb = (response) => {
    console.error('You are not logged: ', response);
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
                Loggin
            </button>
        );
    }

}

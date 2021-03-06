import React, { Component } from 'react';
import {FBLogin} from './react-fb-login';

const params = {
    appId: '1661744763846761', // replace with your facebook_app_id
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

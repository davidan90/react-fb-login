import { Component } from 'react';
import { FBLogin } from './hoc-fb-login.js';

const params = {
    appId: '1661744763846761',
    scope: 'public_profile',
    cookie: false,
    language: 'en_US',
    version: 'v2.11',
    xfbml: false,
}

const onFbLoginEvent = () => {
    const fbLoginEvent = new Event('onFbLogin');
    document.dispatchEvent(fbLoginEvent);
}

const loginCb = ({status}) => {
    console.info('Already logged: ', status);
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

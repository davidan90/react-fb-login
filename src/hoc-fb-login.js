import { Component } from 'react';
import { string, bool, func } from 'prop-types';

export const FBLogin = ({ params, clickCb, loggedCb, notLoggedCb }) => (LoginBtn) => {
    class LoginWrapper extends Component {
        static state = {
            isSDKLoaded: false,
        };

        static propTypes = {
            appId: string.isRequired,
            scope: string,
            cookie: bool,
            language: string,
            redirect_uri: string,
            version: string,
            xfbml: bool,
            clickCb: func,
            loggedCb: func,
            notLoggedCb: func,
        }

        static defaultProps = {
            appId: params.appId,
            scope: params.scope || 'public_profile',
            cookie: params.cookie || false,
            language: params.language || window.navigator.language,
            redirect_uri: params.uri || undefined,
            version: params.version || 'v2.8',
            xfbml: params.xfbml || false,
            clickCb,
            loggedCb,
            notLoggedCb,
        }

        componentWillMount() {
            this._loadFbSDK();
            this._initFbLogin();
        }

        _loadFbSDK() {
            const { language } = this.props;
            ((d, s, id) => {
                const fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    this.setState({ isSDKLoaded: true });
                    return;
                } else {
                    let js = d.createElement(s);
                    js.id = id;
                    js.src = `https://connect.facebook.net/${language}/sdk.js`;
                    fjs.parentNode.insertBefore(js, fjs);
                }
            })(document, 'script', 'facebook-jssdk');
        }

        _initFbLogin() {
            const { appId, xfbml, cookie, version, autoLoad } = this.props;
            window.fbAsyncInit = () => {
                window.FB.init({
                    appId,
                    cookie,
                    xfbml,
                    version,
                });
                this.setState({ isSDKLoaded: true });
                window.FB.getLoginStatus(this._checkLoginStatus);
            }
        }

        _checkLoginStatus = (response) => {
            if (response.status === 'connected') {
                this._logged(response.authResponse);
            } else {
                this._notLogged(response);
            }
        };

        _logged = (auth) => {
            const { loggedCb } = this.props;
            window.FB.api('/me', (response) => {
                if (typeof loggedCb === 'function') {
                    loggedCb(response);
                }
            });
        }

        _notLogged = (response) => {
            const { notLoggedCb } = this.props;
            if (typeof notLoggedCb === 'function') {
                notLoggedCb(response);
            }
        }

        _click = (e) => {
            const { scope, appId, redirect_uri, clickCb } = this.props;
            const params = {
                client_id: appId,
                state: 'facebookdirect',
                scope,
            };

            if (redirect_uri) {
                params.redirect_uri = redirect_uri;
            }

            if (typeof clickCb === 'function') {
                clickCb(e);
                if (e.defaultPrevented) {
                    return;
                }
            }

            window.FB.login(this.checkLoginState, { scope, auth_type: params.auth_type });
        };

        render() {
            return (
                <div onClick={this._click} >
                    <LoginBtn
                        {...this.props}
                        {...this.state} />
                </div>
            );
        }
    }
    return LoginWrapper;
}

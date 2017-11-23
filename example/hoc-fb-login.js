import { Component } from 'react';
import { string, bool, object, func } from 'prop-types';

const FontLink = (props) => {
    return (
        <link
            rel="stylesheet"
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
    );
}

const Icon = (props) => {
    return (
        <i className="fa fa-facebook"></i>
    );
}

const defaultCSS = {
    container: {
        backgroundColor: '#4C69BA',
        borderRadius: '3px',
        color: '#FFF',
        cursor: 'pointer',
        display: 'inline-block',
        padding: '0.5em',
    },
    buttonText: {
        backgroundColor: '#4C69BA',
        borderColor: '#4C69BA',
        borderStyle: 'solid',
        color: '#FFF',
        cursor: 'pointer',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        textDecoration: 'none',
        transition: 'background-color .3s, border-color .3s'
    },
}

export const FBLogin = ({ params, clickCb, loginCb, notloginCb }) => (LoginBtn) => {
    class LoginWrapper extends Component {
        static state = {
            isSDKLoaded: false,
        };

        static propTypes = {
            appId: string.isRequired,
            autoLoad: bool,
            fbCSS: object,
            scope: string,
            cookie: bool,
            language: string,
            redirect_uri: string,
            version: string,
            xfbml: bool,
            clickCb: func,
            loginCb: func.isRequired,
            notloginCb: func,
        }

        static defaultProps = {
            appId: params.appId,
            autoLoad: params.autoLoad || true,
            fbCSS: params.fbCSS || defaultCSS.buttonText,
            scope: params.scope || 'public_profile',
            cookie: params.cookie || false,
            language: params.language || window.navigator.language,
            redirect_uri: params.uri || undefined,
            version: params.version || 'v2.11',
            xfbml: params.xfbml || false,
            loginCb,
            notloginCb,
            clickCb,
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
                if(autoLoad) {
                    window.FB.getLoginStatus(this._checkLoginStatus);
                }
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
            const { loginCb } = this.props;
            window.FB.api('/me', (response) => {
                if (typeof loginCb === 'function') {
                    loginCb(response);
                }
            });
        }

        _notLogged = (response) => {
            const { notloginCb } = this.props;
            if (typeof notloginCb === 'function') {
                notloginCb(response);
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
           window.FB.login(this._checkLoginStatus, { scope, auth_type: params.auth_type });
        };

        _getFontLink() {
            const { fbCSS } = params;
            if (!fbCSS) {
                return (
                    <span>
                        <FontLink />
                        <Icon />
                    </span>
                );
            }
        }

        render() {
            const containerStyle = params.fbCSS || defaultCSS.container;
            return (
                <div onClick={this._click} style={containerStyle}>
                    {this._getFontLink()}
                    <LoginBtn
                        {...this.props}
                        {...this.state} />
                </div>
            );
        }
    }
    return LoginWrapper;
}

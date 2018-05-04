import { Component } from 'react';
import { string, bool, object, func } from 'prop-types';

const defaultCSS = {
    container: {
        backgroundColor: '#4C69BA',
        borderRadius: '3px',
        color: '#FFF',
        cursor: 'pointer',
        display: 'inline-flex',
        padding: '0.5em',
    },
    button: {
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
    icon: {
        backgroundColor: '#FFF',
        color: '#4C69BA',
        height: '14px',
        paddingTop: '2px',
        paddingRight: '2px',
        textAlign: 'right',
        width: '15px',
    }
}

const FontLink = (props) => (
    <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
    />
);

const Icon = (props) => <i className="fa fa-facebook" style={defaultCSS.icon}></i>;

export const FBLogin = ({ params, clickCb, loginCb, notloginCb }) => (LoginBtn) => {
    class LoginWrapper extends Component {
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
            fbCSS: params.fbCSS || defaultCSS.button,
            scope: params.scope || 'public_profile',
            cookie: params.cookie || false,
            language: params.language || window.navigator.language,
            redirect_uri: params.uri || undefined,
            version: params.version || 'v3.0',
            xfbml: params.xfbml || true,
            loginCb,
            notloginCb,
            clickCb,
        }

        state = {
            isSDKLoaded: false,
        };

        componentDidMount() {
            this._loadFbSDK(this.props);
            this._initFbLogin(this.props);
        }

        _loadFbSDK({ language }) {
            ((d, s, id) => {
                const fjs = d.getElementsByTagName(s)[0];
                if (!d.getElementById(id)) {
                    let js = d.createElement(s);
                    js.id = id;
                    js.src = `https://connect.facebook.net/${language}/sdk.js`;
                    fjs.parentNode.insertBefore(js, fjs);
                }
                this.setState({ isSDKLoaded: true });
                return;
            })(document, 'script', 'facebook-jssdk');
        }

        _initFbLogin({ appId, xfbml, cookie, version, autoLoad }) {
            window.fbAsyncInit = () => {
                window.FB.init({
                    appId,
                    cookie,
                    xfbml,
                    version,
                });
                if(autoLoad) {
                    window.FB.getLoginStatus(this._loginHandler);
                }
            }
        }

        _loginHandler = (response) => {
            if (response.status === 'connected') {
                this._logged(response.authResponse);
            } else {
                this._notLogged(response);
            }
        };

        _logged = (auth) => {
            const { loginCb } = this.props;
            window.FB.api('/me', () => {
                if (typeof loginCb === 'function') {
                    loginCb(auth);
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
           window.FB.login(this._loginHandler, { scope, auth_type: params.auth_type });
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
            const {isSDKLoaded} = this.state;
            const containerStyle = params.fbCSS || defaultCSS.container;
            return !isSDKLoaded ? null : (
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

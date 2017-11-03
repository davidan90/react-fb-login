(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes);
        global.hocFbLogin = mod.exports;
    }
  })(this, function (exports, _react, _propTypes) {
    'use strict';
  
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FBLogin = undefined;
  
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
  
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
  
        return target;
    };
  
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
  
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
  
        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
  
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
  
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
  
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
  
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
  
    var FBLogin = exports.FBLogin = function FBLogin(_ref) {
        var params = _ref.params,
            clickCb = _ref.clickCb,
            loggedCb = _ref.loggedCb,
            notLoggedCb = _ref.notLoggedCb;
        return function (LoginBtn) {
            var _class, _temp2;
  
            var LoginWrapper = (_temp2 = _class = function (_Component) {
                _inherits(LoginWrapper, _Component);
  
                function LoginWrapper() {
                    var _ref2;
  
                    var _temp, _this, _ret;
  
                    _classCallCheck(this, LoginWrapper);
  
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
  
                    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = LoginWrapper.__proto__ || Object.getPrototypeOf(LoginWrapper)).call.apply(_ref2, [this].concat(args))), _this), _this._checkLoginStatus = function (response) {
                        if (response.status === 'connected') {
                            _this._logged(response.authResponse);
                        } else {
                            _this._notLogged(response);
                        }
                    }, _this._logged = function (auth) {
                        var loggedCb = _this.props.loggedCb;
  
                        window.FB.api('/me', function (response) {
                            if (typeof loggedCb === 'function') {
                                loggedCb(response);
                            }
                        });
                    }, _this._notLogged = function (response) {
                        var notLoggedCb = _this.props.notLoggedCb;
  
                        if (typeof notLoggedCb === 'function') {
                            notLoggedCb(response);
                        }
                    }, _this._click = function (e) {
                        var _this$props = _this.props,
                            scope = _this$props.scope,
                            appId = _this$props.appId,
                            redirect_uri = _this$props.redirect_uri,
                            clickCb = _this$props.clickCb;
  
                        var params = {
                            client_id: appId,
                            state: 'facebookdirect',
                            scope: scope
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
  
                        window.FB.login(_this.checkLoginState, { scope: scope, auth_type: params.auth_type });
                    }, _temp), _possibleConstructorReturn(_this, _ret);
                }
  
                _createClass(LoginWrapper, [{
                    key: 'componentWillMount',
                    value: function componentWillMount() {
                        this._loadFbSDK();
                        this._initFbLogin();
                    }
                }, {
                    key: '_loadFbSDK',
                    value: function _loadFbSDK() {
                        var _this2 = this;
  
                        var language = this.props.language;
  
                        (function (d, s, id) {
                            var fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) {
                                _this2.setState({ isSDKLoaded: true });
                                return;
                            } else {
                                var js = d.createElement(s);
                                js.id = id;
                                js.src = 'https://connect.facebook.net/' + language + '/sdk.js';
                                fjs.parentNode.insertBefore(js, fjs);
                            }
                        })(document, 'script', 'facebook-jssdk');
                    }
                }, {
                    key: '_initFbLogin',
                    value: function _initFbLogin() {
                        var _this3 = this;
  
                        var _props = this.props,
                            appId = _props.appId,
                            xfbml = _props.xfbml,
                            cookie = _props.cookie,
                            version = _props.version,
                            autoLoad = _props.autoLoad;
  
                        window.fbAsyncInit = function () {
                            window.FB.init({
                                appId: appId,
                                cookie: cookie,
                                xfbml: xfbml,
                                version: version
                            });
                            _this3.setState({ isSDKLoaded: true });
                            window.FB.getLoginStatus(_this3._checkLoginStatus);
                        };
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        return React.createElement(
                            'div',
                            { onClick: this._click },
                            React.createElement(LoginBtn, _extends({}, this.props, this.state))
                        );
                    }
                }]);
  
                return LoginWrapper;
            }(_react.Component), _class.state = {
                isSDKLoaded: false
            }, _class.propTypes = {
                appId: _propTypes.string.isRequired,
                scope: _propTypes.string,
                cookie: _propTypes.bool,
                language: _propTypes.string,
                redirect_uri: _propTypes.string,
                version: _propTypes.string,
                xfbml: _propTypes.bool,
                clickCb: _propTypes.func,
                loggedCb: _propTypes.func,
                notLoggedCb: _propTypes.func
            }, _class.defaultProps = {
                appId: params.appId,
                scope: params.scope || 'public_profile',
                cookie: params.cookie || false,
                language: params.language || window.navigator.language,
                redirect_uri: params.uri || undefined,
                version: params.version || 'v2.8',
                xfbml: params.xfbml || false,
                clickCb: clickCb,
                loggedCb: loggedCb,
                notLoggedCb: notLoggedCb
            }, _temp2);
  
            return LoginWrapper;
        };
    };
  });
  
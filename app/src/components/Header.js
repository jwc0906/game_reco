import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
    render() {

        const loginButton = (
            <li>
                <Link to="/login"><i className="material-icons">vpn_key</i></Link>
            </li>
        );

        const logoutButton = (
          <div>
            <li>
                <Link to="/rating">게임 평가하기</Link>
            </li>
            <li>
                <Link to="/mypage">마이 게임북</Link>
            </li>
            <li>
                <a onClick={this.props.onLogout}><i className="material-icons">lock_open</i></a>
            </li>
          </div>
        );

        return (
          <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper blue darken-1">
                <div className="container">
                    <Link to="/" className="brand-logo">게임 파인더</Link>


                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
                </div>
            </nav>
          </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;

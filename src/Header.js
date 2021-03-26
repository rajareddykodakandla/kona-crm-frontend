import React from 'react'
import { NavLink, HashRouter, Route } from 'react-router-dom'
import changePassword from './changePassword';
import Home from './Home';
import Login from './Login'
import Register from './register';
import userDashboard from './userDashboard';


class Header extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <HashRouter>
                    {/*<NavLink to="/login">Login</NavLink>&nbsp;&nbsp;
                    <NavLink to="/changepassword">changePassword</NavLink>&nbsp;&nbsp;
        <NavLink to="/register">Register</NavLink>*/}
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/dashboard" component={userDashboard}></Route>
                    <Route path="/changepassword" component={changePassword}></Route>
                </HashRouter>
            </div>
        )
    }
}

export default Header;
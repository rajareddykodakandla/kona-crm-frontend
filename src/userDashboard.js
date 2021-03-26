import React from 'react'
import { NavLink } from 'react-router-dom'
import './userDashboard.css'
class userDashboard extends React.Component {
    render() {
        if(!sessionStorage.getItem("token")){
            this.props.history.push("/login")
        }
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <h3 className="header" > <span style={{ color: "#FFFFFF" }}>Kona</span><span style={{ color: "#E9204F" }}>digital.ai</span></h3>

                    <div className="links">
                        <NavLink to="/dashboard" >Dashboard</NavLink>
                        <NavLink to="/dashboard">Leads</NavLink>
                        <NavLink to="/dashboard">Report</NavLink>
                        <NavLink to="/dashboard">Settings</NavLink>

                        <NavLink to="/changepassword" >change password</NavLink>
                    </div>

                </div>
                <div className="dashboard" >
                    <h1>Hello welcome to user Dashboard</h1>
                </div>
            </div>

        )
    }
}

export default userDashboard
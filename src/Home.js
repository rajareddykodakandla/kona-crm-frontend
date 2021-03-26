import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="maintitle">
                    <h1 className="text-center text-white pt-5" > <span style={{ color: "#FFFFFF" }}>Kona</span><span style={{ color: "#E9204F" }}>digital.ai</span></h1>
                </div>
                <div className="links">
                <NavLink to="/login"><button style={{ width: 200 + 'px' }} type="button" className="btn btn-danger btn-lg">SIGN IN</button></NavLink>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to="/register"><button style={{ width: 200 + 'px' }} type="button" className="btn btn-danger btn-lg">SIGN UP</button></NavLink>
                </div>
            </div>
        )
    }
}

export default Home;
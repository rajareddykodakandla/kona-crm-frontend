import React from 'react'
import axios from 'axios'
import './register.css'

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "mobileNo": "",
            "city": "",
        }
        this.firstnameRef = React.createRef();
        this.lastnameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.mobileRef = React.createRef();
        this.cityRef = React.createRef();
    }
    emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&_?"])(?=.*\d).{8,}$/;
    firstName = false
    lastName = false
    mobile = false
    city = false

    captureData = event => {
        //console.log(this.confirmPass);
        let name = event.target.name;
        let value = event.target.value;
        //console.log(value)
        if (name == "firstName") {
            if (value != "" && value.length > 3) {
                this.firstnameRef.current.innerHTML = ""
                this.firstName = true
                this.setState({ [name]: value })
            } else {
                this.firstnameRef.current.innerHTML = "Please enter the firstname"
                this.firstName = false
            }
        }
        if (name == "lastName") {
            if (value != "" && value.length > 3) {
                this.lastnameRef.current.innerHTML = ""
                this.lastName = true
                this.setState({ [name]: value })
            } else {
                this.lastnameRef.current.innerHTML = "Please enter the lastname"
                this.lastName = false
            }
        }
        if (name == "password") {
            let passwordValidation = this.passwordPattern.test(value)
            if (value != "" && passwordValidation) {
                this.setState({ [name]: value })
                this.passwordRef.current.innerHTML = ""
            } else {
                this.passwordRef.current.innerHTML = "password required"
            }
        }
        if (name == "email") {
            let emailvalidation = this.emailPattern.test(value)
            if (value != "" && emailvalidation) {
                this.setState({ [name]: value })
                this.emailRef.current.innerHTML = ""
            } else {
                this.emailRef.current.innerHTML = "Email required"
            }
        }
        if (name == "mobileNo") {
            if (value.length == 10) {
                this.mobileRef.current.innerHTML = ""
                this.mobile = true
            } else {
                this.mobileRef.current.innerHTML = "Invalid mobile number"
                this.mobile = false
            }
        }
        if (name == "city") {
            if (value != "" && value != null) {
                this.cityRef.current.innerHTML = ""
                this.city = true
            } else {
                this.cityRef.current.innerHTML = "Please enter your city name"
                this.city = false
            }
        }
        this.setState({ [name]: event.target.value })
    }

    register = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/v1/user/register', this.state).then(
            res => {
                if (res.data.token) {
                    sessionStorage.setItem("token", res.data.token);
                    this.props.history.push("/dashboard")
                }
            },
            err => {
                console.log(err)
            }
        )
    }
    render() {
        return (
            <div className="container">
                <div className="title">
                    <h1 className="text-center text-white pt-5 headcolor" > <span style={{ color: "#FFFFFF" }}>Kona</span><span style={{ color: "#E9204F" }}>digital.ai</span></h1>
                </div>
                <div className="card contentreg">
                    <div className="signup"><h3>SIGN UP</h3></div>
                    <div className="card-body">
                        <form className="form">
                            <div className="form-group">
                                <label htmlFor="email">firstName:</label>
                                <input type="text" className="form-control" onChange={this.captureData} name="firstName" placeholder="Enter firstname" id="username"></input>
                                <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.firstnameRef}></p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">lastName:</label>
                                <input type="text" className="form-control" onChange={this.captureData} name="lastName" placeholder="Enter lastname" id="email"></input>
                                <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.lastnameRef}></p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Email:</label>
                                <input type="email" className="form-control" onChange={this.captureData} name="email" placeholder="Enter email" id="pwd"></input>
                                <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.emailRef}></p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Password:</label>
                                <input type="password" className="form-control" onChange={this.captureData} name="password" placeholder="Enter password" id="pwdcurrent"></input>
                                <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.passwordRef}></p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Mobile:</label>
                                <input type="mobile" className="form-control" onChange={this.captureData} name="mobileNo" placeholder="Enter mobile number" id="mobile"></input>
                                <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.mobileRef}></p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">City:</label>
                                <input type="text" className="form-control" onChange={this.captureData} name="city" placeholder="Enter city" id="city"></input>
                                <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.cityRef}></p>
                            </div>
                            <div className="button" >
                                <button style={{ width: 200 + 'px' }} type="submit" disabled={!(this.passwordPattern.test(this.state.password) && this.emailPattern.test(this.state.email) && this.firstName && this.lastName && this.mobile && this.city)} className="btn btn-danger" onClick={this.register}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;
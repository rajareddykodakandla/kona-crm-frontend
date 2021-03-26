import React from 'react';
import axios from 'axios';
import "./Login.css"

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    }
    this.passwordRef = React.createRef();
    this.emailRef = React.createRef();
  }

  emailValidation = false
  passwordValidation = false

  captureData = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name == 'email') {
      if (value != "") {
        this.setState({ [name]: value });
        this.emailRef.current.innerHTML = ""
        this.emailValidation = true
      } else {
        this.emailRef.current.innerHTML = "Enter email"
        this.emailValidation = false
      }
    }
    if (name == 'password') {
      if (value != "") {
        this.setState({ [name]: value });
        this.passwordRef.current.innerHTML = ""
        this.passwordValidation = true
      } else {
        this.passwordRef.current.innerHTML = "Enter password"
        this.passwordValidation = false
      }
    }
    this.setState({ [name]: value });
  }

  login = (event) => {
    event.preventDefault();
    console.log("state values", this.state)
    axios.post('http://localhost:8080/v1/user/login', this.state).then(
      res => {
        if (res.data.token) {
          sessionStorage.setItem("token", res.data.token)
          this.props.history.push("/dashboard")
        }
      },
      err => {
        console.log(err)
      }
    )
  }
  render() {
    // console.log(this.props)
    return (
      <React.Fragment>
        <div className="container">
          <div className="title">
            <h1 className="text-center text-white pt-5" > <span style={{ color: "#FFFFFF" }}>Kona</span><span style={{ color: "#E9204F" }}>digital.ai</span></h1>
          </div>
          <div className="card content">
            <div className="signin"><h3>SIGN IN</h3></div>
            <div className="card-body">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" onChange={this.captureData} name="email" placeholder="Enter email" id="email"></input>
                  <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.emailRef}></p>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">Password:</label>
                  <input type="password" className="form-control" onChange={this.captureData} name="password" placeholder="Enter password" id="pwd"></input>
                  <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.passwordRef}></p>
                </div>
                <div className="button" >
                  <h5><a href="#" className="forgot">forgot password</a></h5>
                  <button style={{ width: 200 + 'px' }} type="submit" disabled={!(this.emailValidation && this.passwordValidation)} className="btn btn-danger" onClick={this.login}>SIGN IN</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Login;
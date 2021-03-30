import React from 'react'
import axios from 'axios'
import './changePassword.css'

class changePassword extends React.Component {
    constructor() {
        super();
        this.state = {
            "password": "",
            "confirmpass": ""
        }
        this.passwordRef = React.createRef();
        this.confirmpassRef = React.createRef();
    }
    passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&_?"])(?=.*\d).{8,}$/;
    confirmpassword = false

    captureData = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name == "password") {
            let passwordValidation = this.passwordPattern.test(value)
            //console.log(passwordValidation);
            if (value != "" && passwordValidation) {
                this.setState({ [name]: value })
                this.passwordRef.current.innerHTML = ""
            } else {
                this.passwordRef.current.innerHTML = "password required"
            }
        }
        if (name == "confirmpass") {
            let passwordValidation = this.passwordPattern.test(value)
            //console.log(passwordValidation);
            if (value != "" && passwordValidation) {
                this.setState({ [name]: value })
                this.confirmpassRef.current.innerHTML = ""
                this.confirmpassword = true
            } else {
                this.confirmpassword = true
                this.confirmpassRef.current.innerHTML = "Password does't matched"
            }
        }
    }

    changepassword = (event) => {
        event.preventDefault();
        let token = sessionStorage.getItem("token")
        if (this.state.password == this.state.confirmpass) {
            this.confirmpassRef.current.innerHTML = ""
            const header = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const body = {
                password: this.state.password
            }
            axios.post('http://localhost:8080/v1/user/updatePassword', body, header).then(
                res => {
                    if (res.data) {
                        sessionStorage.removeItem("token");
                        this.props.history.push("/login")
                    }
                },
                err => {
                    console.log(err)
                }
            )
        } else {
            this.confirmpassRef.current.innerHTML = "Password does't matched"
        }

    }
    render() {
        // console.log(this.props)
        //console.log(this.confirmpassword)
        return (
            <React.Fragment>
                <div className="maint">
                    <h1 className="text-center text-white pt-5 headcolor" > <span style={{ color: "#FFFFFF" }}>Kona</span><span style={{ color: "#E9204F" }}>digital.ai</span></h1>
                </div>
                <div className="subdiv">
                    <form className="formc">
                        <div className="form-group maindiv">
                            <input type="password" className="form-control" onChange={this.captureData} name="password" placeholder="Enter password" id="password"></input>
                            <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.passwordRef}></p>
                        </div>
                        <div className="form-group maindiv">
                            <input type="password" className="form-control" onChange={this.captureData} name="confirmpass" placeholder="Enter confrim password" id="confirmpassword"></input>
                            <p style={{ color: 'red', fontSize: 15 + 'px', textAlign: "center" }} ref={this.confirmpassRef}></p>
                        </div>
                        <div className="Btn">
                            <button style={{ width: 200 + 'px', fontSize: 18 + 'px' }} type="submit" disabled={!(this.passwordPattern.test(this.state.password) && this.confirmpassword)} className="btn btn-danger" onClick={this.changepassword}>Change</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
export default changePassword;
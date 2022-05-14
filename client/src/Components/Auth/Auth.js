import React, { Component } from "react";
import { Formik } from "formik";
import { auth } from "../../redux/authActionCreators";

import { Alert } from "reactstrap";

import { connect } from "react-redux";

import Spinner from "../Spinner/Spinner";

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}

class Auth extends Component {
    state = {
        mode: "register"
    }

    switchModeHandler =()=> {
        this.setState({
            mode: this.state.mode === "register"? "login":"register"
        })
    }

    render() {
        let err = null;

        if(this.props.authFailedMsg !=null) {
            err = <Alert color="danger">
                    {this.props.authFailedMsg}
                </Alert>;
        }

        let form = null;
        if(this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: ""
                        }
                    }

                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode);
                        }
                    }

                    validate={(values)=> {
                        const errors = {}

                        if(!values.email) {
                            errors.email = "Required!"
                        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email="Please type correct email!"
                        }

                        if(!values.password) {
                            errors.password="Password required!!"
                        } else if ( values.password.length < 6 ) {
                            errors.password="Password must be atleast 6 charachters!!"
                        }
                        if(this.state.mode==="register") {
                            if(!values.passwordConfirm) {
                                errors.passwordConfirm="Please confirm your password"
                            } else if( values.password !== values.passwordConfirm ) {
                                errors.passwordConfirm="Password does not match with the password confirmation"
                            }
                        }
                        return errors;
                    }}
                >
                    {({values, handleChange, handleSubmit, errors})=> {
                        return(
                            <div style={{
                                border: "1px solid grey",
                                padding: "15px",
                                borderRadius: "5px"
                            }}>
                            <button style={{
                                    width: "100%",
                                    backgroundColor: "#d70f64",
                                    color: "#fff"
                                }} 
                                className="btn btn-lg mb-3" 
                                type="button"
                                onClick={this.switchModeHandler}
                            >
                                    Switch to {this.state.mode==="register"? "Login" : "Register"}
                                </button>
                                <h3 style={{
                                    width: "100%",
                                    textAlign: "center"
                                }}>
                                    {this.state.mode==="register"? "SIGN UP" : "LOGIN"}
                                </h3>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    name="email"
                                    placeholder="Your email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{color:"red"}}>{errors.email}</span>
                                <input 
                                    name="password"
                                    placeholder="Password"
                                    className="form-control my-3"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{color:"red"}}>{errors.password}</span>
                                {this.state.mode==="register"? <div>
                                    <input 
                                        name="passwordConfirm"
                                        placeholder="Confirm password"
                                        className="form-control"
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                    />
                                    <span style={{color:"red"}}>{errors.passwordConfirm}</span>
                                </div> : null}
                                <br />
                                <button
                                    type="submit"
                                    className="btn btn-success mt-3"
                                >
                                    {this.state.mode==="register"? "SIGN UP" : "LOGIN"}
                                </button>
                            </form>
                        </div> 
                        )
                    }}
                </Formik>
            )
        }
        return (
            <div>
                {err}
                {form}
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
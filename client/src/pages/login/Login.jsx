import  { useContext, useRef, useState } from "react";
import axios from "../Api/axios";
import {useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import './login.css'

import { AppState } from "../../App";

function Login() {
    const { user, setuser } = useContext(AppState);
    const navigate = useNavigate();
    const emailDom = useRef(null);
    const passwordDom = useRef(null);
    const [alertMessages, setAlertMessages] = useState("");
    const [success, setSuccess] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading state

    // to toggle the visibility of password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // function to handle the user login
    async function handleSubmit(e) {
        e.preventDefault();

        const emailValue = emailDom.current.value;
        const passwordValue = passwordDom.current.value;
        if (!emailValue || !passwordValue) {
            setAlertMessages("Please provide all requirements");
            setTimeout(() => {
                setAlertMessages("");
            }, 3000);
            return;
        }

        setLoading(true); // Set loading state to true while waiting for response

        try {
            const { data } = await axios.post("/users/login", {
                email: emailValue,
                password: passwordValue,
            });
            setSuccess("Logged in successfully");
            setTimeout(() => {
                setSuccess("");
            }, 3000);
            localStorage.setItem('token', data.token);
            setuser(data);
            navigate("/home");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setAlertMessages("User not registered with this email");
            } else if (error.response && error.response.data && error.response.data.message) {
                setAlertMessages(error.response.data.message);
            } else {
                setAlertMessages("There is no registered user with the given information");
            }
            console.log(error);
        } finally {
            setLoading(false); // Set loading state back to false after response is received
        }
    }

    return (
        <div className="container">
            <div>
                {/* <Header/> */}
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="mainRegisterWrapper">
                        <section className="secondRegisterWrapper">
                            {alertMessages && <div className="alerts">{alertMessages}</div>}
                            {success && <div className="alerts">{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="inputs">
                                    <div>
                                        <input type="email" ref={emailDom} placeholder="Email" />
                                    </div>
                                    <div className="password">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            ref={passwordDom}
                                            placeholder="Password"
                                        />
                                        <span onClick={togglePasswordVisibility}>
                                            {showPassword ? (
                                                <FaRegEye className="eyes" />
                                            ) : (
                                                <FaRegEyeSlash className="eyes" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                {/* Conditionally render spinner based on loading state */}
                                <button className="toblue" type="submit">
                                    {loading ? (
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

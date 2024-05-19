import { useContext, useRef, useState } from "react";
import axios from "../Api/axios";
import { useNavigate } from "react-router-dom";
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { AppState } from "../../App";
import "../user/Regester.css"

function Register() {
  const { setuser } = useContext(AppState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to track loading state
  const [alert, setAlert] = useState("");
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const userNameValue = userNameDom.current.value;
    const firsNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!userNameValue || !firsNameValue || !lastNameValue || !emailValue || !passwordValue) {
      setAlert("Please provide all required information");
      setTimeout(() => {
        setAlert("");
      }, 3000);
      return;
    }
    setLoading(true); // Set loading state to true while waiting for response

    try {
      const { data } = await axios.post("/users/register", {
        username: userNameValue,
        firstname: firsNameValue,
        lastname: lastNameValue,
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem("token", data.token);
      setuser({ username: data.username });
      navigate("/home");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.msg === "This user is already registered") {
        setAlert("User already exists with this email");
      } else {
        setAlert("Something went wrong, please try again");
      }
    }
    finally {
      setLoading(false); // Set loading state back to false after response is received
    }
  }

  return (
    <div className="container">
      <div className="registerWrapper">
        <form onSubmit={handleSubmit}>
          <section className="inputs">
            {alert && <div className="alerts">{alert}</div>}
            <input type="text" ref={userNameDom} placeholder="User name" />
            <div className="fifty">
              <input type="text" ref={firstNameDom} placeholder="First name" className="p-l" />
              <input type="text" ref={lastNameDom} placeholder="Last name" className="p-r" />
            </div>
            <input type="email" ref={emailDom} placeholder="Email address" />
            <div className="password">
              <input type="password" ref={passwordDom} placeholder="Password" />
            </div>
            <div className="lastones">
              {/* Conditionally render spinner based on loading state */}
              <button type="submit" className="agree">
                {loading ? (
                
                    <span className="sr-only">Loading...</span>
                
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

export default Register;

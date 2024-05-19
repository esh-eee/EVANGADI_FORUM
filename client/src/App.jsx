import  { useState, useEffect, createContext } from "react";
import About from "./pages/LandingPages/About";
import Home from "./pages/user/Home";
import Register from "./pages/user/Regester";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "./pages/Api/axios";
import Header from "./pages/LandingPages/Header";
import Footer from "./pages/LandingPages/Footer";
import Questions from "./pages/questions/AllQuestions"
import AskQuestion from "./pages/questions/AskQuestion";
import SingleQuestion from "./pages/questions/SingleQuestion"
export const AppState = createContext();
export const QuestionState = createContext();

function App() {
  const [user, setuser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Header/>
      <Routes>
        
				<Route path="/login" element={<About />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
         <Route path="/register" element={<Register />} />
         <Route path="/home" element={<Questions />} />
         <Route path="/ask" element={<AskQuestion />} />
         <Route path="/question/:questionid" element={<SingleQuestion />} />

      </Routes>
      <Footer/>
    </AppState.Provider>
  );
}

export default App;


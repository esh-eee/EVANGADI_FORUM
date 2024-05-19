import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../Api/axios";
import { CgProfile } from "react-icons/cg";
import './SingleQuestion.css'

function SingleQuestion() {
    const navigate = useNavigate();
    const { questionid } = useParams();
    const [question, setQuestion] = useState("");
    const [description, setDescription] = useState("");
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false); // State to control displaying the alert message

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const questionResponse = await axios.get(
                    `/questions/question/${questionid}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setQuestion(questionResponse.data.title.toUpperCase());
                setDescription(questionResponse.data.description.toLowerCase());

                const response = await axios.get(`/answers/all-answers/${questionid}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                if (response.data.msg) {
                    alert("Success message: " + response.data.msg);
                }
                const answersArray = Object.values(response.data);
                setAnswers(answersArray);
            } catch (error) {
                console.error("Error fetching question or answers:", error);
            }
        };

        fetchData();
    }, [questionid]);

    const handlePostAnswer = async () => {
        if (!newAnswer.trim()) {
            setShowAlert(true); // Show the alert message if the answer is empty
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `/answers/question/${questionid}`,
                { answer: newAnswer },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            if (response.data.msg) {
                setAlertMessage(" success"+" " + response.data.msg);
            }
            fetchData();
            setAnswers([...answers, { answer: newAnswer }]);
            setNewAnswer("");
            setShowAlert(false); // Hide the alert message after successful posting
            setTimeout(() => {
                setAlertMessage("");
            }, 3000);
        } catch (error) {
            console.error("Error posting answer:", error);
        }
    };

    return (
        <section className="forbackGrounds">
            <div className="container">
                <div className=" row thewhole">
                    <div className="col-md-12 max-width">
                        <h1 className="titlequestion">QUESTION</h1>
                        <h4 className="question">{question}</h4>
                        <span className="description">{description}</span>
                        <div>
                            <h1 className="answerTitle">Answers From the Community</h1>
                        </div>
						<Link to="/home">Back to  questions</Link>
                        <ul className="QuestionList scrollable-div">
                            {answers[0]?.map((answer, index) => (
                                <li key={answer.answerid} className="AnswerItem">
                                    <div className="QuestionInfo">
                                        <div className="flex-row">
                                            <CgProfile className="Avatar" />
                                            <span className="username">{answer.username}</span>
                                        </div>
                                        <div>{answer.answer}</div>
                                    </div>
                                </li>
                            ))}
                            <div className="usernames">
                                {answers[1] && (
                                    <li key="newAnswer" className="AnswerItem">
                                        <div>
                                            <span className="usersname">{answers[1].answer} </span>
                                        </div>
                                    </li>
                                )}
                            </div>
                        </ul>

                        <div className="fortopmr">
                            {showAlert && <div className="alert ">Please enter your answer.</div>}
                            {alertMessage && <div className="alert">{alertMessage}</div>}
                            <textarea
                                style={{ width: "100%", height: "100px" }}
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                placeholder="Your answer..."
                                required
                            />
                            <button
                                onClick={handlePostAnswer}
                                className="blue m-r"
                                style={{ margin: "10px" }}
                            >
                                Post Answer
                            </button>
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SingleQuestion;

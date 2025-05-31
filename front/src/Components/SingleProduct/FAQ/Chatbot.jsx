import React, { useContext, useEffect, useState } from "react";
import "./Chatbot.scss";
import MyContext from "../../../Common/Context/MyContext";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3042");

const Chatbot = () => {
    const { url } = useContext(MyContext);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [manualChat, setManualChat] = useState(true); // Track manual questions phase
    const [faqData, setFaqData] = useState(null);
    const [faqStep, setFaqStep] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [manualComplete, setManualComplete] = useState(false); // Track FAQ completion

    const userId = localStorage.getItem("userId") || `user_${Math.floor(Math.random() * 10000)}`;

    useEffect(() => {
        localStorage.setItem("userId", userId);
        socket.emit("register_user", userId);
    }, []);

    useEffect(() => {
        socket.on("receive_admin_reply", (data) => {
            setMessages((prev) => [...prev, { message: `Admin: ${data.text}`, isUser: false }]);
        });

        return () => {
            socket.off("receive_admin_reply");
        };
    }, []);

    // Fetch manual questions from backend
    useEffect(() => {
        axios.get(`${url}/chat-api`)
            .then((response) => {
                setFaqData(response.data);
                setMessages([{ message: response.data.greeting, isUser: false }]);
            })
            .catch((error) => console.error("Error fetching chatbot data:", error));
    }, [url]);

    // for scrooling
    useEffect(() => {
        const chatContainer = document.querySelector(".chatbot-messages");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, [messages]);
      

    // Handle manual question selection
    const handleQuestionClick = (answer) => {
        if (manualComplete) return; // Prevent re-triggering manual chat

        if (selectedCategory) {
            // Get the next question in the selected category
            const nextStep = faqStep + 1;
            if (nextStep < selectedCategory.questions.length) {
                setFaqStep(nextStep);
                setMessages((prev) => [
                    ...prev,
                    { message: answer, isUser: true },
                    { message: selectedCategory.questions[nextStep].answer, isUser: false },
                ]);
            } else {
                // All questions in category completed, show final question
                setMessages((prev) => [
                    ...prev,
                    { message: answer, isUser: true },
                    { message: faqData.final_question.question, isUser: false },
                ]);
                setSelectedCategory(null);
                setFaqStep(0);
            }
        } else {
            // User selects a category
            const category = faqData.categories.find((cat) => cat.category === answer);
            if (category) {
                setSelectedCategory(category);
                setMessages((prev) => [
                    ...prev,
                    { message: answer, isUser: true },
                    { message: category.questions[0].answer, isUser: false },
                ]);
            }
        }

        // Handle final question responses
        if (faqData.final_question.options.includes(answer)) {
            if (answer === "No") {
                setMessages((prev) => [...prev, { message: faqData.final_question.responses[answer], isUser: false }]);
                setManualComplete(true);
                setManualChat(false);
            }
        }
    };


    // Send message in live chat
    const sendMessage = () => {
        if (userMessage.trim() === "") return;

        setMessages((prev) => [...prev, { message: userMessage, isUser: true }]);
        socket.emit("message", { text: userMessage, userId });

        setUserMessage("");
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.isUser ? "user-message" : "bot-message"}`}>
                        {msg.message}
                    </div>
                ))}

                {/* Manual FAQ phase */}
                {manualChat && !manualComplete && faqData && (
                    <div className="options">
                        {selectedCategory
                            ? selectedCategory.questions.map((q, index) =>
                                index === faqStep ? (
                                    <button key={q.question} onClick={() => handleQuestionClick(q.question)}>
                                        {q.question}
                                    </button>
                                ) : null
                            )
                            : faqData.categories.map((cat) => (
                                <button key={cat.category} onClick={() => handleQuestionClick(cat.category)}>
                                    {cat.category}
                                </button>
                            ))}

                        {/* Display final question options */}
                        {messages.some((msg) => msg.message === faqData.final_question.question) &&
                            faqData.final_question.options.map((option) => (
                                <button key={option} onClick={() => handleQuestionClick(option)}>
                                    {option}
                                </button>
                            ))}
                    </div>
                )}


                {/* Live chat phase */}
                {!manualChat && (
                    <div className="text-box">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;

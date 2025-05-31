import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./CustomerInqChatPage.scss";

const socket = io("http://localhost:3042");

const CustomerInqChatPage = () => {
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => ({
                ...prev,
                [data.userId]: [...(prev[data.userId] || []), { text: data.text, sender: "user" }]
            }));

            if (!users.includes(data.userId)) {
                setUsers((prevUsers) => [...prevUsers, data.userId]);
            }
        });

        socket.on("load_chat_history", (chatHistory) => {
            setMessages((prev) => ({ ...prev, [selectedUser]: chatHistory }));
        });

        return () => {
            socket.off("receive_message");
            socket.off("load_chat_history");
        };
    }, [selectedUser]);

    const handleUserSelect = (userId) => {
        setSelectedUser(userId);
        socket.emit("fetch_user_chat", userId);
    };

    const handleSend = () => {
        if (message.trim() === "" || !selectedUser) return;

        socket.emit("admin_reply", { text: message, userId: selectedUser });

        setMessages((prev) => ({
            ...prev,
            [selectedUser]: [...(prev[selectedUser] || []), { text: message, sender: "admin" }]
        }));
        setMessage("");
    };

    return (
        <div className="admin-chat-container">
            <h3>Admin Chat</h3>

            <div className="user-list">
                <h4>Users :</h4>
                {users.length === 0 ? <p>No users yet</p> : (
                    users.map((userId) => (
                        <button key={userId} onClick={() => handleUserSelect(userId)}>
                            {userId}
                        </button>
                    ))
                )}
            </div>

            <div className="chat-box">
                <h4>Chat with: {selectedUser || "Select a User"}</h4>
                <div className="chat-messages">
                    {(messages[selectedUser] || []).map((msg, index) => (
                        <div key={index} className={msg.sender === "admin" ? "admin-message" : "user-message"}>
                            {msg.sender === "admin" ? `Admin: ${msg.text}` : `User: ${msg.text}`}
                        </div>
                    ))}
                </div>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Reply..." />
                <button onClick={handleSend} disabled={!selectedUser}>Send</button>
            </div>
        </div>
    );
};

export default CustomerInqChatPage;

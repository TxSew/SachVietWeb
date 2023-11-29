// App.js (hoặc component tương ứng)

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { color } from '../../../Theme/color';
import { pushSuccess } from '../../../components/Toast/Toast';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // Địa chỉ máy chủ NestJS

function SocketChat() {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState<string>('');
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        newSocket.on('chat', (message) => {
            setMessages([...messages, message]);
            pushSuccess('Connected to server!');
        });

        return () => {
            newSocket.disconnect();
        };
    }, [messages]);

    const handleSend = () => {
        socket.emit('chat', input);
        setInput('');
    };

    return (
        <div style={{ background: 'black' }}>
            <ul>
                {messages.map((message, index) => (
                    <li style={{ color: color.error }} key={index}>
                        {message}
                    </li>
                ))}
            </ul>
            <input style={{ background: 'white' }} value={input} onChange={(e) => setInput(e.target.value)} />
            <button style={{ background: 'green' }} onClick={handleSend}>
                Send
            </button>
        </div>
    );
}

export default SocketChat;

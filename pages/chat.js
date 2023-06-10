import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './chat.module.css';
import { useRouter } from 'next/router';

const Chat = () => {
    const [history, setHistory] = useState([]);
    const [emailId, setEmailId] = useState('');
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRecording, setIsRecording] = useState(false); // Add isRecording state
    const [audioTranscript, setAudioTranscript] = useState(''); // Add audioTranscript state
    const handleLogout = () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('email_id');
      }
      router.push('/');
    };
  
    useEffect(() => {
      const emailId = localStorage.getItem('email_id');
      if(!emailId){
        router.push('/');
      }
      setIsLoggedIn(emailId !== null);
    }, []);
  
    useEffect(() => {
      const storedEmailId = localStorage.getItem('email_id');
      console.log(storedEmailId);
      if (storedEmailId) {
        setEmailId(storedEmailId);
        fetchHistory(storedEmailId);
      }
    }, []);
  
    const fetchHistory = async (emailId) => {
      try {
        const response = await axios.post('http://localhost:8000/get_history/', {
          email_id: emailId,
        });
        setError(response.data.error);
        setHistory(response.data.history);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
  
    const handleChatSubmit = async (audioTranscript) => {
      try {
        setIsLoading(true); // Set isLoading to true when making the API call
        console.log(query)
        const response = await axios.post('http://localhost:8000/chatbot/', {
          user_email: emailId,
          query: query||audioTranscript,
        });
        console.log(response.data);
        setQuery('');
        setAudioTranscript('');
        setResponse(response.data.response);
        // Update the chat history with the new entry
        setHistory(response.data.query_response_pairs);
      } catch (error) {
        console.error('Error sending chat message:', error);
      } finally {
        setIsLoading(false); // Set isLoading back to false after receiving the response
      }
    };

    const startRecording = () => {
        setIsRecording(true);
        setAudioTranscript('');
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
    
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');
          setAudioTranscript(transcript);
        };
    
        recognition.start();
      };
    
      const stopRecording = () => {
        setIsRecording(false);
        const recognition = new window.webkitSpeechRecognition();
        recognition.stop();
      };
    
      const handleVoiceQuerySubmit = () => {
        setQuery(audioTranscript);
        console.log(audioTranscript);
        handleChatSubmit(audioTranscript);
      };
 const url="https://media.istockphoto.com/id/1156178759/vector/human-head-and-brain-creation-and-idea-concept.jpg?s=612x612&w=0&k=20&c=dDRkcnBadVH6oNVvULTIeqE-nEtwN2ADHZNI4LJ3hKQ="
  return (
    <div className={styles.background} style={{backgroundImage:`url(${url})`}}>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li>
            <button onClick={() => router.push('/')}>Home</button>
          </li>
          <li>
            <button onClick={() => router.push('/chat')}>Chat</button>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={() => router.push('/login')}>Login</button>
              </li>
              <li>
                <button onClick={() => router.push('/signup')}>Signup</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={styles.chatContainer}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.chatHistory}>
          {/* Render the chat messages */}
          {history?.map((entry, index) => (
            <div key={index} className={styles.chatBubble}>
              <div className={styles.query}>{entry.query}</div>
              <div className={styles.response}>{entry.response}</div>
            </div>
          ))}
           {isLoading && (
            <div className={styles.loader}>
              <div className={styles.loaderInner}></div>
            </div>
          )}
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            placeholder="Enter your message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleChatSubmit} disabled={isLoading}>Send</button>
          {isRecording ? (
            <button onClick={stopRecording}>Stop</button>
          ) : (
            <button onClick={startRecording}>Start Voice Chat</button>
          )}
          {/* Show the audio transcript */}
        </div>
        
        {audioTranscript && <p>{audioTranscript}</p>}
  { audioTranscript && (
    <button onClick={handleVoiceQuerySubmit} className={styles.button} disabled={isLoading}>
      Submit Voice
    </button>
  )}
      </div>
    </div>
  );
};

export default Chat;
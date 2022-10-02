import '../css/Room.css';
import { ref, onValue, set, onDisconnect, remove, orderByChild, query, equalTo } from "firebase/database";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../index.js';

function newMessage(rtdb, currentRoom, number, message, profilePic) {
    if (message) {
        set(ref(rtdb, 'chatrooms/' + currentRoom + '/' + number), {
            author: sessionStorage.getItem('username'),
            value: message,
            authorPP: profilePic
        });
    }
    document.getElementById('dummy').scrollIntoView();
    document.getElementById('formcheto').reset();
}

const getFromFS = async (db, users, setOnline) =>{
    let docs = [];
    for(let i=0; i < users.length; ++i){
        let docot = (await getDoc(doc(db, 'users', users[i]))).data() 
        docs.push(docot);
    }
    setOnline(docs);
}

export default function Room(props) {
    document.getElementById('headerot').classList.add('back-option');
	
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnline] = useState([]);

    useEffect(() => {
        onValue(ref(props.rtdb, 'chatrooms/' + props.currentRoom), (snapshot) => {
            setMessages(snapshot.val());
            let element = document.getElementById('dummy')
            if (element) element.scrollIntoView();
        });
        const userId = auth.currentUser.uid;
	    const onlineReference = ref(props.rtdb, 'online/' + userId);
	    set(onlineReference, { currentRoom: props.currentRoom });
        const Ref = query(ref(props.rtdb, 'online'), orderByChild('currentRoom'), equalTo(props.currentRoom));
        onValue(Ref, (snapshot) => {
            let users = [];
            snapshot.forEach((user) => {users.push( user.key )})
            //updateDoc(doc(props.db, 'chatrooms', props.currentRoom), { users: snapshot.size });
            getFromFS(props.db, users, setOnline);
        });
        onDisconnect(onlineReference).remove();
    }, [])

    return (
        <div id='container'>
            <div id='roomInfo' className={props.lightTheme ? 'light3' : 'dark3'}>
                <Link to='/Lobby-select' className='link' title='Return to the Lobby list'>
                    <img src='https://cdn-icons-png.flaticon.com/512/1828/1828427.png' alt="exit"></img>
                    <p>Back to Lobby list</p>
                </Link>
            </div>
            <div id='chatArea' className={props.lightTheme ? 'light1' : 'dark1'}>
                <div id='messages'>
                    {messages && messages.map((message, i, messages) => (
                        <div className={sessionStorage.getItem('username') === message.author ? 'sent' : 'received'}>
                            {((messages.at(i - 1).author !== message.author) || i === 0) && <p className={props.lightTheme ? 'author' : 'plight1 author'}>{message.author}</p>}
                            <div className="inline">
                                <img className='profile-picture' src={message.authorPP ? message.authorPP : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} alt='profile pic'></img>
                                <div className='message-content'>
                                    <p>{message.value}</p>
                                </div>
                            </div>
                        </div>))}
                    <div id="dummy">
                        <span>{Date().toString()}</span>
                    </div>
                </div>
                <form id='formcheto' className={props.lightTheme ? 'light3' : 'dark3'} autoComplete="Off" onSubmit={e => e.preventDefault()}>
                    <input type="text" id='chatInput' placeholder='Type Something...'></input>
                    <button type="submit" id='submit' onClick={() => newMessage(props.rtdb, props.currentRoom, messages ? (messages.length) : 0, document.getElementById("chatInput").value, props.profilePic)}>
                        <img src='https://cdn-icons-png.flaticon.com/512/2087/2087840.png' alt="enter"></img></button>
                </form>
            </div>
            <div id='users' className={props.lightTheme ? 'light3' : 'dark3'}>
                <p id="currentUserP" style={{textAlign: 'center', margin: '10px', fontWeight: 'bold'}} className={!props.lightTheme ? 'plight1' : undefined}>Current Users:</p>
                {onlineUsers && onlineUsers.map((user) => (
                    <div className='onlineUserDiv'>
                        <img className='profile-picture' src={user.profilePic ? user.profilePic : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} alt='profile pic'></img>
                        <p className={!props.lightTheme ? 'plight1' : undefined}>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}
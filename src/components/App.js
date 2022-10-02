import { useState } from 'react';
import { doc, setDoc, getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getDatabase } from "firebase/database";
import SignIn from './SignIn';
import RoomCreate from './RoomCreate.js';
import Lobby from './Lobby';
import Navbar from './Navbar';
import Room from './Room';

let time = [4];

function App() {

  let date = new Date();
  time[0] = date.getDay() * -1; time[1] = date.getHours() * -1; time[2] = date.getMinutes() * -1; time[3] = date.getSeconds() * -1;
  const db = getFirestore();
  const rtdb = getDatabase();
  const colRef = collection(db, 'chatrooms')

  const [showCreate, changeShow] = useState(false);
  const [chatrooms, setDocs] = useState([]);
  const [currentRoom, changeRoom] = useState('');
  const [authot, changeAuth] = useState(null);
  const [lightTheme, changeTheme] = useState(localStorage.getItem('theme') !== 'false');
  const [currentUser, changeUser] = useState(null);
  const [profilePic, changePP] = useState('https://cdn-icons-png.flaticon.com/512/847/847969.png');

  if (colRef) {
    const q = query(colRef, orderBy('timeCreated'));
    onSnapshot(q, (snapshot) => {
      let documents = [];
      snapshot.forEach(doc => {
        documents.push({ ...doc.data(), id: doc.id })
      })
      setDocs(documents);
    });
  }

  function newRoom(name) {
    setDoc(doc(colRef), { name: name, owner: sessionStorage.getItem('username'), users: 0, timeCreated: time });
  }

  return (
    <Router>
      <Navbar lightTheme={lightTheme} changeTheme={changeTheme} authot={authot} changeAuth={changeAuth} currentUser={currentUser} 
        profilePic={profilePic} changePP={changePP} db={db}></Navbar>
      <Routes>
        <Route exact path=/* '/' - replaced for gh-pages */ '/Chatster-chat_app/'element={ !authot ?
          <SignIn db={db} changeAuth={changeAuth} lightTheme={lightTheme} changeUser={changeUser} changePP={changePP}></SignIn> :
          <Navigate replace to="/Lobby-select"></Navigate>}>
        </Route>
        <Route exact path='/Lobby-select' element={ authot ? (<div>
          <RoomCreate showCreate={showCreate} changeShow={changeShow} newRoom={newRoom} lightTheme={lightTheme}></RoomCreate>
          <Lobby chatrooms={chatrooms} changeShow={changeShow} changeRoom={changeRoom} rtdb={rtdb} lightTheme={lightTheme}></Lobby> </div>):
            <Navigate replace to=/* '/' - replaced for gh-pages */ '/Chatster-chat_app/'></Navigate>}>
        </Route>
        <Route path='/chatroom/:id' element={ authot ? 
          <Room currentRoom={currentRoom} rtdb={rtdb} db={db} lightTheme={lightTheme} profilePic={profilePic} changePP={changePP}></Room> :
          <Navigate replace to=/* '/' - replaced for gh-pages */ '/Chatster-chat_app/'></Navigate>}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
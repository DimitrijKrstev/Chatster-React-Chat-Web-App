import '../css/App.css';
import logo from '../logo.svg';
import { auth } from '../index.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { uploadDefault } from '../getProfilePic';

const Signed = async (auth, username, email, password, db, changeState, changePP) => {
  try {
    if (username) {
      const q = query(collection(db, "users"), where("username", "==", username));
      const docSnap = await getDocs(q);
      if (docSnap.empty) {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', auth.currentUser.uid), { username: username, profilePic: ' ' }).catch(error => console.log(error));
        await uploadDefault(auth.currentUser.uid, changePP, db);
        changeState('SignIn');
      }
      else {
        document.getElementById("errorP").innerHTML = "Username is already in use.";
      }
    }
    else {
      document.getElementById("errorP").innerHTML = "No username entered.";
    }
  }
  catch (error) {
    document.getElementById("errorP").innerHTML = (error.code);
  }
}
const Logged = async (auth, email, password, changeAuth, db, changeUser) => {
  if (email && password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (auth) {
        changeAuth(auth);
        const user = (await getDoc(doc(db, 'users', auth.currentUser.uid))).data();
        changeUser(user);
        sessionStorage.setItem('username', user.username);
      }
    }
    catch (error) {
      document.getElementById("errorP").innerHTML = (error.code);
    }
  }
  else{
    document.getElementById("errorP").innerHTML = "Enter both an email and a password.";
  }
};

const SignIn = (props) => {

  const [state, changeState] = useState(false);

  return (
    <div id="App" className={props.lightTheme ? 'lightApp' : 'darkApp'}>
      <div className="App-header">
        <img src={logo} alt="logo"></img>
        <div className="center">
          {!state &&
            <div>
              <p>Choose one to start chatting:</p>
              <div className="center">
                <button className='button1' onClick={() => changeState('SignIn')}>
                  <p>Sign in</p>
                </button>
                <button className='button1' onClick={() => changeState('SignUp')}>
                  <p>Sign up</p>
                </button></div>
            </div>
          }
          {state === 'SignUp' &&
            <div id="formcheto1">
              <input type="text" id="usernameInput" className='inputche' placeholder="Username.."></input>
              <input type="password" id="passwordInput" className='inputche' placeholder="password.."></input>
              <input type="email" id="emailInput" className='inputche' placeholder="email@example.com.."></input>
              <input type="submit" id="submit" value="Submit" className='inputche' onClick={() =>
                Signed(auth, document.getElementById("usernameInput").value, document.getElementById("emailInput").value,
                  document.getElementById("passwordInput").value, props.db, changeState, props.changePP)}></input>
              <p id="errorP" style={{ fontSize: "20px", color: "red", marginBottom: "0", marginTop: "5px", fontWeight: "normal" }}></p>
            </div>
          }
          {state === 'SignIn' &&
            <div id="formcheto1">
              <input type="email" id="emailInput" className='inputche' placeholder="email@example.com.."></input>
              <input type="password" id="passwordInput" className='inputche' placeholder="password.."></input>
              <input type="submit" id="submit" value="Submit" className='inputche' onClick={() =>
                Logged(auth, document.getElementById("emailInput").value, document.getElementById("passwordInput").value, props.changeAuth, props.db, props.changeUser)}></input>
              <p id="errorP" style={{ fontSize: "20px", color: "red", marginBottom: "0", marginTop: "5px", fontWeight: "normal" }}></p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn;
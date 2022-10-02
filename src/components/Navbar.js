import logo from '../logo.png';
import moonLogo from '../moon.png';
import '../css/Navbar.css';
import { getProfilePic, uploadProfilePic } from '../getProfilePic.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../index.js';
import { signOut } from 'firebase/auth';

function changeTheme(lightTheme, changeTheme) {
    if (lightTheme) {
        changeTheme(false);
        localStorage.setItem('theme', false);
    }
    else {
        changeTheme(true);
        localStorage.setItem('theme', true);
    }
}

const SignOut = async (changeAuth, changeClicked) => {
    await signOut(auth);
    changeAuth(auth.currentUser);
    changeClicked(false);
}

const Navbar = (props) => {

    const [ppClicked, changeClicked] = useState(false);
    useEffect(() => {
        if (props.authot) {getProfilePic(auth.currentUser.uid, props.changePP)};
    }, [props.authot])
    
    //if (picLoaded) console.log(picLoaded);
    return (
        <div id="headerot" className={props.lightTheme ? 'light1' : 'dark1'}>
            <div id="headerLeft">
                <div id="backButton">
                    <Link to="/Lobby-select" title='Back to Lobby list'>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Google_material_icons_arrow_back_24px.svg" alt="back button" id="back-button"></img>
                    </Link>
                </div>
                <div id="navLogo">
                    <Link to="/Lobby-select" title='Return to start page'>
                        <img src={logo} alt="logo" id="logoto"></img>
                    </Link>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {props.authot && <img className="userPP" onClick={() => ppClicked ? changeClicked(false) : changeClicked(true)} alt='profilePic' src={props.profilePic}></img>}
                <button id="toggleButton">
                    <img src={props.lightTheme ? "https://cdn-icons-png.flaticon.com/512/606/606795.png" : moonLogo}
                        alt="nightToggle" id="toggleot" onClick={() => changeTheme(props.lightTheme, props.changeTheme)}></img>
                </button>
            </div>
            {ppClicked && <div id="ppDiv" className={props.lightTheme ? 'light1' : 'dark1'}>
                <p id='hiText' className={props.lightTheme ? '' : 'plight1'}>Hi, {props.currentUser && props.currentUser.username}</p>
                <img id='profilePic' src={props.profilePic} alt='profilePic'></img>
                <input type='file' style={{fontSize: '12px', display: 'inline'}} className="ppButton" id='ppUpload' accept="image/png, image/jpeg" onSubmit={() => console.log('test')}></input>
                <button className="ppButton" style={{display: 'inline'}} onClick={() => uploadProfilePic(document.getElementById('ppUpload').files[0], auth.currentUser.uid, props.changePP, props.db)}>Upload profile picture</button>
                <button className="ppButton" onClick={() => SignOut(props.changeAuth, changeClicked)}><img src='https://cdn-icons-png.flaticon.com/512/8566/8566238.png' alt='leave'/>
                Sign out</button>
            </div>}
        </div>
    )
}

export default Navbar
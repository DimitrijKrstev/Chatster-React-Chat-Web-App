import plus_icon from '../chat-plus.svg';
import '../css/Lobby.css';
import { Link } from 'react-router-dom';

function Lobby(props) {
	document.getElementById('headerot').classList.remove('back-option');
	return (
		<div>
			<div id="App" className={props.lightTheme ? 'lightApp' : 'darkApp'}>
				<div id="Lobby" className={props.lightTheme ? 'light2' : 'dark4'}>
					<h1>Current Chatrooms</h1>
					<div className="buttonDiv"><button className="button" onClick={() => { props.changeShow(true); }}><img src={plus_icon} alt="add new chatroom"></img>
						<p>Create a new Chatroom</p></button></div>
					<div id="Lobby-select">
						{props.chatrooms.map((room) => (
							<Link to={`/chatroom/${room.id}`} className="room" onClick={() => props.changeRoom(room.id)} key={room.id}>
								<div className="room-div">
									<h2>{room.name}</h2>
									<h3>Created by: {room.owner}</h3>
									<p>Time created: {room.timeCreated[1] * -1}:{room.timeCreated[2] * -1}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Lobby;
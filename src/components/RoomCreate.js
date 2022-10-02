import '../css/RoomCreate.css';
import close_icon from '../close-svgrepo-com.svg';

function func(changeShow, newRoom, name){
    changeShow(false);
    newRoom(name);
}

function RoomCreate(createRoom) {
    if (createRoom.showCreate) {
        return (
            <div>
                <div id="gray">
                    <div id="roomCreate" className={createRoom.lightTheme ? 'lightCreate' : 'dark1'}>
                        <button id="close" onClick={() => createRoom.changeShow(false)}><img src={close_icon} alt ='close'></img></button>
                        <div id="centerItems">
                            <label>Chatroom name: </label><br></br>
                            <input type="text" id="roomName" placeholder="Enter Chatroom name.."></input><br></br>
                            <input type ="submit" className="button" value="Create Room"
                                onClick={() => func(createRoom.changeShow, createRoom.newRoom, document.getElementById("roomName").value)}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return 
    }
}

export default RoomCreate;
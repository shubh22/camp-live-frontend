import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
const axios = require('axios').default;


function Rooms() {
    const [roomName, setRoomName] = useState(0);
    const [roomList, setRoomList] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const history = useHistory();

    const handleChange = (event) => {
        setRoomName(event.target.value);
    };

    useEffect(() => {
        if(firstTime){
            setFirstTime(false)
            apiCallList()
        }
    })

    const apiCall = (roomName) => {
        axios.get('http://localhost:5000/rooms.create', {params:{roomName: roomName}})
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    };

    const apiCallJoin = (roomName) => {
        
        history.push("/rooms/" + roomName);
        // let user_id = false
        // if(getCookie("user_id")){
        //     user_id = getCookie("user_id")
        // }
        // axios.get('http://localhost:5000/rooms.join', {params:{roomName: roomName, user_id: user_id}})
        // .then(function (response) {
        //     // handle success
        //     console.log(response);
        //     document.cookie = "user_id=" + response.data.user_id;
        // })
        // .catch(function (error) {
        //     // handle error
        //     console.log(error);
        // })
    };

    const apiCallList = () => {
        axios.get('http://localhost:5000/rooms.list')
        .then(function (response) {
            // handle success
            let final = []
            response.data.forEach((single)=>
                {
                    final.push(<div key={single._id}><div>{single.name}</div> <Button color="primary" variant="contained" onClick={() => apiCallJoin(single.name)}>JOIN</Button></div>)
                }
            )
            setRoomList(final)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    };

    
    
    return (
        <div>
            <h2>Create Your Live Class</h2>
                <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleChange}/>
                <Button color="primary" variant="contained" onClick={() => apiCall(roomName)} >CREATE</Button>
                <br/>
                <h3>ROOMS LIST</h3>
                {roomList}
            
        </div>
    
    );
  }
  
  export default Rooms;
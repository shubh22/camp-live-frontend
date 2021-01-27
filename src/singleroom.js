import React, { useState, useEffect } from 'react';
import MenuTabs from './tabs.js'
import socket from './commonSocket.js'

var socketDone = false
socket.on("connect", () => {
    console.log(socket.id); 
    apiCallJoin(window.location.pathname.split('/')[2])

});

const apiCallJoin = (roomName) => {
    let user_id = false
    if(getCookie("user_id")){
        user_id = getCookie("user_id")
    }
    // axios.get('http://localhost:5000/rooms.join', {params:{roomName: roomName, user_id: user_id}})
    axios.get('https://camp-live.herokuapp.com/rooms.join', {params:{roomName: roomName, user_id: user_id}})
    .then(function (response) {
        // handle success
        console.log(response);
        socket.emit("joinRoom", roomName)
        socket.emit("updateUserId", response.data.user_id)
        socket.emit("userAdmin", response.data.is_admin)
        console.log("user_id=" + response.data.user_id + "; is_admin=" + response.data.is_admin)
        document.cookie = "user_id=" + response.data.user_id;
        document.cookie = "is_admin=" + response.data.is_admin;

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
};
  
socket.on("disconnect", () => {
    console.log(socket.id); 
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
    }
    }
    return false;
}

const axios = require('axios').default;

function SingleRoom() {
    const [firstTime, setFirstTime] = useState(true);
    const [onlineNumber, setOnlineNumber] = useState(0);

    socket.on('online-users', (onlineNumber)=>{console.log(onlineNumber); setOnlineNumber(onlineNumber);});
    useEffect(() => {
        if(firstTime && socketDone){
            setFirstTime(false)
            
        }
    })

    

    
    return (
        <div className="main">
            <div>Online Users - {onlineNumber}</div>
            <MenuTabs/>
        </div>
    );
}

export default SingleRoom;

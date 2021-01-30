import React, { useState, useEffect } from 'react';
import socket from './commonSocket.js'
import Button from '@material-ui/core/Button';

function Whiteboard() {
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if(firstTime){
            setFirstTime(false);
            newWB();
        }
    })

    const clear = () => {
      sessionStorage.clear(); 
      var canvas = document.getElementsByClassName('whiteboard')[0];
      canvas.width = document.getElementsByClassName("main-wb")[0].clientWidth;
      canvas.height = String(Math.ceil(Number(document.getElementsByClassName("main-wb")[0].clientWidth)*9/16))
    };
    return (
        <div className="main-wb">
            

            <div className="colors">
              <div className="color black"></div>
              <div className="color red"></div>
              <div className="color green"></div>
              <div className="color blue"></div>
              <div className="color yellow"></div>
            </div>
            {/* <Button color="primary" variant="contained" onClick={() => clear() }>Clear Board</Button> */}
            <canvas className="whiteboard" ></canvas>
        </div>
    );
}

export default Whiteboard;


function newWB() {
      console.log("WBWBWB")
      let roomName = window.location.pathname.split('/')[2]
      if(sessionStorage.getItem("counter" + roomName) === null){
        sessionStorage.setItem("counter" + roomName, 0)
      }
      
      var canvas = document.getElementsByClassName('whiteboard')[0];
      var colors = document.getElementsByClassName('color');
      var context = canvas.getContext('2d');
    
      var current = {
        color: 'black'
      };
      var drawing = false;
    
      canvas.addEventListener('mousedown', onMouseDown, false);
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mouseout', onMouseUp, false);
      canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
      
      //Touch support for mobile devices
      canvas.addEventListener('touchstart', onMouseDown, false);
      canvas.addEventListener('touchend', onMouseUp, false);
      canvas.addEventListener('touchcancel', onMouseUp, false);
      canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);
    
      for (var i = 0; i < colors.length; i++){
        colors[i].addEventListener('click', onColorUpdate, false);
      }
    
      socket.on('drawing', onDrawingEvent);
      window.addEventListener('resize', onResize1, false);
      onResize();
      onResize1()
    
    
      function drawLine(x0, y0, x1, y1, color, emit){
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    
        if (!emit) { return; }
        var w = canvas.width;
        var h = canvas.height;
        
        var sendEvent = {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color: color
        }
        socket.emit('drawing', sendEvent);
        var counterX = sessionStorage.getItem("counter" + roomName)
        sessionStorage.setItem(String(Number(counterX)+1) + roomName, JSON.stringify(sendEvent))
        sessionStorage.setItem("counter" + roomName, Number(counterX) + 1);
      }
    
      function onMouseDown(e){
        drawing = true;
        console.log(e)
        current.x = String(Number(e.offsetX||e.touches[0].clientX) -0);
        current.y = String(Number(e.offsetY||e.touches[0].clientY) - 0);
        console.log(current)
      }
    
      function onMouseUp(e){
        if (!drawing) { return; }
        drawing = false;
        drawLine(current.x, current.y, String(Number(e.offsetX||e.touches[0].clientX) -0), String(Number(e.offsetY||e.touches[0].clientY) - 0), current.color, true);
      }
    
      function onMouseMove(e){
        if (!drawing) { return; }
        drawLine(current.x, current.y, String(Number(e.offsetX||e.touches[0].clientX) -0), String(Number(e.offsetY||e.touches[0].clientY) - 0), current.color, true);
        current.x = String(Number(e.offsetX||e.touches[0].clientX) -0);
        current.y = String(Number(e.offsetY||e.touches[0].clientY) - 0);
      }
    
      function onColorUpdate(e){
        current.color = e.target.className.split(' ')[1];
      }
    
      // limit the number of events per second
      function throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
          var time = new Date().getTime();
    
          if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
          }
        };
      }
    
      function onDrawingEvent(data){
        var w = canvas.width;
        var h = canvas.height;
        var counterN = sessionStorage.getItem("counter" + roomName)
        sessionStorage.setItem(String(Number(counterN)+1) + roomName, JSON.stringify(data))
        sessionStorage.setItem("counter" + roomName, Number(counterN) + 1);
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
      }

      function onDrawingEvent1(data){
        var w = canvas.width;
        var h = canvas.height;
        drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
      }
    
      // make the canvas fill its parent
      function onResize() {
        canvas.width = document.getElementsByClassName("main-wb")[0].clientWidth;
        // canvas.height = String(Number(document.getElementsByClassName("main-wb")[0].clientHeight) - 55);
        canvas.height = String(Math.ceil(Number(document.getElementsByClassName("main-wb")[0].clientWidth)*9/16))
      }

      function onResize1() {
        canvas.width = document.getElementsByClassName("main-wb")[0].clientWidth;
        // canvas.height = String(Number(document.getElementsByClassName("main-wb")[0].clientHeight) - 55);
        canvas.height = String(Math.ceil(Number(document.getElementsByClassName("main-wb")[0].clientWidth)*9/16))

        var counterX = sessionStorage.getItem("counter" + roomName);
        for(var c=0; c<Number(counterX); c++){
          if(c > 0){
            if(sessionStorage.getItem(String(Number(c)) + roomName) !== null){
              console.log("hello")
              onDrawingEvent1(JSON.parse(sessionStorage.getItem(String(Number(c)) + roomName)))
            }
            
          }
        }


      }
      // function onResize1() {
      //   console.log(document.getElementsByClassName("main-wb")[0].clientWidth)
      //   // canvas.width = document.getElementsByClassName("main-wb")[0].clientWidth;
      //   // canvas.height = String(Number(document.getElementsByClassName("main-wb")[0].clientHeight) - 55);
      //   canvas.style.width = (document.getElementsByClassName("main-wb")[0].clientWidth);
      //   canvas.style.height = (String(Number(document.getElementsByClassName("main-wb")[0].clientHeight) - 55));
      // }
    
    }

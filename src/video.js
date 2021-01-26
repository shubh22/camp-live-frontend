import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import socket from './commonSocket.js'

const useStyles = makeStyles({
    root: {
      maxWidth: 410,
      float: "left"
    },
});

const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
};
const opts1 = {
    height: '780',
    width: '1240',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
};

function Video() {
    const [selectedVideo, setSelectedVideo] = useState(false);
    const classes = useStyles();
    const selectVideo = (number) => {
        setSelectedVideo(number)
        socket.emit('select-video', number)
    }
    const handleBack = () => {
        setSelectedVideo(false)
    }
    const startSession = () =>{
        socket.emit('start-session', "1")
    }

    const onReady= (event) => {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
        console.log(event.target.getCurrentTime())
      }
    let done = false;
    const onStateChange= (event) => {
          console.log(event)
          
          if(event.data === 1 && !done){
            var time = event.target.getCurrentTime()
            socket.emit('play-video', time)
            done = true
          }
          else if(event.data === 2){
            done = false
            socket.emit('pause-video', time)
          }
          
          socket.on('play-video', (time)=>{event.target.seekTo(time); event.target.playVideo()});
          socket.on('pause-video', ()=>{event.target.stopVideo()});
      }

      socket.on('select-video', (number)=>{setSelectedVideo(number)});
    
    

    if(!selectedVideo){
        return (
            <div>
                <p>Videos</p>
                <Button size="small" color="primary" onClick={() => startSession()}>Video Session</Button>
                <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                    <YouTube videoId="TlB_eWDSMt4" opts={opts}  />;
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => selectVideo("TlB_eWDSMt4")}>
                        Watch Fullscreen
                    </Button>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>
            </Card>

            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                    <YouTube videoId="HXV3zeQKqGY" opts={opts}  />;
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => selectVideo("HXV3zeQKqGY")}>
                        Watch Fullscreen
                    </Button>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>
            </Card>

            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                    <YouTube videoId="8ARodQ4Wlf4" opts={opts}  />;
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => selectVideo("8ARodQ4Wlf4")}>
                        Watch Fullscreen
                    </Button>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>
            </Card>
            </div>
        );
    }
    else{
        return (
           
            <div>
                <p>Videos</p>
                <Button size="small" color="secondary" onClick={() => handleBack()} >Back to Videos</Button>
                <YouTube videoId={selectedVideo} opts={opts1} onStateChange={(e) => onStateChange(e)} onReady={(e)=>onReady(e)} />;
        
            </div>
        );

        

        
    }
    
    
}

export default Video;

import React from 'react';
import YouTube from 'react-youtube';
import socket from './commonSocket.js'

class YTFrame extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return <YouTube videoId="2g811Eo7K8U" opts={opts} onStateChange={this._onStateChange} onReady={this._onReady} />;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    console.log(event.target.getCurrentTime())
  }
  _onStateChange(event){
      console.log(event)
      if(event.data === 1){
        console.log(event.target.getCurrentTime())
      }
  }
}

export default YTFrame;
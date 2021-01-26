import Rooms from './rooms.js';
import SingleRoom from './singleroom.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';


function App() {

  // axios.get('http://192.168.29.89:5000')
  // .then(function (response) {
  //   // handle success
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React1
    //     </a>
    //   </header>
    // </div>
    <Router>
      <h1>CampK12 Live</h1>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/rooms" exact={true}>
            <Rooms />
          </Route>
          <Route path="/" exact={true}>
            <Rooms />
          </Route>
          <Route path='/rooms/:name'> 
            <SingleRoom/>
          </Route>
          {/* <Route path="/*">
            <Rooms />
          </Route> */}
        </Switch>
    </Router>
  );
}

export default App;

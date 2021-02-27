import React, { Component } from 'react';
import Timebox from './components/Timebox/Timebox'
import TimeboxEditor from './components/TimeboxEditor/TimeboxEditor'
import './App.scss';

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="app">
        <TimeboxEditor />
        <Timebox />
      </div>
     );
  }
}
 
export default App;


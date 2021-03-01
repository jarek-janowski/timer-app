import React, { Component } from 'react';
import EditableTimebox from './components/EditableTimebox/EditableTimebox'
import './App.scss';

class App extends Component {
  

  render() { 
    
    return ( 
      <div className="app">
        <h1>timer-app</h1>
        <EditableTimebox />
      </div>
     );
  }
}
 
export default App;


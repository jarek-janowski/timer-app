import React, { Component } from 'react';
import './Timebox.scss'

class Timebox extends Component {
    state = {  }
    render() { 
        return ( 
            <section className="timebox">
                <h1>Co robię</h1>
                <p>Pozostało: 20min</p>
                <div className="progress-bar">
                    <div style={{width: '45%'}}></div>
                </div>
                <button>Start</button>
                <button>Stop</button>
                <button>Pauza</button>
                <span>Liczba przerw: 0</span>
            </section>
         );
    }
}
 
export default Timebox;
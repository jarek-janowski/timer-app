import React, { Component } from 'react';
import './Timebox.scss'
import ProgressBar from '../ProgressBar/ProgressBar'
import Clock from '../Clock/Clock'

class Timebox extends Component {
    state = { 
        isRunning: false,
        isPaused: false,
        pausesCount: 0,
     }

    handleStart = () =>{
        this.setState({
            isRunning: true
        })
    }

    handleStop = () =>{
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0
        })
    }

    handleTogglePause = () => {
        this.setState((prevState) => {
            return{
            isPaused: !prevState.isPaused,
            pausesCount: prevState.isPaused ? prevState.pausesCount : prevState.pausesCount +1
        }
        })
    }

    render() { 
        const {isRunning, isPaused, pausesCount} = this.state;
        return ( 
            <section className="timebox">
                <h1>Co robię</h1>
                <Clock/>
                <ProgressBar />
                <button onClick={this.handleStart} disabled = {isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.handleTogglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauza"}</button>
                <span>Liczba przerw: {pausesCount}</span>
            </section>
         );
    }
}
 
export default Timebox;
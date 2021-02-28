import React, { Component } from 'react';
import './Timebox.scss'
import ProgressBar from '../ProgressBar/ProgressBar'
import Clock from '../Clock/Clock'

class Timebox extends Component {
    state = { 
        isRunning: false,
        isPaused: false,
        pausesCount: 0,
        elapsedTimeInSeconds: 0,
     }

    handleStart = () =>{
        this.setState({
            isRunning: true
        })
        this.startTimer();
    }

    handleStop = () =>{
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    }

    handleTogglePause = () => {
        this.setState((prevState) => {
            const isPaused = !prevState.isPaused
            if (isPaused) {
                this.stopTimer();
            } else {
                this.startTimer();
            }
            return{
            isPaused,
            pausesCount: isPaused ? prevState.pausesCount +1 : prevState.pausesCount,
        }
        })
    }

    startTimer() {
            this.intervalID = window.setInterval(
                () => {
                    this.setState(
                        prevState => ({ elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1 })
                    )
                },
                100
            );
    }
    
    stopTimer = () => {
        window.clearInterval(this.intervalID);
    }

    render() { 
        const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds} = this.state;
        const totalTimeInSeconds = 25;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
        return ( 
            <section className="timebox">
                <h1>Co robię</h1>
                <Clock minutes={minutesLeft} seconds={secondsLeft}/>
                <ProgressBar percent={progressInPercent} />
                <button onClick={this.handleStart} disabled = {isRunning}>Start</button>
                <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick={this.handleTogglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauza"}</button>
                <span>Liczba przerw: {pausesCount}</span>
            </section>
         );
    }
}
 
export default Timebox;
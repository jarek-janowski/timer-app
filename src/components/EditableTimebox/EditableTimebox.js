import React, { Component } from 'react';
import Timebox from '../Timebox/Timebox'
import TimeboxEditor from '../TimeboxEditor/TimeboxEditor'

class EditableTimebox extends Component {

    state = { 
        title: "",
        totalTimeInMinutes: "",
        isRunning: false,
        isPaused: false,
        pausesCount: 0,
        elapsedTimeInSeconds: 0,
     }
  
    handleTitleChange = e =>{
      this.setState({
          title: e.target.value
      })
    }
    handleTotalTimeInMinutesChange = e =>{
      this.setState({
          totalTimeInMinutes: e.target.value
      })
    }

    handleStart = () =>{
        this.setState({
            isRunning: true,
            // title: "",
            // totalTimeInMinutes: null,
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
                        prevState => ({ 
                            elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1,
                        })
                    )
                },
                100
            );
    }
    
    stopTimer = () => {
        window.clearInterval(this.intervalID);
    }

    render() { 
        const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds, title, totalTimeInMinutes} = this.state;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
        return ( 
            <>
                <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    titleChange={this.handleTitleChange}
                    totalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    startOnClick={this.handleStart}
                    isRunning={isRunning}
                />
                <Timebox 
                    isRunning={isRunning}
                    isPaused={isPaused}
                    pausesCount={pausesCount}
                    elapsedTimeInSeconds={elapsedTimeInSeconds} 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    minutesLeft ={minutesLeft}
                    secondsLeft = {secondsLeft}
                    progressInPercent ={progressInPercent}
                    start = {this.handleStart}
                    stop = {this.handleStop}
                    pause = {this.handleTogglePause}
                    
                />
            </>
         );
    }
}
 
export default EditableTimebox;
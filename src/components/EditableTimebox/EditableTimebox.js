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
        validTitle: true,
        validMinutes: true,
     }

    componentDidUpdate(){
        const {elapsedTimeInSeconds, totalTimeInMinutes} = this.state;
        if(elapsedTimeInSeconds >= (totalTimeInMinutes*60) && elapsedTimeInSeconds>0) {
            this.stopTimer();
        }
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
        const {title, totalTimeInMinutes} = this.state;
        if (title.length < 1 && totalTimeInMinutes.length < 1){
            alert('Uzupełnij pola');
            this.setState({
                validTitle: false,
                validMinutes: false
            })
        }else if(title.length > 1 && totalTimeInMinutes.length < 1){
            alert('Uzupełnij pole z minutami');
            this.setState({
                validTitle: true,
                validMinutes: false
            })
        }else if(title.length < 1 && totalTimeInMinutes.length >= 1){
            alert('Uzupełnij pole z celem');
            this.setState({
                validTitle: false,
                validMinutes: true
            })
        }
        else if(title.length > 1 && totalTimeInMinutes >= 1){
            const sliced = (totalTimeInMinutes.slice(0, 3));
            this.setState({
            isRunning: true,
            totalTimeInMinutes: sliced
        })
        this.startTimer();
        this.saveInLocalStorage(title, totalTimeInMinutes);
        }
    }

    handleStop = () =>{
        this.setState({
            title: "",
            totalTimeInMinutes: "",
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0,
            validTitle: true,
            validMinutes: true,
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

    saveInLocalStorage = (title, time) =>{   
        let arrayTitle = [];
        let arrayTime = [];
        arrayTitle = JSON.parse(localStorage.getItem('title')) || [];
        arrayTime = JSON.parse(localStorage.getItem('time')) || [];
        arrayTitle.push(title);
        arrayTime.push(time);
        localStorage.setItem('title', JSON.stringify(arrayTitle));
        localStorage.setItem('time', JSON.stringify(arrayTime));
    }

    render() { 
        const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds, title, totalTimeInMinutes, validTitle, validMinutes} = this.state;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - Math.floor(elapsedTimeInSeconds);
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const progressInPercent = ((elapsedTimeInSeconds) / totalTimeInSeconds) * 100.0;
        const jsonParseTitle = JSON.parse(localStorage.getItem('title'))
        const jsonParseTime = JSON.parse(localStorage.getItem('time'))
        return ( 
            <>
                {isRunning ? null : <TimeboxEditor 
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    titleChange={this.handleTitleChange}
                    totalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    startOnClick={this.handleStart}
                    isRunning={isRunning}
                    validationTitle={validTitle}
                    validationMinutes={validMinutes}
                    jsonParseTitle={jsonParseTitle}
                    jsonParseTime={jsonParseTime}
                />}
                {!isRunning ? null : <Timebox 
                    isRunning={isRunning}
                    isPaused={isPaused}
                    pausesCount={pausesCount}
                    elapsedTimeInSeconds={elapsedTimeInSeconds} 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    minutesLeft ={minutesLeft}
                    secondsLeft = {secondsLeft}
                    progressInPercent ={progressInPercent}
                    stop = {this.handleStop}
                    pause = {this.handleTogglePause}
                />}
            </>
         );
    }
}
 
export default EditableTimebox;
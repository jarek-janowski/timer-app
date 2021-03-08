import React, { Component } from 'react';
import Timebox from '../Timebox/Timebox'
import TimeboxEditor from '../TimeboxEditor/TimeboxEditor'
import Alarm from '../../audio/alarm.mp3'
import EndOfTime from '../EndOfTime/EndOfTime'

const alarm = new Audio(Alarm);
alarm.loop = true
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
        clear: false
     }

    componentDidUpdate(){
        const {elapsedTimeInSeconds, totalTimeInMinutes} = this.state;
        if(elapsedTimeInSeconds >= (totalTimeInMinutes*60) && elapsedTimeInSeconds>0) {
            this.stopTimer();
            alarm.play()
        }
    }

    handleExtendBy5Min = () =>{
        this.setState({
            elapsedTimeInSeconds: 0,
            totalTimeInMinutes: 5,
            // pausesCount: 0
        })
        alarm.pause();
        alarm.currentTime = 0;
        this.startTimer();
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
        else if(title.length >= 1 && totalTimeInMinutes > 0){
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
        alarm.pause();
        alarm.currentTime = 0;
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

    clearLocalStorage = () => {
        this.setState({
            clear: !this.state.clear
        })
        localStorage.clear()
    }

    render() { 
        const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds, title, totalTimeInMinutes, validTitle, validMinutes} = this.state;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - Math.floor(elapsedTimeInSeconds);
        const minutesLeft = Math.floor(timeLeftInSeconds/60);
        const secondsLeft = Math.floor(timeLeftInSeconds%60);
        const hoursLeft = Math.floor(minutesLeft/60);
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
                    clearLocalStorage={this.clearLocalStorage}
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
                    hoursLeft = {hoursLeft}
                    progressInPercent ={progressInPercent}
                    stop = {this.handleStop}
                    pause = {this.handleTogglePause}
                />}
                {elapsedTimeInSeconds >= (totalTimeInMinutes*60) && elapsedTimeInSeconds>0 
                ? <EndOfTime 
                    stop={this.handleStop} 
                    title={title} 
                    totalTimeInMinutes={totalTimeInMinutes}
                    pausesCount={pausesCount}
                    extend={this.handleExtendBy5Min}
                /> 
                : null}
            </>
         );
    }
}
 
export default EditableTimebox;
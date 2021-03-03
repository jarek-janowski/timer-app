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
        validTitle: false,
        validMinutes: false,
     }

    componentDidUpdate(){
        if(this.state.elapsedTimeInSeconds >= (this.state.totalTimeInMinutes*60) && this.state.elapsedTimeInSeconds>0) {
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
        if (this.state.title.length < 1 && this.state.totalTimeInMinutes.length < 1){
            alert('Uzupełnij pola')
            this.setState({
                validTitle: true,
                validMinutes: true
            })
        }else if(this.state.title.length > 1 && this.state.totalTimeInMinutes.length < 1){
            alert('Uzupełnij pole z minutami')
            this.setState({
                validTitle: false,
                validMinutes: true
            })}else if(this.state.title.length < 1 && this.state.totalTimeInMinutes.length > 1){
                alert('Uzupełnij pole z celem')
            this.setState({
                validTitle: true,
                validMinutes: false
            })}else{
            this.setState({
            isRunning: true,
        })
        
        
        function saveTitle(data){   
            let a = [];
            a = JSON.parse(localStorage.getItem('title')) || [];
            a.push(data);
            localStorage.setItem('title', JSON.stringify(a));
        }

        function saveTime(data){   
            let a = [];
            a = JSON.parse(localStorage.getItem('time')) || [];
            a.push(data);
            localStorage.setItem('time', JSON.stringify(a));
        }

        this.startTimer();
        saveTitle(this.state.title);
        saveTime(this.state.totalTimeInMinutes);
        }
    }

    // const jsonParseTitle = JSON.parse(localStorage.getItem('title'))

    // const jsonParseTime = JSON.parse(localStorage.getItem('time'))


    // const titleUpdate = jsonParseTitle && jsonParseTitle.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
    //     return(
    //     <li key={id}>{item}</li>)
    // })

    // const timeUpdate = jsonParseTime && jsonParseTime.reduce((acc, b) => ([b, ...acc]), []).slice(0, 3).map((item, id)=>{
    //     return(
    //     <li key={id}>{item}</li>)
    // })





    handleStop = () =>{
        this.setState({
            title: "",
            totalTimeInMinutes: "",
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0,
            validTitle: false,
            validMinutes: false,
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
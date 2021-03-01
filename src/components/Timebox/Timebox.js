import './Timebox.scss'
import ProgressBar from '../ProgressBar/ProgressBar'
import Clock from '../Clock/Clock'
import styled, { css } from 'styled-components'

const Button = styled.button`
        ${props =>
            props.red &&
            css`
                background: #EF233C;
            `};
        ${props =>
            props.lightpurple &&
            css`
                background: #7d889b;
            `};
            `


const Timebox = ({
    isRunning, 
    isPaused, 
    pausesCount, 
    title, 
    minutesLeft,
    secondsLeft,
    progressInPercent,
    start,
    stop,
    pause,
    }) => {
        return ( 
            <section className="timebox">
                <h2 className="timebox__heading">{title}</h2>
                <Clock blur={!isPaused} paused={isPaused} minutes={minutesLeft} seconds={secondsLeft}/>
                <ProgressBar paused={isPaused} percent={progressInPercent} />
                <div className="timebox__button-wrapper">
                    {/* <Button className="timebox__button "
                        onClick={start} 
                        disabled = {isRunning}
                        lightpurple={isRunning}
                    >Start</Button> */}
                    <Button 
                        className="timebox__button" 
                        onClick={stop} 
                        disabled={!isRunning}
                        lightpurple={!isRunning}
                    >Resetuj</Button>
                    <Button 
                        className="timebox__button" 
                        onClick={pause} 
                        disabled={!isRunning || secondsLeft === 0}
                        lightpurple={!isRunning}
                        red={isPaused}
                        lightpurple={secondsLeft === 0}
                        >
                    {isPaused ? "Wznów" : "Pauza"}
                    </Button>
                </div>
                <span className="timebox__pauses">Liczba przerw: <span>{pausesCount}</span></span>
            </section>
         );
    }

 
export default Timebox;
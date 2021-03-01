import './Clock.scss'
import styled, { css } from 'styled-components'

const P = styled.p`
        
    ${props =>
        props.blink &&
    css`
        animation: blink 2s linear infinite;
        @keyframes blink {  
            50% { opacity: 0.6; }
        }
    `};`  
        // const minutes = minutes > 9 ? minutes : `0${minutes}`
        // const seconds = seconds > 9 ? seconds: `0${seconds}`
   

const Clock = ({minutes, seconds, paused}) => {
        const minutesLeft = minutes > 9 ? minutes : `0${minutes}`
        const secondsLeft = seconds > 9 ? seconds: `0${seconds}`
    return ( 
        <P blink={paused} className="clock">{seconds=== 0 ? "Koniec" : [`${minutesLeft}:`,secondsLeft]}</P>
        // <P blink={paused} className="clock">{seconds === 0 ? "Koniec" : minutes > 9 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds: `0${seconds}`}</P>
        );
}

 export default Clock;